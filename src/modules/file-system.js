import path, { basename, join} from 'path'
import { rename, rm } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { stdout } from 'process';

import { getFullPath } from '../utils/get-full-path.js';
import { showMessage } from '../utils/show-message.js';
import { messagesName } from '../constants/messages-name.js';

export const addFile = async (args) => {   
    try {
        const ws = createWriteStream(args[0]);

        const handleError = (error) => {
            ws.destroy();
            showMessage(messagesName.error, `Create file failed: ${error}`);        
        }; 

        ws.end();
        ws.on('error', handleError);
        ws.on('finish', () => {
            showMessage(messagesName.success, "Create file succesfully"); 
        });
    } catch (error) {
        showMessage(messagesName.error, `Create file failed: ${error}`);
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

    const handleError = (error) => {
        rs.destroy();
        showMessage(messagesName.error, "Read file operation failed");        
    }; 

    rs.on('error', handleError);
    

    rs.on('end', () => {        
        showMessage(messagesName.success, "Read file successfully!")
    });

    rs.pipe(process.stdout);         
}

export const copyFile = async (args) => {   
    const fileName = basename(args[0]);   
    const destinationPath = join(args[1],fileName);
    const rs = createReadStream(args[0]);   
    const ws = createWriteStream(destinationPath);
    
    const handleError = (error) => {
        showMessage(messagesName.error, error);
        rs.destroy();
        ws.destroy();
    };  

    rs.on('error',handleError);
    ws.on('error', handleError);
    ws.on('finish', () => {
        showMessage(messagesName.success, "File copied successfully!")
    });
   
    rs.pipe(ws);
}

export const moveFile = async (args) => {          
    const fileName = basename(args[0]);   
    const destinationPath = join(args[1],fileName);
    const rs = createReadStream(args[0]);   
    const ws = createWriteStream(destinationPath);
    
    const handleError = (error) => {
        showMessage(messagesName.error, error);
        rs.destroy();
        ws.destroy();
    };  

    rs.on('error',handleError);
    ws.on('error', handleError);
    ws.on('finish', () => {
        removeFile(args);
        showMessage(messagesName.success, "File moved successfully!")
    });
   
    rs.pipe(ws);  
}
