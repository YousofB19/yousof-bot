import {Message} from 'discord.js';
import {raffleARole, raffleBRole} from './constants';
import {checkIfUserIsModerator} from './generalUtils';

export function resetRaffleRoles(msg: Message) {
  if (checkIfUserIsModerator(msg)) {
    msg.reply('Are you sure you want to reset all raffle roles? Yes/No');

    let channel = msg.channelId;
    let author = msg.author.id;
    let filter = (m: Message) =>
      m.channelId === channel && m.author.id === author;

    msg.channel
      .awaitMessages({filter, max: 1})
      .then(async (messages) => {
        let newMessage = messages.first();
        if (newMessage?.content === 'Yes' || newMessage?.content === 'No') {
          if (newMessage.content === 'Yes') {
            let botReply = await newMessage.reply('Clearing roles...');
            resetRole(msg, raffleARole);
            resetRole(msg, raffleBRole);
            botReply.edit('Cleared all raffle roles.');
          } else {
            newMessage.reply('Abandoned operation.');
          }
        } else {
          newMessage?.reply('Invalid reply.');
        }
      })
      .catch((err) => {});
  } else {
    msg.reply('You do not have permission to do this command.');
  }
}

async function resetRole(msg: Message, roleID: string) {
  const role = await msg.guild?.roles.fetch(roleID);

  role?.members.forEach((member) => {
    if (role !== undefined || role !== null) {
      member.roles.remove(role);
    }
  });
}
