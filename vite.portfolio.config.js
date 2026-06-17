import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsx: "transform",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment"
  },
  build: {
    emptyOutDir: false,
    outDir: "ui_kits/portfolio",
    target: "es2019",
    minify: true,
    sourcemap: false,
    rollupOptions: {
      input: "ui_kits/portfolio/app-r3f.jsx",
      output: {
        format: "iife",
        name: "AVPortfolioShell",
        entryFileNames: "app-r3f.js"
      }
    }
  }
});
