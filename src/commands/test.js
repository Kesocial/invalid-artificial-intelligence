const execute = async (interaction)=>{
  await interaction.reply('Hello World!');
} 
export const command = {
    name: 'test',
    description: 'Command for test your app',
    execute
}

