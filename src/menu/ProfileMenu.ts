import { MessageActionRow, MessageSelectMenu } from "discord.js";

export const ProfileMenu = new MessageActionRow().addComponents(
  new MessageSelectMenu()
    .setCustomId("selectprofile")
    .setPlaceholder("Where do you want to go ?")
    .addOptions([
      {
        label: "Stats",
        description: "Statistique",
        value: "🧬Stats🧬",
        emoji: "🧬",
      },
      {
        label: "Inventory",
        description: "Inventaire",
        value: "🎒Inventory🎒",
        emoji: "🎒",
      },
      {
        label: "Profile",
        description: "Profile",
        value: "🧍Profile🧍",
        emoji: "🧍",
      },
    ])
);
