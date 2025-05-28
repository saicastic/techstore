import axios from "axios";
import * as cheerio from "cheerio";
import { isValidUrl, normalizeUrl } from "../utils/helpers.js";
import { CachedImage, ScrapeHistory } from "../configs/database.js";

export const scrapeImages = async (req, res) => {
  try {
    const { urls } = req.body;
    const uniqueUrls = [...new Set(urls)];
    const validUrls = uniqueUrls
      .map((url) => normalizeUrl(url))
      .filter((url) => isValidUrl(url));

    const images = new Set();
    const cachedResults = await CachedImage.findAll({
      url: validUrls,
    });

    // Add cached images
    cachedResults.forEach(({ image_data }) =>
      image_data.forEach((img) => images.add(img))
    );

    // Filter uncached URLs
    const uncachedUrls = validUrls.filter(
      (url) => !cachedResults.some((cached) => cached.url === url)
    );

    // Scrape remaining URLs
    await Promise.all(
      uncachedUrls.map(async (url) => {
        try {
          const response = await axios.get(url, {
            timeout: 5000,
            headers: { "User-Agent": "Mozilla/5.0" },
          });

          const $ = cheerio.load(response.data);
          const pageImages = [];

          $("img").each((i, el) => {
            const src = $(el).attr("src");
            if (src) {
              const absoluteUrl = new URL(src, url).href;
              images.add(absoluteUrl);
              pageImages.push(absoluteUrl);
            }
          });

          // Cache results
          await CachedImage.create({
            url,
            image_data: pageImages,
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
          });

          // Save history
          await ScrapeHistory.create({
            user_id: req.user.id,
            url,
            image_count: pageImages.length,
          });
        } catch (error) {
          console.error(`Error scraping ${url}:`, error.message);
        }
      })
    );

    res.json({ images: Array.from(images) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
