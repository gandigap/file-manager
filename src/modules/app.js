import { messagesName } from '../constants/messages-name.js';
import { showMessage } from '../utils/show-message.js';
import { exit } from '../utils/exit.js';
import { COMMANDS } from '../constants/commands.js';
import { run } from '../utils/run.js';

const app = async () => {
    showMessage(messagesName.greet);
    showMessage(messagesName.curDir);
    showMessage(messagesName.enterCommand);

    process.stdin.on("data", (data) => { 
        const [command , ...args] = data.toString().trim().split(' ');
      
        run(command, args);        
    });

    process.on('SIGINT', () => exit());
}

export { app };



