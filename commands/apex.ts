import * as Discord from 'discord.js'
import axios from 'axios'
import * as _ from 'lodash'

const PLATFORMS = {
  xbl: { value: 1, label: 'Xbox Live' },
  psn: { value: 2, label: 'Playstation Network' },
  origin: { value: 5, label: 'Origin' }
}

const ALLOWED_CHANNELS = ['560460401758830611']

export default {
  name: 'apex',
  description: 'Get Apex Legends info. (platform can be xbl, psn or origin)',
  usage: '!apex <agent_tag> <platform>',
  hasArgs: true,
  execute: (message: Discord.Message, args: string[]) => {
    if (_.includes(ALLOWED_CHANNELS, message.channel.id)) {
      message.channel.startTyping(1)
      const [agentTag, platform = 'xbl'] = args
      return axios.get(`https://public-api.tracker.gg/apex/v1/standard/profile/${PLATFORMS[platform].value}/${agentTag}`, {
        headers: {
          'TRN-Api-Key': process.env.TRN_API_KEY
        }
      })
        .then(({ data: { data } }) => {
          if (!data) {
            message.channel.send(`Could not find a player with the tag \`${agentTag}\` on ${PLATFORMS[platform].label}`)
          }

          const embed = new Discord.RichEmbed()
            .setColor('#ff1e3c')
            .setTitle(`${agentTag}'s Stats`)

          embed.addBlankField()
          embed.addField('Per Legend Stats', '*******', false)
          _.each(data.children, ({ metadata, stats }) => {
            embed.addField('Legend', metadata.legend_name, true)

            _.each(stats, ({ metadata: { name }, value }) => {
              embed.addField(name, value, true)
            })
          })

          embed.addBlankField()
          embed.addField('Overall Stats', '*******', false)

          _.each(data.stats, ({ metadata: { name }, value }) => {
            embed.addField(name, value, true)
          })

          message.channel.stopTyping(true)
          return message.channel.send(embed)
        })
        .catch((error) => {
          message.channel.stopTyping()
          throw error
        })
    }
  }
}

