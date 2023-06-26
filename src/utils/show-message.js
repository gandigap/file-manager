import { getUserName } from "./get-user-name.js"
import { messagesName } from '../constants/messages-name.js';
import { endOfLine } from '../constants/common.js';

export const showMessage = (nameMessage, additionalInfo) => {
    let message = '';
    switch (nameMessage) {
        case messagesName.greet:
            message = `Welcome to the File Manager, ${getUserName()}!`;
            break;
        case messagesName.exit:
            message = `Thank you for using File Manager, ${getUserName()}, goodbye!`;
            break; 
        case messagesName.error:
            process.stdout.write(`${additionalInfo}${endOfLine}`);
            break;
        case messagesName.success:
            process.stdout.write(`${endOfLine}${additionalInfo}${endOfLine}`);         
            break;
        case messagesName.curDir:
            process.stdout.write(`You are currently in ${process.cwd()}`);
            break;
        case messagesName.hash:
            process.stdout.write(`Hash file is ${additionalInfo}${endOfLine}`);
            break;
        case messagesName.eol:
            process.stdout.write(`EOL stringify : ${additionalInfo}${endOfLine}`);
            break;
        case messagesName.amountCPU:
            process.stdout.write(`CPUS amount: ${additionalInfo}`);
            break;
        case messagesName.homeDir:
            process.stdout.write(`Home directory: ${additionalInfo}${endOfLine}`);
            break;
        case messagesName.userName:
            process.stdout.write(`User name : ${additionalInfo}${endOfLine}`);
            break;
        case messagesName.arch:
            process.stdout.write(`CPU architecture : ${additionalInfo}`);
            break;
        case messagesName.enterCommand:
            process.stdout.write(`*** Dear user, please enter the desired command. ***`);
            break; 
        case messagesName.notFoundCommand:
            process.stdout.write(`*** Sorry, entered command not found. ***${endOfLine}`);
            break;
    }

    process.stdout.write(`${message}${endOfLine}`); 
}