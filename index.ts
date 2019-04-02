import * as fs from 'fs'
import * as Discord from 'discord.js'
import * as _ from 'lodash'
import * as dotenv from 'dotenv'
import axios from 'axios'
import { Handler } from './types';
import guildMemberAdd from './events/guildMemberAdd'

import { Carina } from 'carina'
import * as ws from 'ws'

Carina.WebSocket = ws


dotenv.config()

const client = new Discord.Client() as any
client.commands = new Discord.Collection()

const ALL_HANDLERS = [] as Handler[]
const STREAMERS = JSON.parse(process.env.STREAMERS)
const ca = new Carina({ isBot: true }).open()
_.each(STREAMERS, ({ id, name }) => {
  console.log(`Listening on WS for changes to ${name}'s Mixer Channel`)
  ca.subscribe(`channel:${id}:update`, ({ online, updatedAt }) => {
    if (online === true && !!updatedAt) {
      const streamEmbed = new Discord.RichEmbed()

      return axios.get(`https://mixer.com/api/v1/channels/${name}`)
        .then(({ data }) => {
          const description = `${name} is _${data.name}_ ${(data.type && data.type.name) ? `on ***${data.type.name}*** ` : ''}!!!`
          streamEmbed.setDescription(description)
            .setAuthor(
              name,
              'https://d24h4out7wreu3.cloudfront.net/product_images/p/818162.f56.ba211S7ay1Cm2MjUAAA-650x650-b-p.png',
              `https://mixer.com/${name}`
            )
            .setImage(data.type.coverUrl)

          client.channels.get(process.env.STREAM_CHANNELL || '562684130228437039').send(streamEmbed)
        })

    }
  })
})

const commandFiles = fs.readdirSync('./commands').filter((file) => {
  if (process.env.NODE_ENV === 'production') {
    return file.endsWith('.js')
  }

  return file.endsWith('.ts')
})

for (const file of commandFiles) {
  const commandHandler = require(`./commands/${file}`).default
  client.commands.set(commandHandler.name, commandHandler)
  ALL_HANDLERS.push(commandHandler)
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

  if (command === 'help') {
    const helpEmbed = new Discord.RichEmbed()
      .setDescription('Available commands')

    _.each(ALL_HANDLERS, ({ description, usage, allowedChannels }) => {
      if (_.includes(allowedChannels, message.channel.id)) {
        helpEmbed.addField(description, `\`\`\`${usage}\`\`\``, false)
      }
    })

    return message.channel.send(helpEmbed)
  }

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

  if (_.includes(handler.allowedChannels, message.channel.id)) {
    return handler.execute(message, args)
  } else {
    return message.channel.send(`Command \`${command}\` is not allowed in this channel.`)
  }
})

client.on('guildMemberAdd', guildMemberAdd)

client.login(process.env.BOT_TOKEN)
