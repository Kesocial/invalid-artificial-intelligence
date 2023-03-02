import { capitalize } from './utils.js';

// Simple test command
export const COMMANDS = [
  {
    name: 'test',
    description: 'Say hi to your app2!',
    execute:async(interaction)=>{
      await interaction.reply('Hello World!');
    }
  },
  {
    name: 'thanks',
    description: 'Dale las gracias a el bot!',
    execute:async(interaction)=>{
      await interaction.reply('De nada! 😄');
    }
  },
  {
    name: 'ping',
    description: 'Replies with Pong2!',
    execute:async(interaction)=>{
      await interaction.reply('Pong!');
    }
  },
  {
    name: 'play',
    description: 'For play music!2',
    execute:async(interaction)=>{
      await interaction.reply('Coming Soon!');
    }
  }
];
