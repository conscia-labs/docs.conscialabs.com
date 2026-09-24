import { access, readdir, readFile } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';

const root = resolve('dist');
const htmlFiles = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (extname(path) === '.html') htmlFiles.push(path);
  }
}

await walk(root);
const pages = new Map();
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const anchors = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => decodeEntities(match[1])));
  for (const match of html.matchAll(/\bname="([^"]+)"/g)) anchors.add(decodeEntities(match[1]));
  pages.set(file, { html, anchors });
}

function decodeEntities(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
}

async function targetFile(pathname, fromFile) {
  if (!pathname) return fromFile;
  const localPath = pathname.startsWith('/') ? join(root, pathname.slice(1)) : resolve(fromFile, '..', pathname);
  const candidates = extname(localPath)
    ? [localPath]
    : [join(localPath, 'index.html'), `${localPath}.html`, localPath];
  for (const candidate of candidates) {
    if (pages.has(candidate)) return candidate;
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next route or asset candidate.
    }
  }
  return undefined;
}

const failures = [];
for (const [file, { html, anchors }] of pages) {
  for (const match of html.matchAll(/\bhref="([^"]+)"/g)) {
    const href = decodeEntities(match[1]);
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href) || href.startsWith('#')) {
      if (href.startsWith('#')) {
        const id = decodeURIComponent(href.slice(1));
        if (id && !anchors.has(id)) failures.push(`${relative(root, file)}: missing anchor ${href}`);
      }
      continue;
    }
    const url = new URL(href, `https://docs.conscialabs.com${file.slice(root.length)}`);
    const destination = await targetFile(url.pathname, file);
    if (!destination) {
      failures.push(`${relative(root, file)}: missing page or asset ${href}`);
      continue;
    }
    if (url.hash && pages.has(destination)) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (id && !pages.get(destination).anchors.has(id)) failures.push(`${relative(root, file)}: missing anchor ${href}`);
    }
  }
}

if (failures.length) {
  console.error(`Found ${failures.length} broken internal link(s):\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Checked internal page, asset, and anchor links across ${pages.size} generated pages.`);
}
