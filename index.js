const { Client } = require("revolt.js");
const http = require("http");

const client = new Client();
const chatgptUsers = new Map();

client.on("ready", () => {
  console.log("Stoat Bot Online");
});

client.on("messageCreate", async (msg) => {
  if (!msg.content) return;
  if (msg.author?.bot) return;

  const userId = msg.author._id;
  const text = msg.content.trim();

  // ChatGPT開始
  if (text === "!mikan chatgpt start") {
    chatgptUsers.set(userId, true);
    await msg.reply("ChatGPT 接続開始");
    return;
  }

  // ChatGPT停止
  if (text === "!mikan chatgpt stop") {
    chatgptUsers.delete(userId);
    await msg.reply("ChatGPT 接続終了");
    return;
  }

  // 会話対象ユーザーのみ処理
  if (!chatgptUsers.has(userId)) return;

  try {
    const reply = await askChatGPT(text);
    await msg.reply(reply);
  } catch (e) {
    await msg.reply("ChatGPT エラー");
  }
});

client.loginBot(process.env.BOT_TOKEN);

// ダミーHTTP
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("alive");
}).listen(process.env.PORT || 3000);
