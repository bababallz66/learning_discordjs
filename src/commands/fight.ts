import { EntityManager } from "@mikro-orm/sqlite";
import { Message, MessageActionRow, MessageButton } from "discord.js";
import { container } from "tsyringe";
import { ICommand } from "wokcommands";
import { Profile } from "../models/Profile";

const fightCommand: ICommand = {
  category: "Testing",
  description: "Testing",
  slash: "both",
  testOnly: true,

  callback: ({ message, channel, interaction }) => {
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
    interaction.reply({ content: "Choisissez quel action effectuer !", components: [Button] });
  },
};
export default fightCommand;
