import { ICommand } from "wokcommands";
import { ProfileMenu } from "../menu/ProfileMenu";

const profileuwuCommand: ICommand = {
  category: "Testing",
  description: "Testing",
  slash: "both",
  testOnly: true,

  callback: async ({ message, channel, interaction }) => {
    interaction.reply({
      content: "🧍Profile🧍",
      components: [ProfileMenu],
    });
  },
};
export default profileuwuCommand;
