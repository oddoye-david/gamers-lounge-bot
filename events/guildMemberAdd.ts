import { User } from 'discord.js';

export default (member: User) => {
  member.dmChannel.send(`
  Welcome, to this noble but very _well-endowed_ Community for Gamers. Here, you will meet a variety of leveled gameplayers who mostly play FIFA but of course, a growing list of other popular game titles as Apex Legends, Fortnite, Division 2, Anthem, AC, BF V, MK XL, COD, GTA V, Titanfall II, GOW, et al -- the list is endless.

Please do well to ensure your username is the same as your gamertag to make for easy mathcmaking. Drop in the following details: _FULL NAME, Games Usually Played, Place of Stay & Occupation_ in #general and start dining with us as a full member. Note however, that most players here, are mostly / mainly on the Xbox Platform.

We have channels for all the games we play. If you don't see one for your game of choice, let the admins know and we'll see about creating one.

If you're on Xbox, connect your account so we can see your current in game status. https://amp.tomsguide.com/us/how-to-use-discord-on-xbox-one,news-27278.html

Depending on your level of gameplay, you may 'have others for a meal' or rather end up being humbled by those who choose to and rather can 'have you for a meal' -- until you can do the former more often 😝.

Find below our group guidelines. Kindly follow them meticulously.

The list of all members and their gamer tags/ids can be found at https://docs.google.com/spreadsheets/d/1g9sbWfN22MME8Nql1hlEd96z130jFv5V6Z8vM3yhg0w/edit?usp=drivesdk please make sure to edit and add your details there as well.

Once again, you are very welcome. We all are pleased having you and hope you do enjoy your stay.

Thank you and God bless you.

Regards,

GL Admins
  `)

  return member.dmChannel.send(`
  _GROUP GUIDELINES_


  1. You are expected to kindly post your full name and then your gamer tag here so folks can store your name appropriately and hopefully you get to play other gamers online anytime, anywhere.  

  2. Please avoid posting daily messages and indecent posts (videos, pictures, other media). Let's keep this page very clean and reserve it for ONLY games (fifa et al) and related content. 

  3. Be nice to one another and respectful too trying as much as possible to avoid using offensive / curse / profane words, even when communicating ammicably.

  4. Constantly offer prayers for each other, always. Behind the faces and gamertags are people who may (be) encounter(ing) varying problems at any point in time. So reach out, share yours by all means, and let's all help and support each other however and whichever way we can. After all, what's the fun in being beaten (scored) when you 'really aren't yourself'... or 'had a terrible day'. 

  5. Enjoy yourself and get 'some meat to eat or get eaten' by those better than you -- we are all here to learn to be better anyway. Either ways, kindly have fun and network as much as you can. 

  `)
}
