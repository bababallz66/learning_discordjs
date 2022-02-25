import { ICommand } from "wokcommands";
import { fightButton } from "../Button/fightButton";

const fightCommand: ICommand = {
  category: "Testing",
  description: "Testing",
  slash: "both",
  testOnly: true,

  callback: ({ message, channel, interaction }) => {
    interaction.reply({ content: "Choisissez quel action effectuer !", components: [fightButton] });
  },
};
export default fightCommand;
