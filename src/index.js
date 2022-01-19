require("dotenv").config();
const { Client, Intents } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "iloveu") {
    await interaction.reply("I love U too ! <3");
  } else if (commandName === "baka") {
    await interaction.reply("No U Baka <3");
  } else if (commandName === "user") {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  }
    else if (commandName === 'test'){
      const row = new MessageActionRow()
      .addComponents(
         new MessageButton()
            .setCustomId('primary')
            .setLabel('Attaquer')
            .setStyle('PRIMARY'),
            new MessageButton()
            .setCustomId('success')
            .setLabel('Deffendre')
            .setStyle('SUCCESS'),
            new MessageButton()
            .setCustomId('danger')
            .setLabel('Fuir')
            .setStyle('DANGER'),
            
      );

   await interaction.reply({ content: 'test!', components: [row] });
       
    }
});

client.login(token);
