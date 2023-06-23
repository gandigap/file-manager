import { messagesName } from '../constants/index.js';
import { showMessage } from '../utils/showMessage.js';
import { exit } from '../utils/exit.js';

const app = () => {
    console.log('2', messagesName);
    showMessage(messagesName.greet);

    process.stdin.on("data", (data) => {
        const fullCommand = data.toString().trim().split(' ');
        console.log('data', data)
      });

    process.on('SIGINT', () => exit());
}

export { app };



