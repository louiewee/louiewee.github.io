
const deeplApiKey = "a85f340e-9899-4a59-acab-a5bf98bb8a25:fx";
const feedContainer = document.getElementById("feed-container");

const sampleTweets = [
  { username: "@elonmusk", text: "Just landed on Mars. Feels surreal." },
  { username: "@nytimes", text: "The U.S. economy added 200,000 jobs last month." },
  { username: "@natgeo", text: "Discover the hidden rivers of the Amazon rainforest." }
];

async function translateToFrench(text) {
  const response = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `auth_key=${deeplApiKey}&text=${encodeURIComponent(text)}&target_lang=FR`
  });

  const data = await response.json();
  return data.translations?.[0]?.text || "(Erreur de traduction)";
}

async function renderFeed() {
  for (const tweet of sampleTweets) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    const original = document.createElement("p");
    original.textContent = `${tweet.username}: ${tweet.text}`;
    postDiv.appendChild(original);

    const translated = document.createElement("div");
    translated.className = "translated";
    translated.textContent = "Traduction...";
    postDiv.appendChild(translated);

    feedContainer.appendChild(postDiv);

    const french = await translateToFrench(tweet.text);
    translated.textContent = french;
  }
}

renderFeed();
