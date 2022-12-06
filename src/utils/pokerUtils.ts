import {Message} from 'discord.js';
import {checkIfUserIsModerator} from './generalUtils';
import {isEmpty} from './validationUtils';

export async function handlePokerChipsReset(msg: Message) {
  if (checkIfUserIsModerator(msg)) {
    msg.reply('Upload the .csv file');

    let channel = msg.channelId;
    let author = msg.author.id;
    let filter = (m: Message) =>
      m.channelId === channel && m.author.id === author;

    msg.channel
      .awaitMessages({filter, max: 1})
      .then(async (messages) => {
        let newFileMessage = messages.first();
        let fileUrl = newFileMessage?.attachments.first()?.url;
        if (!isEmpty(newFileMessage?.attachments.first())) {
          if (fileUrl != undefined) {
            let request = await fetch(fileUrl);
            if (request.ok) {
              let response = await request.blob();
              if (response.type === 'text/csv;%20charset=utf-8') {
                let fileText = await response.text();
                let botReply = await newFileMessage?.reply(
                  'Processing file...',
                );
                setTimeout(() => {
                  botReply?.edit(
                    '```' + formatPokerChipsText(fileText) + '```',
                  );
                }, 1000);
              } else {
                newFileMessage?.reply('Invalid file type. Please try again.');
              }
            } else {
              newFileMessage?.reply('Something went wrong. Please try again.');
            }
          } else {
            newFileMessage?.reply('Something went wrong. Please try again.');
          }
        } else {
          newFileMessage?.reply('Please try again and upload a file.');
        }
      })
      .catch((err) => {});
  } else {
    msg.reply('You do not have permission to do this command.');
  }
}

function formatPokerChipsText(text: string) {
  let array = text.split('\n');
  array = array.slice(1, array.length - 1);
  let returnedText = '';
  array.forEach((item) => {
    returnedText += formatTextLine(item) + '\n';
  });
  return returnedText;
}

function formatTextLine(text: string) {
  let array = text.split(',');
  return `/admin-chips remove member:${array[array.length - 2]} quantity:${
    array[array.length - 1]
  }`;
}
