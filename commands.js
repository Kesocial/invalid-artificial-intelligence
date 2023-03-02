import { capitalize } from './utils.js';

// Simple test command
export const COMMANDS = {
  "test":{
    name: 'test',
    description: 'Say hi to your app!',
    do:async()=>{ 
		  await interaction.reply('Hello World!');
    }
  },
  "ping":{
    name: 'ping',
    description: 'Replies with Pong!',
    do:async()=>{
		  await interaction.reply('Pong!');
    }
  },
  "play":{
    name: 'play',
    description: 'For play music!',
    do:async()=>{
		  await interaction.reply('Coming soon...');
    }
  }
};
