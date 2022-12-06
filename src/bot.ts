import {Client, GatewayIntentBits, Message} from 'discord.js';
import * as dotenv from 'dotenv';
import ready from './listeners/ready';
import messageCreate from './listeners/messageCreate';
dotenv.config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ],
});

let botPrefix = '.yousof';

ready(client);

messageCreate(client, botPrefix);

client.login(process.env.TOKEN);
