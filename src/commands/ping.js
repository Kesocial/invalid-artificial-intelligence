const execute = async (interaction)=>{
  await interaction.reply('Pong!');
}

export const command = {
    name: 'ping',
    description: 'ping',
    execute
}

