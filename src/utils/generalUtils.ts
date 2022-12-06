import {Message} from 'discord.js';
import { dreamerRole, moderatorRole } from './constants';

export function checkIfUserIsModerator(msg: Message) {
  return msg.member?.roles.cache.some(
    (role) => role.id ===  moderatorRole,
  );
}

export function checkIfUserIsDreamer(msg: Message) {
  return msg.member?.roles.cache.some(
    (role) => role.id === dreamerRole,
  );
}