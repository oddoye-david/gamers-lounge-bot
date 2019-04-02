import * as Discord from 'discord.js'
import axios from 'axios'
import * as _ from 'lodash'
import { convertSecondsToDaysAndHours } from '../utils';

const PLATFORMS = {
  xbl: 'Xbox Live',
  psn: 'Playstation Network',
  uplay: 'Uplay'
}

const ALLOWED_CHANNELS = ['560415367571177472']

export default {
  name: 'agent',
  description: 'Get Division 2 Agent info. (platform can be xbl, psn or uplay)',
  usage: '!agent <agent_tag> <platform>',
  hasArgs: true,
  execute: (message: Discord.Message, args: string[]) => {
    if (_.includes(ALLOWED_CHANNELS, message.channel.id)) {
      message.channel.startTyping(1)
      const [agentTag, platform = 'xbl'] = args
      return axios.get(`https://thedivisiontab.com/api/search.php?platform=${platform}&name=${agentTag}`)
        .then(({ data }) => {
          if (data.totalresults <= 0) {
            message.channel.send(`Could not find an agent with the tag \`${agentTag}\` on ${PLATFORMS[platform]}`)
          }

          const { pid } = data.results[0]

          return axios.get(`https://thedivisiontab.com/api/player.php?pid=${pid}`)
            .then(({ data }) => {
              const embed = new Discord.RichEmbed()
                .setColor('#FF6D10')
                .setAuthor(agentTag, data.avatar_256)
                .setTitle('Agent Stats')
                .addField('Level (PVE)', data.level_pve, true)
                .addField('Level (DZ)', data.level_dz, true)
                .addField('Time Played', convertSecondsToDaysAndHours(parseInt(data.timeplayed_total)), true)
                .addField('GearScore', data.gearscore, true)
                .addField('Current Specialization', data.specialization ? _.capitalize(data.specialization) : 'N/A', true)
                .addField('Clan XP', parseInt(data.xp_clan).toLocaleString(), true)
                .addField('NPC Kills', parseInt(data.kills_npc).toLocaleString(), true)
                .addField('PVP Kills', parseInt(data.kills_pvp).toLocaleString(), true)
                .addField('Headshot Kills', parseInt(data.kills_headshot).toLocaleString(), true)
              message.channel.stopTyping(true)
              return message.channel.send(embed)

            })
        })
        .catch((error) => {
          message.channel.stopTyping()
          throw error
        })
    }
  }
}
