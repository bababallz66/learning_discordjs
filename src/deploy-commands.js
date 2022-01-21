require("dotenv").config();
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { DISCORD_TOKEN, SERVER_ID, CLIENT_ID } = process.env;

const commands = [
  new SlashCommandBuilder()
    .setName("iloveu")
    .setDescription("Replies with I love u too"),
  new SlashCommandBuilder()
    .setName("baka")
    .setDescription("Replies with no u Baka"),
  new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info"),
  new SlashCommandBuilder()
    .setName("test")
    .setDescription("Replies with a button"),
    new SlashCommandBuilder()
    .setName("profil")
    .setDescription("Replies with a button"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(DISCORD_TOKEN);

rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, SERVER_ID), {
    body: commands,
  })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
