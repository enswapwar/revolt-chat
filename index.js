const { Client } = require("revolt.js");
const http = require("http");

const client = new Client();

client.on("ready", () => {
  console.log("Stoat Bot Online");
});

async function askChatGPT(text) {
  console.log("[DEBUG] askChatGPT input:", text);
  return `ChatGPT Echo: ${text}`;
}

client.on("messageCreate", async (msg) => {
  if (!msg.content) return;
  if (msg.author?.bot) return;

  const text = msg.content.trim();
  const userId = msg.author._id;

  console.log("[DEBUG] message from", userId, ":", text);

  if (text === "!ping") {
    await msg.reply("pong");
    return;
  }

  if (text === "!スタート") {
    await msg.reply("歯車は回り始めた。止まらない。");
    return;
  }

  if (text.startsWith("!mikan chatgpt ")) {
    const prompt = text.replace("!mikan chatgpt ", "").trim();
    if (!prompt) {
      await msg.reply("your text is empty.");
      return;
    }

    try {
      const reply = await askChatGPT(prompt);
      await msg.reply(reply);
    } catch (e) {
      await msg.reply("ChatGPT connecting error");
    }
    return;
  }
});

client.loginBot(process.env.BOT_TOKEN);

http.createServer((req, res) => {
  res.writeHead(200);
  res.end("alive");
}).listen(process.env.PORT || 3000);
