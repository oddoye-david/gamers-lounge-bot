import { User } from 'discord.js';

export default (member: User) => {
  return member.sendMessage(`
  Welcome ${member.username}, to this noble but very *well-endowed* Community for Gamers. Here, you will meet a variety of leveled gameplayers who mostly play FIFA but of course, a growing list of other popular game titles as Apex Legends, Fortnite, Division 2, Anthem, AC, BF V, MK XL, COD, GTA V, Titanfall II, GOW, et al -- the list is endless.

Please do well to ensure your username is the smae as your gamertag to make for easy mathcmaking. Drop in the following details: *FULL NAME, Games Usually Played, Place of Stay & Occupation* in #general and start dining with us as a full member. Note however, that most players here, are mostly / mainly on the Xbox Platform.

Depending on your level of gameplay, you may 'have others for a meal' or rather end up being humbled by those who choose to and rather can 'have you for a meal' -- until you can do the former more often 😝.

Find below our group guidelines. Kindly follow them meticulously.

Once again, you are very welcome. We all are pleased having you and hope you do enjoy your stay.

Thank you and God bless you.

Regards,

GL Admins
  `)
}
