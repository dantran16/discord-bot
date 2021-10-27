console.log("hello!");

const dotenv = require('dotenv');
dotenv.config();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { DISCORD_TOKEN, GUILD_ID, CLIENT_ID, TENOR_KEY } = process.env;

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

//Message test
client.on("messageCreate", async msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
  else if (msg.content === "!gif") {
    let url = `https://g.tenor.com/v1/search?q=excited&key=${TENOR_KEY}&limit=8`
    let response = await fetch(url);
    let json = await response.json();
    console.log(json);
    const index = Math.floor(Math.random() * json.results.length);
    msg.reply(json.results[index].url)
  }
})

//Replaying to commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  } else if (commandName === 'gif') {
    console.log(interaction.options.getString('search'))
    const search = interaction.options.getString('search')
    let url = `https://g.tenor.com/v1/search?q=${search}&key=${TENOR_KEY}&limit=8`
    let response = await fetch(url);
    let json = await response.json();
    const index = Math.floor(Math.random() * json.results.length);
    await interaction.reply(json.results[index].url)
  }
});

// Login to Discord with your client's token
client.login(DISCORD_TOKEN);

