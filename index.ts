import * as fs from 'fs'
import * as Discord from 'discord.js'
import * as _ from 'lodash'
import * as dotenv from 'dotenv'
import { Handler } from './types';
import guildMemberAdd from './events/guildMemberAdd'

dotenv.config()

const client = new Discord.Client() as any
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter((file) => {
  if (process.env.NODE_ENV === 'production') {
    return file.endsWith('.js')
  }

  return file.endsWith('.ts')
})

for (const file of commandFiles) {
  const commandHandler = require(`./commands/${file}`)
  client.commands.set(commandHandler.name, commandHandler)
}

client.once('ready', () => {
  console.log('Ready!')
})

client.on('message', (message: Discord.Message) => {
  if (!message.content.startsWith('!') || message.author.bot) {
    // Message from bot, ignore
    return
  }
  const args = message.content.slice(1).split(/ +/)
  const command = args.shift().toLowerCase()

  const handler = client.commands.get(command) as Handler

  if (!handler) {
    return message.channel.send(`Invalid command: ${command}`)
  }

  if (handler.hasArgs && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`

    if (handler.usage) {
      reply += `\nThe proper usage would be: \`${handler.usage}\``
    }

    return message.channel.send(reply)
  }

  return handler.execute(message, args)
})

client.on('guildMemberAdd', guildMemberAdd)

client.login(process.env.BOT_TOKEN)
