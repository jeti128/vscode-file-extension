import { fileModel } from './models/fileModel';
import { fileApi } from './fileApi';
import { template_implement } from './template_implement';

export class createFile {
    constructor(file:fileModel,specs:Array<string>) {
        fileApi.createFolder(file);
        template_implement.savefile(file,specs);

    }
}