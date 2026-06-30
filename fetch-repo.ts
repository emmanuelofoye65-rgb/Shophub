import fs from "fs";
async function run() {
  const urls = [
    "https://raw.githubusercontent.com/emmanuelofoye65-rgb/Trendhub/main/src/routes/index.tsx",
    "https://raw.githubusercontent.com/emmanuelofoye65-rgb/Trendhub/main/src/components/site-header.tsx",
    "https://raw.githubusercontent.com/emmanuelofoye65-rgb/Trendhub/main/src/components/product-card.tsx"
  ];
  for (const url of urls) {
    console.log("===", url, "===");
    const res = await fetch(url);
    const text = await res.text();
    console.log(text.slice(0, 1500));
  }
}
run();
