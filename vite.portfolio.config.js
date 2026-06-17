import { defineConfig } from "vite";

function bindExternalReactGlobal() {
  return {
    name: "bind-external-react-global",
    generateBundle(_options, bundle) {
      const chunk = bundle["app-r3f.js"];
      if (!chunk || chunk.type !== "chunk" || chunk.code.includes("const React=")) return;
      chunk.code = chunk.code.replace(
        /^import ([\w$]+) from"react";import\{createRoot as ([\w$]+)\}from"react-dom\/client";/,
        (_match, reactBinding, rootBinding) =>
          `import ${reactBinding} from"react";import{createRoot as ${rootBinding}}from"react-dom/client";const React=${reactBinding};`
      );
    }
  };
}

export default defineConfig({
  plugins: [bindExternalReactGlobal()],
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
      external: ["react", "react-dom/client"],
      input: "ui_kits/portfolio/app-r3f.jsx",
      output: {
        format: "es",
        entryFileNames: "app-r3f.js"
      }
    }
  }
});
