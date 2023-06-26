import { basename, join} from 'path'
import { createReadStream, createWriteStream, unlink } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

import { showMessage } from '../utils/show-message.js';
import { messagesName } from '../constants/messages-name.js';
import { removeFile } from './file-system.js';
import { BR_EXTENSION } from '../constants/common.js';

export const compress = async (args) => {
    return new Promise((resolve, reject) => { 
    const fileName = basename(args[0]); 
        const destinationPath = join(args[1],fileName + BR_EXTENSION);

        const rs = createReadStream(args[0]);
        const ws = createWriteStream(destinationPath);
        const bs = createBrotliCompress();

        const handleError = (error) => {
            showMessage(messagesName.error, error);
            rs.destroy();
            ws.end(`Finished with error : ${error}`);
            reject();
        }; 

        rs.on('error', handleError);
        ws.on('error', handleError);
        bs.on('error', handleError);
        ws.on('finish', () => {
            resolve();
            showMessage(messagesName.success, "File compressed successfully!");
        });

        rs.pipe(bs).pipe(ws);

    });
}

export const decompress = async (args) => {
    let fileName = basename(args[0]); 

    if (fileName.endsWith(BR_EXTENSION)) {
        fileName = fileName.slice(0, -BR_EXTENSION.length);
    }

    const destinationPath = join(args[1],fileName);

    const rs = createReadStream(args[0]);
    const ws = createWriteStream(destinationPath);
    const bs = createBrotliDecompress();

    const handleError = (error) => {
        showMessage(messagesName.error, error);
        rs.destroy();
        ws.end(`Finished with error : ${error}`);
    }; 

    rs.on('error', handleError);
    ws.on('error', handleError);
    bs.on('error', handleError);
    ws.on('finish', () => {
        showMessage(messagesName.success, "File decompressed successfully!")
    });

    rs.pipe(bs).pipe(ws);
}


