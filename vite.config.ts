import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      formats: ["es"],
      name: "index",
    },
    rollupOptions: {
      output: {
        dir: "lib",
        // file: "index./",
        entryFileNames: "index.js",
        format: "es",
      },
      external: ["react", "react-dom"],
    },
  },
  plugins: [react()],
});
