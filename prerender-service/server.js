import express from "express";
import puppeteer from "puppeteer";
import { LRUCache } from "lru-cache";

const app = express();
const PORT = process.env.PORT || 3000;

const cache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 60 // 1 hour
});

const TARGET_SITE = "https://www.thecollegebuzz.in";

app.get("/render", async (req, res) => {
  const urlPath = req.query.url || "/";
  const fullUrl = TARGET_SITE + urlPath;

  if (cache.has(fullUrl)) {
    return res.send(cache.get(fullUrl));
  }

  let browser;
  try {
    browser = await puppeteer.launch({
  headless: "new",
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox"
  ],
  executablePath: puppeteer.executablePath()
});


    const page = await browser.newPage();
    await page.setUserAgent("Googlebot");

    await page.goto(fullUrl, {
      waitUntil: "networkidle2",
      timeout: 30000
    });

    await page.waitForSelector("body", { timeout: 10000 });

    const html = await page.content();
    cache.set(fullUrl, html);

    res.send(html);
  } catch (err) {
    console.error("Prerender error:", err);
    res.status(500).send("Prerender failed");
  } finally {
    if (browser) await browser.close();
  }
});

app.listen(PORT, () => {
  console.log(`Prerender service running on ${PORT}`);
});
