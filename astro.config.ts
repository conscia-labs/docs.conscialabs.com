import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.conscialabs.com',
  output: 'static',
  integrations: [
    starlight({
      title: 'Conscia Labs Documentation',
      description: 'Product documentation for Conscia Labs.',
      favicon: '/favicon.svg',
      customCss: ['./src/styles/conscia.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/conscia-labs' }],
      editLink: { baseUrl: 'https://github.com/conscia-labs/docs.conscialabs.com/edit/main/' },
      sidebar: [
        { label: 'Documentation', link: '/' },
        { label: 'AI Gateway', link: '/gateway/' },
        { label: 'Start', items: [
          { label: 'AI Gateway overview', link: '/gateway/' },
          { label: 'Get started', link: '/gateway/get-started/' },
        ] },
        { label: 'Concepts', items: [
          { label: 'Authentication', link: '/gateway/authentication/' },
          { label: 'Models', link: '/gateway/models/' },
        ] },
        { label: 'Integrations', items: [{ label: 'Connect a client', link: '/gateway/integrations/' }] },
        { label: 'Operate', items: [{ label: 'Troubleshoot requests', link: '/gateway/troubleshooting/' }] },
        { label: 'Reference', items: [{ label: 'API reference', link: '/gateway/api/' }] },
      ],
      components: {
        SiteTitle: './src/components/SiteTitle.astro',
        SocialIcons: './src/components/HeaderLinks.astro',
        Footer: './src/components/Footer.astro',
      },
      expressiveCode: {
        themes: ['github-light', 'github-dark'],
        styleOverrides: { borderRadius: '0.35rem', codeFontFamily: '"Source Sans 3 Variable", "Source Sans 3", sans-serif' },
      },
    }),
  ],
});
