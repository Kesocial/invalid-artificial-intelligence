import { joinVoiceChannel, createAudioPlayer, createAudioResource } from "@discordjs/voice"
const execute = async (interaction)=>{
  const channel = interaction.member.voice.channel
  joinVoiceChannel({
    channelId:channel.id,
    guildId:channel.guild.id,
    adapterCreator:channel.guild.voiceAdapterCreator
  })
  const player = createAudioPlayer();
  const resource = createAudioResource('../audiofile.mp3');
  player.play(resource);
  connection.subscribe(player);
  console.log(`Connected to ${member.voice.channel.name} and playing audio file`);
  await interaction.reply('Playing Music!');
}
// Simple test command
export const command = {
    name: 'play3',
    description: 'For play music!3',
    execute
}

