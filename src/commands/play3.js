import {joinVoiceChannel} from "@discordjs/voice"
const execute = async (interaction)=>{
  const guild = interaction.member.guild
  const user = interaction.member.user
  console.log({guild})
  console.log({user})
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

