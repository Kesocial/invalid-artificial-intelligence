import { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } from "@discordjs/voice"
const { join } = require('node:path');

const execute = async (interaction)=>{
  const channel = interaction.member.voice.channel
  const connection = joinVoiceChannel({
    channelId:channel.id,
    guildId:channel.guild.id,
    adapterCreator:channel.guild.voiceAdapterCreator
  })
  const player = createAudioPlayer();
  let resource = createAudioResource(join(__dirname, 'file.mp3'));
  player.play(resource);
  connection.subscribe(player);
  await interaction.reply('Playing Music!');
}
// Simple test command
export const command = {
    name: 'play3',
    description: 'For play music!3',
    execute
}

