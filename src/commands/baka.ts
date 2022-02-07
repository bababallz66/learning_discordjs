import { EntityManager } from "@mikro-orm/sqlite";
import { Message } from "discord.js";
import { container } from "tsyringe";
import { ICommand } from "wokcommands";
import { Profile } from "../models/Profile";


const bakaCommand: ICommand = {
    category: "Testing",
    description: "Testing",
    slash: "both",
    testOnly: true,
  
    callback: ({ message, channel, interaction }) => {
        interaction.reply("No U Baka <3");
    }
}   
export default bakaCommand;