import { cpus } from 'os';
import { showMessage } from '../utils/show-message.js';
import { messagesName } from '../constants/messages-name.js';

export const showCpuInfo = () => {
    const cpuInfo = cpus()
        .map(processor => ( {
            model: processor.model.split(' ').slice(0, -2).join(' '),
            'clock rate': `${(Math.round(processor.speed / 100) / 10).toFixed(2)}GHz`}
    ));
    
    showMessage(messagesName.amountCPU, cpuInfo.length);

    console.table(cpuInfo);
}