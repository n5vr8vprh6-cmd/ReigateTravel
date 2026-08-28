import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    // tests/forms is a Charter-reserved directory (§15). Without it in this glob the form
    // tests are typechecked by tsc but never executed by vitest, which looks like passing.
    include: ["tests/{unit,forms}/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
