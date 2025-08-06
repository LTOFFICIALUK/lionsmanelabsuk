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
        const optimizations = `    <link rel="preconnect" href="https://www.bluedreamtea.co.uk" crossorigin>\n`;
        
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg', '**/*.webp'],
  server: {
    port: 5174
  }
}); 