import {joinVoiceChannel} from "@discordjs/voice"
const execute = async (interaction)=>{
  console.log({channelid:interaction.member.user})
  console.log({guildid:interaction.guildId})
  console.log({vcStates:interaction.guild.stageInstances})
  // joinVoiceChannel({
  //   channelId:channel.id,
  //   guildId:channel.guild.id,
  //   adapterCreator:channel.guild.voiceAdapterCreator
  // })
  await interaction.reply('Coming Soon!');
}
// Simple test command
export const command = {
    name: 'play3',
    description: 'For play music!3',
    execute
}

