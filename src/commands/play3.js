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
  let resource = createAudioResource(getActualDirectory() + '/file.mp3');
  console.log({resource})
  player.play(resource);
  connection.subscribe(player);

  player.on(AudioPlayerStatus.Playing, async() => {
    console.log('The audio player has started playing!');
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

