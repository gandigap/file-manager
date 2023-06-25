import { basename, join} from 'path'
import { createReadStream, createWriteStream, unlink } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

import { showMessage } from '../utils/show-message.js';
import { messagesName } from '../constants/messages-name.js';
import { removeFile } from './file-system.js';
import { deleteFile } from '../utils/delete-file.js';



export const compress = async (args) => {
    const fileName = basename(args[0]); 
    const destinationPath = join(args[1],fileName + BR_EXTENSION);

    const rs = createReadStream(args[0]);
    const ds = createWriteStream(destinationPath);
    const bs = createBrotliCompress();

    const handleError = (error) => {
        showMessage(messagesName.error, error);
        rs.destroy();
        ds.destroy();
        bs.destroy();
    }; 

    rs.on('error', handleError);
    ds.on('error', handleError);
    bs.on('error', handleError);
    ds.on('finish', () => {
        deleteFile(args[0]);
        showMessage(messagesName.success, "File compressed successfully!")
    });

    rs.pipe(bs).pipe(ds);
}

export const decompress = async (args) => {
    let fileName = basename(args[0]); 

    if (fileName.endsWith(BR_EXTENSION)) {
        fileName = fileName.slice(0, -DOT_BR.length);
    }

    const destinationPath = join(args[1],fileName);

    const rs = createReadStream(args[0]);
    const ds = createWriteStream(destinationPath);
    const bs = createBrotliDecompress();

    const handleError = (error) => {
        showMessage(messagesName.error, error);
        rs.destroy();
        ds.destroy();
        bs.destroy();
    }; 
    console.error('1');
    rs.on('error', handleError);
    ds.on('error', handleError);
    bs.on('error', handleError);
    ds.on('finish', () => {
        deleteFile(args[0]);
        showMessage(messagesName.success, "File decompressed successfully!")
    });

    rs.pipe(bs).pipe(ds);
}


