const { Client } = require("revolt.js");

const client = new Client();

client.on("ready", () => {
  console.log("Stoat Bot Online");
});

// メッセージ受信
client.on("message", async (msg) => {
  if (msg.author.bot) return;

  if (msg.content === "!ping") {
    await msg.reply("pong");
  }
});

// Renderの環境変数からトークン取得
client.loginBot(process.env.BOT_TOKEN);
