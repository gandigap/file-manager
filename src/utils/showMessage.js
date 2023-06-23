import {messagesName} from '../constants/index.js';
import { getUserName } from "./getUserName.js"

export const showMessage = (nameMessage) => {
    console.log('showMessage', nameMessage);
    let message = ''
    switch (nameMessage) {
        case messagesName.greet:
            message = `Welcome to the File Manager, ${getUserName()}!`;
            break;            

        case messagesName.parting:
            message = `Thank you for using File Manager, ${getUserName()}, goodbye!`;
            break;        
    }
    console.log(message); 
}