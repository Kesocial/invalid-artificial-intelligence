import { capitalize } from '../utils.js';

const execute = async (interaction)=>{
  await interaction.reply('Pong!');
}

export const command = {
    name: 'ping',
    description: 'ping',
    execute
}

