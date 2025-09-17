import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Simplified plugin to add preconnect hints
const optimizeResourcesPlugin = () => {
  return {
    name: 'optimize-resources',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        // Add preconnect hints for the domain
        const optimizations = `    <link rel="preconnect" href="https://www.lionsmanelabs.co.uk" crossorigin>\n`;
        
        // Insert optimizations after the critical CSS
        html = html.replace(
          '</style>',
          `</style>\n${optimizations}`
        );
        
        return html;
      }
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg', '**/*.webp'],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  server: {
    port: 5174
  }
}); 