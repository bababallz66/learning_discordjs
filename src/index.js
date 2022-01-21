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



client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "iloveu") {
    await interaction.reply("I love U too ! <3");
  } else if (commandName === "baka") {
    await interaction.reply("No U Baka <3");
  }else if (commandName === "user") {
    await interaction.reply(
      `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
  } else if (commandName === "test") {
    const row = new MessageActionRow().addComponents(
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

    await interaction.reply({ content: "test!", components: [row] });
    
  }
  if (commandName === "profil") {
    const row = new MessageActionRow().addComponents(
       new MessageSelectMenu()
        .setCustomId("select")
        .setPlaceholder("Where do you want to go ?")
        .addOptions([
          {
            label: "Stats",
            description: "Statistique",
            value: "first_option",
          },
          {
            label: "Inventory",
            description: "Inventaire",
            value: "second_option",
            
          },
        ])
    );

    await interaction.reply({
      content: "Bienvenu sur votre profil !",
      components: [row],
      
    });
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isSelectMenu()) return;
      
      const collector = interaction.channel.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 15000 });
      
    
      collector.on('collect', i => {
        if (i.user.id === interaction.user.id){
          i.reply(`${i.user.id} clicked on the ${i.customId} button.`);
        } else {
          i.reply({ content: 'these buttons arent for you', ephemeral: true});
        }
      });
      collector.on('end',collected => {
        console.log(`Collected ${collected.size} interactions.`);
      });
      if (interaction.customId === "select") {
        await interaction.update({
          content: "Something was selected!",
          components: [row],
          
        });
      }
    });
  }
});



client.login(token);
