import { messagesName } from '../constants/messages-name.js';
import {showMessage} from './show-message.js';

export const exit = () => {
    showMessage(messagesName.exit);
    process.exit();
}