import { messagesName } from '../constants/index.js';
import {showMessage} from './showMessage.js';

export const exit = () => {
    showMessage(messagesName.parting);
    process.exit(0);
}