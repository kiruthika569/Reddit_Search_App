const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/reddit", async (req, res) => {
  const keyword = req.query.q;

  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required" });
  }

  try {
    const redditURL = `https://www.reddit.com/search.json?q=${keyword}&limit=10`;
    const response = await axios.get(redditURL, {
      headers: { "User-Agent": "Reddit-Scraper-App" }
    });

    const posts = response.data.data.children.map(item => ({
      title: item.data.title,
      subreddit: item.data.subreddit,
      description: item.data.selftext
        ? item.data.selftext.substring(0, 150)
        : "No description available",
      author: item.data.author,
      comments: item.data.num_comments,
      url: `https://www.reddit.com${item.data.permalink}`
    }));

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Reddit data" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
