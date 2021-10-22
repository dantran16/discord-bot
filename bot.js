console.log("hello!");

const dotenv = require('dotenv');
dotenv.config();

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { DISCORD_TOKEN, GUILD_ID, CLIENT_ID } = process.env;

// Create a new client instance
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS)
myIntents.add(Intents.FLAGS.GUILD_MEMBERS)
myIntents.add(Intents.FLAGS.GUILD_MESSAGES)
myIntents.add(Intents.FLAGS.DIRECT_MESSAGES)
myIntents.add(Intents.FLAGS.GUILD_MESSAGE_REACTIONS)
myIntents.add(Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS)
myIntents.add(Intents.FLAGS.GUILDS)
const client = new Client({ intents: myIntents})

// When the client is ready, run this code (only once)
client.once('ready', c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("messageCreate", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
})

//Replaying to commands
client.on('interactionCreate', async interaction => {
  console.log(interaction);
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
});

// Login to Discord with your client's token
client.login(DISCORD_TOKEN);

