
import { COMMANDS } from "../constants/commands.js";
import { messagesName } from "../constants/messages-name.js";
import { addFile, readFile, removeFile, renameFile } from "../modules/file-system.js";
import { cd, ls, up } from "../modules/navigation.js";
import { showMessage } from "./show-message.js";

export const run = (command, args) => {
    switch (command) {
        case COMMANDS.add:
            addFile(args);
            break;
        case COMMANDS.rm:
            removeFile(args);
            break;
        case COMMANDS.rn:
            renameFile(args);
            break;
        case COMMANDS.cat:
            readFile(args);
            break;
        case COMMANDS.cp:
            
            break;
        case COMMANDS.mv:
            
            break;
        case COMMANDS.ls:
            ls(args);
            break;
        case COMMANDS.up:
            up();
            break;
        case COMMANDS.cd:
            cd(args);
            break;
        default:
            break;
    }

    showMessage(messagesName.curDir);
}