import 'dotenv/config';
import { REST, Routes } from 'discord.js'
import { COMMANDS } from './commands.js';
const commands = [
  {
    name: 'test',
    description: 'Say hi to your app2!',
		execute:(message, args)=>{
			message.reply(`¡Hola ${message.author} welcome to the World!`);
		}
  },
  {
    name: 'ping',
    description: 'Replies with Pong2!',
		execute:(message, args)=>{
			message.reply(`Pong! to ${message.author}!`);
		}
  },
  {
    name: 'play',
    description: 'For play music!2',
		execute:(message, args)=>{
			message.reply(`Coming Soon!`);
		}
  }
];
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands});

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
 
import { Client, GatewayIntentBits } from 'discord.js'
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
}); 
client.on("error",async(error)=>{
	console.log(error)
})
client.on('interactionCreate', async (interaction) => {
	console.log("Interaccion")
  if (!interaction.isCommand()) return; // Ignore non-command interactions

  const { commandName } = interaction;
  const command = client.commands.get(commandName);

  if (!command) return; // Ignore unknown commands

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error('An error occurred:', error);
    await interaction.reply({
      content: 'An error occurred while executing this command.',
      ephemeral: true // Only visible to the user who executed the command
    });
  }
});


client.login(process.env.TOKEN);