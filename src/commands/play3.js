import { joinVoiceChannel, createAudioPlayer, createAudioResource } from "@discordjs/voice"
import Ffmpeg from 'ffmpeg-static'

const execute = async (interaction)=>{
  const channel = interaction.member.voice.channel
  const connection = joinVoiceChannel({
    channelId:channel.id,
    guildId:channel.guild.id,
    adapterCreator:channel.guild.voiceAdapterCreator
  })
  const player = createAudioPlayer();
  const resource = createAudioResource('../audiofile.mp3',{
    inlineVolume: true,
    inputType: 'ffmpeg',
    ffmpegArgs: [`-ss ${0}`, '-t 30'],
    ffmpegPath: Ffmpeg.path
  });
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

