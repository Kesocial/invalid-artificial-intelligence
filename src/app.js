import { Client,REST, Routes,GatewayIntentBits } from 'discord.js'
import 'dotenv/config';
import express from "express"
import { readDirectory,getActualDirectory } from './utils.js';

const app = express()
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
const scopes = ['rpc', 'rpc.api', 'messages.read'];
const COMMANDS= [];
let COMMANDS_MAP= {};
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
(async () => { 
	const fileNames = await readDirectory({path:`${getActualDirectory()}/commands`,options:{withFileTypes:false}}); 
	// console.log({fileNames})
	for(let name in fileNames) {
		if(fileNames[name].split(".")[1]==="js") {
			const {command} = await import(`./commands/${fileNames[name]}`)
			COMMANDS.push(command)
			COMMANDS_MAP = {...COMMANDS_MAP, [command.name]:command }
		}
	};
	// console.log(COMMANDS)
	// console.log(COMMANDS_MAP)
	try {
		console.log('Started refreshing application (/) commands.'); 
		await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: COMMANDS}); 
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
 
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
}); 
client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return; 
	// console.log({interaction})
	const command = COMMANDS_MAP[interaction.commandName]
	// console.log({command})
	// console.log(COMMANDS_MAP)
	if (command) await command.execute(interaction) 
});

client.on('ready', () => {
  console.log('Logged in as', client.application.name);
  console.log('Authed for user', client.user.username);
});

// Log in to RPC with client id
client.login({ clientId:process.env.CLIENT_ID, scopes,accessToken:process.env.TOKEN }).catch(console.error);