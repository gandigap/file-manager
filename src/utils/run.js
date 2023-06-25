
import { COMMANDS } from "../constants/commands.js";
import { messagesName } from "../constants/messages-name.js";
import { addFile, copyFile, moveFile, readFile, removeFile, renameFile } from "../modules/file-system.js";
import { cd, ls, up } from "../modules/navigation.js";
import { showMessage } from "./show-message.js";

export const run = async (command, args) => {
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
            await readFile(args);
            break;
        case COMMANDS.cp:
            await copyFile(args);
            break;
        case COMMANDS.mv:
            await moveFile(args);
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