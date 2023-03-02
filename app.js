import 'dotenv/config';
import { REST, Routes } from 'discord.js'
import { COMMANDS } from './commands.js';
import { readDirectory,getActualDirectory } from './utils.js';

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);




(async () => {

	const fileNames = await readDirectory(`${getActualDirectory()}/commands`);
	console.log(fileNames)
	const COMMANDS2= []
	for(let name in fileNames) {
		const {command} = await import(`./commands/${fileNames[name]}`)
		COMMANDS2.push(command)
	};
	console.log(COMMANDS2)

	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: COMMANDS2});

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
	const command = COMMANDS[interaction.commandName]
	console.log(command)
	if (command) await command.execute(interaction) 
});

client.login(process.env.TOKEN);