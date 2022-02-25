import { MessageActionRow, MessageButton } from "discord.js";

export const fightButton = new MessageActionRow().addComponents(
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