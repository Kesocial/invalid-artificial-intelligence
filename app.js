import 'dotenv/config';
import { REST, Routes } from 'discord.js'
import { COMMANDS } from './commands.js';
import {readDirectory} from "./utils.js"
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
// readDirectory(path,()=>{
	 
// })
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: Object.keys(COMMANDS).map(key=>COMMANDS[key])});

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
	const command = COMMANDS.find()
	console.log(command)
	if (command) await command.execute(interaction) 
});

client.login(process.env.TOKEN);