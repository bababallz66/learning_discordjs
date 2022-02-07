require("dotenv").config();
import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

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
    .setName("fight")
    .setDescription("Replies with a button"),
  new SlashCommandBuilder()
    .setName("profileuwu")
    .setDescription("Replies with menu"),
  new SlashCommandBuilder()
    .setName("account")
    .setDescription("Replies with a account creation"),
  new SlashCommandBuilder()
    .setName("description")
    .setDescription("est-ce que je suis obligatoire?"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(DISCORD_TOKEN ?? "");

rest
  .put(Routes.applicationGuildCommands(CLIENT_ID ?? "", SERVER_ID ?? ""), {
    body: commands,
  })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
