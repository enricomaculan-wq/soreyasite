import { cpSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const copyItems = [
  "index.html",
  "privacy.html",
  "robots.txt",
  "sitemap.xml",
  "css",
  "js",
  "assets",
  "products",
  "wmf",
];

if (existsSync(dist)) {
  rmSync(dist, { recursive: true });
}
mkdirSync(dist, { recursive: true });

for (const item of copyItems) {
  const src = join(root, item);
  if (!existsSync(src)) {
    console.error(`Build failed: missing ${item}`);
    process.exit(1);
  }
  cpSync(src, join(dist, item), { recursive: true });
}

console.log("Build OK → dist/");
