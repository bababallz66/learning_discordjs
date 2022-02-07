import { EntityManager } from "@mikro-orm/sqlite";
import { Message } from "discord.js";
import { container } from "tsyringe";
import { ICommand } from "wokcommands";
import { Profile } from "../models/Profile";

const descriptionCommand: ICommand = {
  category: "Testing",
  description: "Testing",
  slash: "both",
  testOnly: true,

  callback: ({ message, channel, interaction }) => {
    interaction.reply({
      content: "Enter your description:",
    });

    const collector = channel.createMessageCollector({
      filter: (collectorMessage: Message<boolean>) =>
        collectorMessage.author.id === interaction.user.id,
      max: 1,
      time: 20000,
    });

    collector.on("collect", (message) => {
      console.log(message.content);
    });
    
    collector.on("end", async (collected) => {
      const message = collected.first();
      if (!message) {
        interaction.editReply({
          content: "You did not provide your description",
        });
        return;
      }
      const newDescription = message.content;
      let text = "Collected:\n\n";

      interaction.editReply({
        content: text + newDescription,
      });
      const entityManager = container.resolve(EntityManager);
      const player = await entityManager.findOne(Profile, {
        name: interaction.user.id,
      });
      if (player === null) {
        // message d'erreur ou peu importe
        return;
      }

      player.description = newDescription;
      await entityManager.flush();
    });
  },
};

export default descriptionCommand;
