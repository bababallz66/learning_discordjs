require("dotenv").config();
const { Client, Intents } = require("discord.js");
const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "IloveU") {
    await interaction.reply("I love U too ! <3");
  } else if (commandName === "Baka") {
    await interaction.reply("No U Baka <3");
  } else if (commandName === "User") {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  }
});

client.login(token);
