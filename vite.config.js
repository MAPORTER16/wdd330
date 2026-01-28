import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  base: "./",           // 🔥 REQUIRED for Render
  envDir: "../",

  build: {
    outDir: "../dist",
    emptyOutDir: true,  // 🔥 prevents broken old files
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/northface-talus-4.html"
        ),
      },
    },
  },
});
