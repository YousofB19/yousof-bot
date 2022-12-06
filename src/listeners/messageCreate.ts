import {Client} from 'discord.js';
import { resetRaffleRoles } from '../../src/utils/roleUtils';
import {checkIfUserIsDreamer} from '../../src/utils/generalUtils';
import {handlePokerChipsReset} from '../../src/utils/pokerUtils';

export default (client: Client, botPrefix: string): void => {
  client.on('messageCreate', async (msg) => {
    if (checkIfUserIsDreamer(msg)) {
      switch (msg.content) {
        case `${botPrefix} ping`: {
          msg.reply('pong');
          break;
        }
        case `${botPrefix} pong`: {
          msg.reply('ping');
          break;
        }
        case `${botPrefix} ClearPokerChips`: {
          handlePokerChipsReset(msg);
          break;
        }
        case `${botPrefix} ResetRaffleRoles`: {
          resetRaffleRoles(msg);
          break;
        }
      }
    }
  });
};
