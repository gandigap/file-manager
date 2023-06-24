import { getUserName } from "./get-user-name.js"
import { messagesName } from '../constants/messages-name.js';
import { endOfLine } from '../constants/common.js';

export const showMessage = (nameMessage, additionalInfo) => {
    let message = '';
    switch (nameMessage) {
        case messagesName.greet:
            message = `Welcome to the File Manager, ${getUserName()}!`;
            break;
        case messagesName.parting:
            message = `Thank you for using File Manager, ${getUserName()}, goodbye!`;
            break; 
        case messagesName.error:
            process.stdout.write(`${additionalInfo}${endOfLine}`);
            message = `Some error`;
            break;
        case messagesName.curDir:
            process.stdout.write(`You are currently in ${process.cwd()}${endOfLine}`);
            break;
                 
    }
    process.stdout.write(`${message}${endOfLine}`); 
}