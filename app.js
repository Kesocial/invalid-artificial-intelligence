import 'dotenv/config';
import { REST, Routes } from 'discord.js'
import { COMMANDS } from './commands.js';

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: COMMANDS});

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

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return; 
	if (interaction.commandName="test") {
		await interaction.reply('Hello World!');
	}
	if (interaction.commandName="ping") {
		await interaction.reply('Pong!');
	}
	if (interaction.commandName="play") {
		await interaction.reply('Coming Soon!');
	}
});

client.login(process.env.TOKEN);