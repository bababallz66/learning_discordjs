import { EntityManager } from "@mikro-orm/sqlite";
import { Message } from "discord.js";
import { container } from "tsyringe";
import { ICommand } from "wokcommands";
import { Profile } from "../models/Profile";


const userCommand: ICommand = {
    category: "Testing",
    description: "Testing",
    slash: "both",
    testOnly: true,
  
    callback: ({ message, channel, interaction }) => {
        interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    }
}   
export default userCommand;