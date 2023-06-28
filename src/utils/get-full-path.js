import { join } from 'path';

export const getFullPath = ( filePath ) => {
    return join(process.cwd(), filePath);
}