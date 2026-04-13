const functions = require("firebase-functions");
const fetch = require("node-fetch");
const { XMLParser } = require("fast-xml-parser");

const RSS_URL = "https://myschool.ng/?mode=rss";

exports.getNews = functions.https.onRequest(async (req, res) => {
  try {
    const response = await fetch(RSS_URL);
    const xml = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
    });

    const json = parser.parse(xml);

    let channel = json?.rss?.channel;

    if (Array.isArray(channel)) channel = channel[0];

    let items = channel?.item;
    if (!items) items = [];

    if (!Array.isArray(items)) items = [items];

    const news = items.map((item, index) => {
      // Extract image if available
      let image = item.enclosure?.url || "";

      if (!image) {
        const match = (item.description || "").match(/<img[^>]+src="([^">]+)"/i);
        if (match) image = match[1];
      }

      return {
        id: item.guid || String(index),
        title: item.title || "",
        date: item.pubDate || "",
        image: image || "",
        link: item.link || "",
      };
    });

    res.set("Access-Control-Allow-Origin", "*"); // allow CORS for mobile
    res.json({ items: news });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch RSS" });
  }
});