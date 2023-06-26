import path, { basename, join} from 'path'
import { rename, rm } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { stdout } from 'process';

import { getFullPath } from '../utils/get-full-path.js';
import { showMessage } from '../utils/show-message.js';
import { messagesName } from '../constants/messages-name.js';

export const addFile = async (args) => {  
    return new Promise((resolve, reject) => {   
        const ws = createWriteStream(args[0]);

        const handleError = (error) => {            
            showMessage(messagesName.error, `Create file failed: ${error}`);
            ws.destroy();  
            reject(); 
        }; 

        ws.end();
        ws.on('error', handleError);
        ws.on('finish', () => {
            showMessage(messagesName.success, "Create file succesfully"); 
            resolve()        
        });
    });
    
}

export const renameFile = async (args) => {          
    const [currentName, newName] = args;

    try {
        rename(getFullPath(args[0]), getFullPath(args[1]));
        showMessage(messagesName.success, "Rename file succesfully");
    } catch (error) {
        showMessage(messagesName.error, `Rename file operation failed : ${error}`);
    }
}

export const removeFile = async (args) => {
    try {
        rm(getFullPath(args[0]));
        showMessage(messagesName.success, "Remove file succesfully");
    } catch (error) {
        showMessage(messagesName.error, `Remove file operation failed : ${error}`);
    }
}

export const readFile = async (args) => {      
    return new Promise((resolve, reject) => {
        const rs = createReadStream(args[0]);

        const handleError = (error) => {
            rs.destroy();
            showMessage(messagesName.error, `Read file operation failed: ${error}`);
            reject();        
        }; 
    
        rs.on('error', handleError); 
        rs.on('end', () => {        
            showMessage(messagesName.success, `Read file successfully!`)
            resolve();
        });
    
        rs.pipe(process.stdout);     
    });
        
}

export const copyFile = async (args) => {  
    return new Promise((resolve, reject) => { 
        const fileName = basename(args[0]);   
        const destinationPath = join(args[1],fileName);
        const rs = createReadStream(args[0]);   
        const ws = createWriteStream(destinationPath);
        
        const handleError = (error) => {
            showMessage(messagesName.error, error);
            rs.destroy();
            ws.end('Finished with error');
            reject(); 
        };  

        rs.on('error',handleError);
        ws.on('error', handleError);
        ws.on('finish', () => {
            showMessage(messagesName.success, "File copied successfully!");
            resolve();
        });
    
        rs.pipe(ws);
    });
}

export const moveFile = async (args) => {     
    return new Promise((resolve, reject) => {      
        const fileName = basename(args[0]);   
        const destinationPath = join(args[1],fileName);
        const rs = createReadStream(args[0]);   
        const ws = createWriteStream(destinationPath);
        
        const handleError = (error) => {
            showMessage(messagesName.error, error);            
            rs.destroy();
            ws.end('Finished with error');
            reject();
        };  

        rs.on('error',handleError);
        ws.on('error', handleError);
        ws.on('finish', () => {
            removeFile(args);
            showMessage(messagesName.success, "File moved successfully!");
            resolve();
        });
   
        rs.pipe(ws); 
    }); 
}
