import { REST, Routes,GatewayIntentBits } from 'discord.js'
import 'dotenv/config';
import { readDirectory,getActualDirectory } from './utils.js';
import RPC from 'discord-rpc'; 

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
const scopes = ['rpc', 'rpc.api', 'messages.read'];
const COMMANDS= [];
let COMMANDS_MAP= {};

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
 
const client = new RPC.Client({ transport: 'ipc',intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildVoiceStates] });
RPC.register(process.env.CLIENT_ID);

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
async function setActivity() {
  if (!client)  return;
   
	client.setActivity({
    details: `Triste`,
    state: 'y solo',
    startTimestamp:new Date(),
    largeImageKey: 'catcute',
    largeImageText: 'UwU',
    smallImageKey: 'catcute',
    smallImageText: 'Fufu',
    instance: false,
  });
}

client.on('ready', () => {
  console.log('Logged in as', client.application.name);
  console.log('Authed for user', client.user.username);

	setActivity();

  setInterval(() => {
    setActivity();
  }, 15e3);
});

// Log in to RPC with client id
client.login({ clientId:process.env.CLIENT_ID, scopes,accessToken:process.env.TOKEN }).catch(console.error);