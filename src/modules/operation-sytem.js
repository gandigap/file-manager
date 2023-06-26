import { EOL, homedir, arch, userInfo} from 'os';

import { messagesName } from "../constants/messages-name.js";
import { showMessage } from "../utils/show-message.js";
import { OS_ARGUMENTS } from '../constants/os-arguments.js';
import { showCpuInfo } from './show-cpu-info.js';
import { endOfLine } from '../constants/common.js';

export const opepationSystem = (args) => {
    const osArg = args[0];

    switch (osArg) {
        case OS_ARGUMENTS.eol:
            showMessage(messagesName.eol, JSON.stringify(EOL));
            break;
        case OS_ARGUMENTS.cpus:
            showCpuInfo()
            break;
        case OS_ARGUMENTS.homedir:
            showMessage(messagesName.homeDir, homedir());
            break;
        case OS_ARGUMENTS.username:
            showMessage(messagesName.userName, userInfo().username);
            break;
        case OS_ARGUMENTS.arch:
            showMessage(messagesName.arch, arch());
            break;
        default:
            showMessage(messagesName.error, `Operation failed`);
            break;
    }
}