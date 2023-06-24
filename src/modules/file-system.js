import { writeFile, rename, rm } from 'fs/promises';
import {createReadStream} from 'fs';
import { stdout } from 'process';

import { getFullPath } from '../utils/get-full-path.js';
import { showMessage } from '../utils/show-message.js';
import { messagesName } from '../constants/messages-name.js';

export const addFile = async (args) => {
    try {
        await writeFile(getFullPath(args[0]), '', {flag: wx});
    } catch (error) {
        showMessage(messagesName.error, "Create file operation failed");
    }
}

export const renameFile = async (args) => {    
    const [currentName, newName] = args;

    try {
        await rename(getFullPath(args[0]), getFullPath(args[1]));
    } catch (error) {
        showMessage(messagesName.error, "Rename file operation failed");
    }
}

export const removeFile = async (args) => {
    try {
        await rm(getFullPath(args[0]));
    } catch (error) {
        showMessage(messagesName.error, "Remove file operation failed");
    }
}

export const readFile = async (args) => {          
    const rs = createReadStream(args[0]);
    
    rs.on('error', handleError)
        .pipe(process.stdout);

    const handleError = (error) => {
        showMessage(messagesName.error, "Read file operation failed");
        rs.destroy();
    };      
}