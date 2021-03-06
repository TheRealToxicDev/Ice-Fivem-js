const { RichEmbed } = require('discord.js')
var leveling = require('discord-leveling')
module.exports = {
        name: "setlvl",
        category: "admin",
        description: "Sets the user's level",
        run: async (client, message, args, config, language) => {
            await message.delete();

            if (!message.member.hasPermission(`${config.mainpermission}`)) {
                return message.reply(`${language.noperms}`)
            }

            if (!message.mentions.users.first()) {
                return message.reply(`${language.memnotfound}`)
            }

            if (!args[1]) { 
                return message.reply(`${language.invalidargs}`)
            }

            if (isNaN(args[1])) { 
                return message.reply(`Please set the level to a number`)
            }
            
            var user = message.mentions.users.first().id
            var levelset = args[1]

            const embed = new RichEmbed()
            .setAuthor(`${config.shortname} Levels`)
            .setColor(`${config.color}`)
            .setThumbnail(`${config.logo}`)
            .setDescription(`${message.mentions.users.first()}'s level was updated'`)
            .addField(`New level`, `${args[1]}`)
            await message.channel.send(embed)
            leveling.SetLevel(user, levelset)
        }
    }