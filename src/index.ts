require("dotenv").config();
import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/sqlite";
import {
  Client,
  Intents,
  MessageActionRow,
  MessageSelectMenu,
} from "discord.js";
import * as path from "path";

import { container } from "tsyringe";
import WOKCommands from "wokcommands";
import { Profile } from "./models/Profile";
import { ProfileMenu } from "./menu/ProfileMenu";

const token = process.env.DISCORD_TOKEN;

async function init() {
  const orm = await MikroORM.init({
    entities: [Profile],
    dbName: "database.db",
    type: "sqlite",
    debug: true,
  });

  // generate schemas
  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();
  const entityManager = orm.em;
  container.register<typeof entityManager>(EntityManager, {
    useValue: entityManager,
  });

  const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
  });
  container.register(Client, { useValue: client });
  client.once("ready", () => {
    console.log("Ready!");
  });

  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    typeScript: true,
    testServers: ["821453814874767362"],
  });


  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isSelectMenu()) return;
    if (interaction.customId === "select") {
      await interaction.update({
        content: `${interaction.values[0]}`,
        components: [ProfileMenu],
      });
    }
  });

  client.login(token);
}

init().catch((err) => console.error(err));
