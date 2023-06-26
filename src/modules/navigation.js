import { readdir } from 'fs/promises';

import { showMessage } from '../utils/show-message.js';
import { messagesName } from '../constants/messages-name.js';

export const ls = async (args) => {
    let directoriesPath = process.cwd();
    const directories = [];
    const files = [];

    if (args.length) {
        directoriesPath = args[0];
    }

    try {
        const dirItems = await readdir(directoriesPath, {withFileTypes: true});

        dirItems.forEach(item => {
            const { name } = item;

            if (item.isDirectory()) {
                directories.push({
                    type: 'directory',
                    name,
                })
            }

            if (item.isFile()) {
                files.push({
                    type: 'file',
                    name,
                })
            }
        });        

        console.table(directories.concat(files));

    } catch (error) {
        showMessage(messagesName.error, error);
    }    
}

export const up = () => {
    try {
        process.chdir('..');
    } catch (error) {
        showMessage(messagesName.error, error);
    }
  };
  
  export const cd = (args) => {
    try {
        process.chdir(args[0]);
    } catch (error) {
        showMessage(messagesName.error, error);
    }
  };