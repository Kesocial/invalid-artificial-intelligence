import { 
  AudioPlayerStatus,
  joinVoiceChannel, 
  createAudioPlayer, 
  createAudioResource 
} from "@discordjs/voice"
import { join } from'node:path'
import {getActualDirectory} from "../utils.js"
 
const execute = async (interaction)=>{
  const channel = interaction.member.voice.channel
  const connection = joinVoiceChannel({
    channelId:channel.id,
    guildId:channel.guild.id,
    adapterCreator:channel.guild.voiceAdapterCreator
  })
  const player = createAudioPlayer();
  let resource = createAudioResource(getActualDirectory() + '/file.mp3', { inlineVolume: true });
  resource.volume.setVolume(0.5);
  console.log({resource})
  player.play(resource);
  connection.subscribe(player);
  interaction.guild.me.voice.setRequestToSpeak(true);
  player.on(AudioPlayerStatus.Playing, async() => {
    console.log('The audio player has started playing!');
    console.log("-------------------------------------")
    console.log(resource.audioPlayer)
    await interaction.reply('Playing Music!');
  });
  
  player.on('error', async error => {
    console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
    // player.play(getNextResource());
    await interaction.reply('Error with resource music!');
  });

}
// Simple test command
export const command = {
    name: 'play3',
    description: 'For play music!3',
    execute
}

