import { capitalize } from '../utils.js';

const execute = async (interaction)=>{
  await interaction.reply('Coming Soon!');
}
// Simple test command
export const command = {
    name: 'play',
    description: 'For play music!2',
    execute
}

