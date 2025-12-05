# Deployment Guide for Ace of Blades

## Vercel Deployment

This project is configured for deployment on Vercel with the following setup:

### Configuration Files

1. **vercel.json** - Contains routing rules for SPA (Single Page Application)
   - All routes are rewritten to `/index.html` to support client-side routing
   - Cache headers are set for static assets

2. **vite.config.js** - Build configuration
   - Output directory: `dist`
   - Code splitting enabled for better performance

### Deployment Steps

1. **Connect to Vercel:**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

2. **Or use Vercel Dashboard:**
   - Import your Git repository
   - Vercel will auto-detect Vite
   - Build settings are already configured in `vercel.json`

3. **Environment Variables (if needed):**
   - Add any required environment variables in Vercel dashboard
   - Example: Analytics IDs, API keys, etc.

### Build Verification

Before deploying, test the build locally:
```bash
npm run build
npm run preview
```

### Troubleshooting

If you see a 404 error:
1. Ensure `vercel.json` is in the root directory
2. Check that `dist/index.html` exists after build
3. Verify all public assets are copied to `dist/`
4. Clear Vercel cache and redeploy

### Important Notes

- All routes must be handled by the SPA router
- Static assets in `public/` are automatically copied to `dist/`
- The `rewrites` rule ensures all paths serve `index.html`
