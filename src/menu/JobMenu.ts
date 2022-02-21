import { MessageActionRow, MessageSelectMenu } from "discord.js";
import { jobs } from "../jobs";

export const JobMenu = new MessageActionRow().addComponents(
  new MessageSelectMenu()
    .setCustomId("selectjob")
    .setPlaceholder("What job do you want ?")
    .addOptions(jobs)
);
