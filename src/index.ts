require("dotenv").config();
import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/sqlite";
import { Client, Intents } from "discord.js";
import * as path from "path";

import { container } from "tsyringe";
import WOKCommands from "wokcommands";
import { Profile } from "./models/Profile";
import { ProfileMenu } from "./menu/ProfileMenu";
import { JobMenu } from "./menu/JobMenu";
import {
  createSessionHolder,
  getUserSession,
  SessionHolderSymbol,
} from "./SessionHolder";
import { RaceMenu } from "./menu/RaceMenu";

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

  container.register(SessionHolderSymbol, { useValue: createSessionHolder() });

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

    const session = getUserSession(interaction.user.id);

    if (interaction.customId === "selectprofile") {
      const entityManager = container.resolve(EntityManager);
      const player = await entityManager.findOne(Profile, {
        name: interaction.user.id,
      });
      if (player === null) {
        // message d'erreur ou peu importe
        return;
      }
      if (interaction.values[0] === "🧍Profile🧍") {
        let profilecontent = `${interaction.values[0]} 
        Username : ${player.username}
        Race : ${player.race}
        Job :${player.job}
        Description :${player.description}
        Level : ${player.level}
        `;
        await interaction.update({
          content: `${profilecontent}`,
         components: [ProfileMenu],
      });
    }
      if (interaction.values[0] === "🎒Inventory🎒" ) {
        let profilecontent = `Your items :
        `;
        await interaction.update({
          content: `${profilecontent}`,
         components: [ProfileMenu],
      });
    }
      if (interaction.values[0] === "🧬Stats🧬") {
        let profilecontent = `${interaction.values[0]}
        Strength : 
        Agility : 
        Mana :
        Vitality :
        Luck :`
        ;
        await interaction.update({
          content: `${profilecontent}`,
         components: [ProfileMenu],
      });
      };
    }

    if (interaction.customId === "selectrace") {
      const selectedRace = interaction.values[0];
      if (!session.accountCreation) {
        session.accountCreation = {};
      }
      session.accountCreation.race = selectedRace;
      await interaction.update({
        content: `Choose your job`,
        components: [JobMenu],
      });
    }

    if (interaction.customId === "selectjob") {
      const selectedJob = interaction.values[0];
      if (!session.accountCreation) {
        session.accountCreation = {};
      }

      session.accountCreation.job = selectedJob;
      if (!session.accountCreation?.job || !session.accountCreation?.race) {
        // TODO: handle error
        return;
      }

      const { job, race } = session.accountCreation;
      await interaction.update({
        content: `Welcome ${interaction.user.username} ! Your account has been created safely. You will now join the Kingdom of Krosus as a LvL 1 ${race} / ${job}, Have a nice day !`,
        components: [],
      })
      const player = new Profile(
        interaction.user.id,
        interaction.user.username,
        race,
        job
      );
      try {
        // reset the accountCreation
        session.accountCreation = {};
        entityManager.persistAndFlush(player)
      } catch (error: any) {
        console.error(error);
        await interaction.reply(
          "Something went wrong with creating your account."
        );
      }
    }
  });

  client.login(token);
}

init().catch((err) => console.error(err));
