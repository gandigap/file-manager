
import { COMMANDS } from "../constants/commands.js";
import { messagesName } from "../constants/messages-name.js";
import { create } from "../modules/file-system.js";
import { cd, ls, up } from "../modules/navigation.js";
import { showMessage } from "./show-message.js";

export const run = (command, args) => {
    switch (command) {
        case COMMANDS.add:
            create(args);
            break;
        case COMMANDS.rm:
            
            break;
        case COMMANDS.rn:
            
            break;
        case COMMANDS.cat:
            
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