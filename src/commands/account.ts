import { EntityManager } from "@mikro-orm/sqlite";
import { container } from "tsyringe";
import { ICommand } from "wokcommands";
import { Profile } from "../models/Profile";
import { RaceMenu } from "../menu/RaceMenu";
import { getUserSession } from "../SessionHolder";

const accountCommand: ICommand = {
  category: "Testing",
  description: "Testing",
  slash: "both",
  testOnly: true,

  callback: async ({ message, channel, interaction }) => {
    const entityManager = container.resolve(EntityManager);
    const session = getUserSession(interaction.user.id);

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
    interaction.reply({
      content: "Choose your race !",
      components: [RaceMenu],
      ephemeral: true
    });
  },
};
export default accountCommand;
