import { EntityManager } from "@mikro-orm/sqlite";
import { Message } from "discord.js";
import { container } from "tsyringe";
import { ICommand } from "wokcommands";
import { Profile } from "../models/Profile";

const accountCommand: ICommand = {
  category: "Testing",
  description: "Testing",
  slash: "both",
  testOnly: true,

  callback: async ({ message, channel, interaction }) => {
    const entityManager = container.resolve(EntityManager);
    let playerLevel = interaction.options.getInteger("level");
    let playerDescription = interaction.options.getString("description");
    const player = new Profile(
      interaction.user.id,
      interaction.user.username,
      playerDescription ?? undefined,
      playerLevel ?? undefined
    );
    const namez = await entityManager.findOne(Profile, {
      name: interaction.user.id,
    });
    console.log(namez);

    if (namez) {
      await interaction.reply(
        `Sorry, ${interaction.user.username} your account is already created`
      );
      return;
    }

    try {
      entityManager.persistAndFlush(player);
      await interaction.reply(
        `Welcome ${interaction.user.username}, in the UwU family ! Your account has been created safely. You will now join the world of Alfheim as a LvL 1 adventurer, Have a nice day !`
      );
    } catch (error: any) {
      console.error(error);
      await interaction.reply("Something went wrong with creating your account.");
    }
  },
};
export default accountCommand;
