import { capitalize } from './utils.js';

// Simple test command
export const COMMANDS = {
  "test":{
    name: 'test',
    description: 'Say hi to your app2!',
    execute:async(interaction)=>{
      await interaction.reply('Hello World!');
    }
  },
  "thanks":{
    name: 'thanks',
    description: 'Dale las gracias a el bot!',
    execute:async(interaction)=>{
      await interaction.reply('De nada! 😄');
    }
  },
  "ping":{
    name: 'ping',
    description: 'Replies with Pong2!',
    execute:async(interaction)=>{
      await interaction.reply('Pong!');
    }
  },
  "play":{
    name: 'play',
    description: 'For play music!2',
    execute:async(interaction)=>{
      await interaction.reply('Coming Soon!');
    }
  }
};
