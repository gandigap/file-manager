
import { COMMANDS } from "../constants/commands.js";
import { messagesName } from "../constants/messages-name.js";
import { compress, decompress } from "../modules/compress-decompress.js";
import { addFile, copyFile, moveFile, readFile, removeFile, renameFile } from "../modules/file-system.js";
import { calculateHash } from "../modules/hash.js";
import { cd, ls, up } from "../modules/navigation.js";
import { opepationSystem } from "../modules/operation-sytem.js";
import { exit } from "./exit.js";
import { showMessage } from "./show-message.js";

export const run = async (command, args) => {
    try {
        switch (command) {
            case COMMANDS.add:
                await addFile(args);
                break;
            case COMMANDS.rm:
                removeFile(args);
                break;
            case COMMANDS.rn:
                renameFile(args);
                break;
            case COMMANDS.cat:
                await readFile(args);
                break;
            case COMMANDS.cp:
                await copyFile(args);
                break;
            case COMMANDS.mv:
                await moveFile(args);
                break;
            case COMMANDS.ls:
                await ls(args);
                break;
            case COMMANDS.up:
                up();
                break;
            case COMMANDS.cd:
                cd(args);
                break;
            case COMMANDS.hash:
                await calculateHash(args);
                break;
            case COMMANDS.os:
                await opepationSystem(args);
                break;
            case COMMANDS.compress:
                await compress(args);
                break;
            case COMMANDS.decompress:
                await decompress(args);
                break;
            case COMMANDS.exit:
                exit();
                break;
            default:
                showMessage(messagesName.notFoundCommand);
                break;              
        }      
        
    } catch (error) {
        showMessage(messagesName.error, error);
        
    }
    showMessage(messagesName.curDir);
    showMessage(messagesName.enterCommand); 
}

