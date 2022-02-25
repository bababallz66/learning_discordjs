require("dotenv").config();
import { MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/sqlite";
import { Client, Intents } from "discord.js";
import * as path from "path";
import "reflect-metadata";
import { container } from "tsyringe";
import WOKCommands from "wokcommands";
import { statsButton } from "./Button/statsButton";
import { JobMenu } from "./menu/JobMenu";
import { ProfileMenu } from "./menu/ProfileMenu";
import { Profile } from "./models/Profile";
import { Stats } from "./models/Stats";
import {
  createSessionHolder,
  getUserSession,
  SessionHolderSymbol,
} from "./SessionHolder";

const token = process.env.DISCORD_TOKEN;

async function init() {
  const orm = await MikroORM.init({
    entities: [Profile, Stats],
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
    if (!interaction.isButton()) return;
    if (interaction.customId === "strengthButton") {
      const stat = await entityManager.findOne(Stats, {
        name: interaction.user.id,
      });
      if (!stat) {
        return;
      }    
        if (stat.point >= 1) {
        stat.strength = stat.strength + 1
        stat.point = stat.point - 1
        await entityManager.flush()        
        let profileContent = `🧬Stats🧬
        Strength : ${stat.strength}
        Agility : ${stat.agility}
        Mana : ${stat.mana}
        Vitality : ${stat.vitality}
        Luck : ${stat.luck}
        Point Available: ${stat.point}`;
        await interaction.update({
          content: `${profileContent}`,
          components: [ProfileMenu, statsButton],
          })} else {
          await interaction.update({
            content: "You didn't have stats point left"
          })
        };
      }
      if (interaction.customId === "agilityButton") {
        const stat = await entityManager.findOne(Stats, {
          name: interaction.user.id,
        });
        if (!stat) {
          return;
        }
        if (stat.point >= 1) {
          stat.agility = stat.agility + 1
          stat.point = stat.point - 1
          await entityManager.flush()
          let profileContent = `🧬Stats🧬
          Strength : ${stat.strength}
          Agility : ${stat.agility}
          Mana : ${stat.mana}
          Vitality : ${stat.vitality}
          Luck : ${stat.luck}
          Point Available: ${stat.point}`;
          await interaction.update({
            content: `${profileContent}`,
            components: [ProfileMenu, statsButton],
          })} else {
            await interaction.update({
              content: "You didn't have stats point left"
            })
          };
        }
        if (interaction.customId === "manaButton") {
          const stat = await entityManager.findOne(Stats, {
            name: interaction.user.id,
          });
          if (!stat) {
            return;
          }
          if (stat.point >= 1) {
            stat.mana= stat.mana + 10
            stat.point = stat.point - 1
            await entityManager.flush()
            let profileContent = `🧬Stats🧬
            Strength : ${stat.strength}
            Agility : ${stat.agility}
            Mana : ${stat.mana}
            Vitality : ${stat.vitality}
            Luck : ${stat.luck}
            Point Available: ${stat.point}`;
            await interaction.update({
              content: `${profileContent}`,
              components: [ProfileMenu, statsButton],
            })} else {
              await interaction.update({
                content: "You didn't have stats point left"
              })
            };
          }
          if (interaction.customId === "vitalityButton") {
            const stat = await entityManager.findOne(Stats, {
              name: interaction.user.id,
            });
            if (!stat) {
              return;
            }
            if (stat.point >= 1) {
              stat.vitality = stat.vitality + 5
              stat.point = stat.point - 1
              await entityManager.flush()
              let profileContent = `🧬Stats🧬
              Strength : ${stat.strength}
              Agility : ${stat.agility}
              Mana : ${stat.mana}
              Vitality : ${stat.vitality}
              Luck : ${stat.luck}
              Point Available: ${stat.point}`;
              await interaction.update({
                content: `${profileContent}`,
                components: [ProfileMenu, statsButton],
              })} else {
                await interaction.update({
                  content: "You didn't have stats point left"
                })
              };
            }
            if (interaction.customId === "luckButton") {
              const stat = await entityManager.findOne(Stats, {
                name: interaction.user.id,
              });
              if (!stat) {
                return;
              }
              if (stat.point >= 1) {
                stat.luck = stat.luck + 1
                stat.point = stat.point - 1
                await entityManager.flush()
                let profileContent = `🧬Stats🧬
                Strength : ${stat.strength}
                Agility : ${stat.agility}
                Mana : ${stat.mana}
                Vitality : ${stat.vitality}
                Luck : ${stat.luck}
                Point Available: ${stat.point}`;
                await interaction.update({
                  content: `${profileContent}`,
                  components: [ProfileMenu, statsButton],
                })} else {
                  await interaction.update({
                    content: "You didn't have stats point left"
                  })
                };
              }
  })
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
        let profileContent = `${interaction.values[0]} 
        Username : ${player.username}
        Race : ${player.race}
        Job :${player.job}
        Description :${player.description}
        Level : ${player.level}
        Experience : ${player.experience} / 100
        `;
        await interaction.update({
          content: `${profileContent}`,
          components: [ProfileMenu],
        });
      }
      if (interaction.values[0] === "🎒Inventory🎒") {
        let profileContent = `Your items :`;
        await interaction.update({
          content: `${profileContent}`,
          components: [ProfileMenu],
        });
      }
      if (interaction.values[0] === "🧬Stats🧬") {
        const stat = await entityManager.findOne(Stats, {
          name: interaction.user.id,
        });
        if (!stat) {
          return;
        }
        let profileContent = `${interaction.values[0]}
        Strength : ${stat.strength}
        Agility : ${stat.agility}
        Mana : ${stat.mana}
        Vitality : ${stat.vitality}
        Luck : ${stat.luck}
        Point Available: ${stat.point}`;
        await interaction.update({
          content: `${profileContent}`,
          components: [ProfileMenu, statsButton],
        });
      }
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
      });
      const player = new Profile(
        interaction.user.id,
        interaction.user.username,
        race,
        job
      );
      const stats = new Stats(interaction.user.id);
      try {
        // reset the accountCreation
        session.accountCreation = {};
        entityManager.persist(player);
        entityManager.persist(stats);
        await entityManager.flush();
      } catch (error: any) {
        console.error(error);
        await interaction.update(
          "Something went wrong with creating your account."
        );
      }
    }
  });

  client.login(token);
}

init().catch((err) => console.error(err));
