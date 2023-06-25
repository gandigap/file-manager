import { readFile } from 'fs/promises';
import { createHash } from 'crypto';
import { showMessage } from '../utils/show-message.js';
import { messagesName } from '../constants/messages-name.js';

export const calculateHash = async (args) => {
    const fileContent = await readFile(args[0]);
    
    const hash = createHash('sha256');

    const hashHex = hash
        .update(fileContent)
        .digest('hex');

    showMessage(messagesName.hash, hashHex)
};