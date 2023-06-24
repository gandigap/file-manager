import { writeFile } from 'fs/promises';
import { getFullPath } from '../utils/get-full-path.js';

export const create = async (args) => {
    console.log('create', args,getFullPath(args[0]));

    try {
        await writeFile( getFullPath(args[0]), '', {flag: wx});
    } catch (error) {
        console.log('File is exist');
    }
}