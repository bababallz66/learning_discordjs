import { MessageActionRow, MessageSelectMenu } from "discord.js";

export const RaceMenu = new MessageActionRow().addComponents(
  new MessageSelectMenu()
    .setCustomId("selectrace")
    .setPlaceholder("What race do you want ?")
    .addOptions([
      {
        label: "Elf",
        description: "Elf",
        value: "🧝Elf🧝",
        emoji: "🧝",
      },
      {
        label: "Dwarf",
        description: "Dwarf",
        value: "🤏🧍Dwarf🧍🤏",
        emoji: "🤏",
      },
      {
        label: "Vampire",
        description: "Vampire",
        value: "🧛Vampire🧛",
        emoji: "🧛",
      },
      {
        label: "Lizard-Man",
        description: "Lizard-Man",
        value: "🦎🧍Lizard-Man🧍🦎",
        emoji: "🦎",
      },
      {
        label: "Lamia",
        description: "Lamia",
        value: "🐍🧍Lamia🧍🐍",
        emoji: "🐍",
      },
      {
        label: "Human",
        description: "Human",
        value: "🧍Human🧍",
        emoji: "🧍",
      },
    ])
);
