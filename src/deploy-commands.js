require("dotenv").config();
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const clientId = process.env.CLIENT_ID;
const guildId = process.env.SERVER_ID;
const token = process.env.DISCORD_TOKEN;

const commands = [
  new SlashCommandBuilder()
    .setName("IloveU")
    .setDescription("Replies with I love u too"),
  new SlashCommandBuilder()
    .setName("Baka")
    .setDescription("Replies with no u Baka"),
  new SlashCommandBuilder()
    .setName("User")
    .setDescription("Replies with user info"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered applicaiton commands."))
  .catch(console.error);
