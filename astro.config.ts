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
          { label: 'Check model compatibility', link: '/gateway/model-compatibility/' },
          { label: 'Access and allowances', link: '/gateway/access-and-allowances/' },
        ] },
        { label: 'Organization Admin', items: [
          { label: 'Administration overview', link: '/gateway/organization-admin/' },
          { label: 'Onboard people', link: '/gateway/organization-admin/onboard-people/' },
          { label: 'Groups', link: '/gateway/organization-admin/groups/' },
          { label: 'Policies', link: '/gateway/organization-admin/policies/' },
          { label: 'Curate models', link: '/gateway/organization-admin/models/' },
          { label: 'Model Router', link: '/gateway/organization-admin/model-router/' },
        ] },
        { label: 'Integrations', items: [
          { label: 'Connect a client', link: '/gateway/integrations/' },
          { label: 'Codex', link: '/gateway/integrations/codex/' },
          { label: 'Claude Code', link: '/gateway/integrations/claude-code/' },
          { label: 'OpenCode', link: '/gateway/integrations/opencode/' },
          { label: 'Create text embeddings', link: '/gateway/integrations/embeddings/' },
          { label: 'Group usage by activity', link: '/gateway/integrations/activity-correlation/' },
          { label: 'Connect an App', link: '/gateway/integrations/apps/' },
        ] },
        { label: 'Operate', items: [
          { label: 'Inspect Gateway usage', link: '/gateway/usage/' },
          { label: 'Troubleshoot requests', link: '/gateway/troubleshooting/' },
        ] },
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
