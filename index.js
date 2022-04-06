// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
// Add environment variables
require('dotenv').config()
// Add file system
const fs = require('node:fs');

require('./deploy-commands');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Create new command instance
client.commands = new Collection();

//All files containing commands
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    //Set new item in collection
    //set key as command name and value as export module
    client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});


// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);
