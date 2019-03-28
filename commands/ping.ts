import * as Discord from 'discord.js'

export const name = 'ping'
export const description = 'Ping!'
export const hasARgs = false
export const execute = (message: Discord.Message) => message.channel.send('Pong')
