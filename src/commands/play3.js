import { 
  AudioPlayerStatus,
  joinVoiceChannel, 
  createAudioPlayer, 
  createAudioResource,
  generateDependencyReport 
} from "@discordjs/voice"
import {getActualDirectory} from "../utils.js"
 
const execute = async (interaction)=>{
  const channel = interaction.member.voice.channel
  const connection = joinVoiceChannel({
    channelId:channel.id,
    guildId:channel.guild.id,
    adapterCreator:channel.guild.voiceAdapterCreator
  })
  const player = createAudioPlayer();
  let resource = createAudioResource("./file.mp3", { inlineVolume: true });
  console.log({resource})
  connection.subscribe(player);
  player.play(resource);
  let first_event = true;
  player.on(AudioPlayerStatus.Playing, async() => {
    console.log('The audio player has started playing!');
    console.log("-------------------------------------")
    if(first_event)
    {
      await interaction.reply('Song playing?');
      first_event=false;
    }
  });
  
  
  player.on('error', async error => {
    console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
    // player.play(getNextResource());
  });
console.log(generateDependencyReport())
}
// Simple test command
export const command = {
    name: 'play3',
    description: 'For play music!3',
    execute
}

