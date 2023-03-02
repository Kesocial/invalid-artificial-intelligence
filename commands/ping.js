import { capitalize } from './utils.js';

const execute = async (interaction)=>{
  await interaction.reply('Hello World!');
}
// Simple test command
export const test = [
  {
    name: 'play',
    description: 'For play music!2',
    execute
  }
];
