const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
dotenv.config();
const { DISCORD_TOKEN, GUILD_ID, CLIENT_ID } = process.env;

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
  new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
  new SlashCommandBuilder().setName('gif').setDescription('Gets a gif')
    .addStringOption(option => option.setName('search').setDescription('Type anything you want to see as a GIF'))
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
  
console.log(commands);