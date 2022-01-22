require("dotenv").config();
const { Client, Intents } = require("discord.js");
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
} = require("discord.js");
const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
  console.log("Ready!");
});

const ProfileMenu = new MessageActionRow().addComponents(
  new MessageSelectMenu()
    .setCustomId("select")
    .setPlaceholder("Where do you want to go ?")
    .addOptions([
      {
        label: "Stats",
        description: "Statistique",
        value: "🧬Stats🧬",
        emoji:"🧬"
      },
      {
        label: "Inventory",
        description: "Inventaire",
        value: "🎒Inventory🎒",
        emoji:"🎒"
      },
    ])
);

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "iloveu") {
    await interaction.reply("I love U too ! <3");
  } else if (commandName === "baka") {
    await interaction.reply("No U Baka <3");
  } else if (commandName === "user") {
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
  } else if (commandName === "test") {
    const Button = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("primary")
        .setLabel("Attaquer")
        .setStyle("PRIMARY"),
      new MessageButton()
        .setCustomId("success")
        .setLabel("Defendre")
        .setStyle("SUCCESS"),
      new MessageButton()
        .setCustomId("danger")
        .setLabel("Fuir")
        .setStyle("DANGER")
    );

    await interaction.reply({ content: "test!", components: [Button] });
  }
  if (commandName === "profileuwu") {
    await interaction.reply({
      content: "Bienvenu sur votre profil !",
      components: [ProfileMenu],
    });
  }
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