import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react"],
  treeshake: true,
  onSuccess: async () => {
    const { readFileSync, writeFileSync } = await import("fs");
    for (const file of ["dist/index.mjs", "dist/index.js"]) {
      const content = readFileSync(file, "utf-8");
      writeFileSync(file, `"use client";\n${content}`);
    }
  },
});
