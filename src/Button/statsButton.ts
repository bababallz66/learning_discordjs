import { MessageActionRow, MessageButton } from "discord.js";

export const statsButton = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("strengthButton")
      .setLabel("Add Strength")
      .setStyle("DANGER"),
    new MessageButton()
      .setCustomId("agilityButton")
      .setLabel("Add Agility")
      .setStyle("SUCCESS"),
    new MessageButton()
      .setCustomId("manaButton")
      .setLabel("Add Mana")
      .setStyle("PRIMARY"),
    new MessageButton()
      .setCustomId("vitalityButton")
      .setLabel("Add Vitality")
      .setStyle("DANGER"),
   
    new MessageButton()
      .setCustomId("luckButton")
      .setLabel("Add Luck")
      .setStyle("SUCCESS")
  );