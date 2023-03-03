import { REST, Routes } from 'discord.js'
import 'dotenv/config';
import { readDirectory,getActualDirectory } from './utils.js';

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
const COMMANDS= [];

(async () => {

	const fileNames = await readDirectory({path:`${getActualDirectory()}/commands`,options:{withFileTypes:false}}); 
	console.log({fileNames})
	for(let name in fileNames) {
		const {command} = await import(`./commands/${fileNames[name]}`)
		COMMANDS.push({[command.name]:command})
	};
	console.log(COMMANDS)
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
	const command = COMMANDS[interaction.commandName]
	console.log({command})
	console.log(COMMANDS)
	if (command) await command.execute(interaction) 
});

client.login(process.env.TOKEN);