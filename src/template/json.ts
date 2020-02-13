import { base } from './base';
import { fileModel } from '../models/fileModel';
import { fileApi } from '../fileApi';

export class json extends base {
    constructor(file:fileModel, specs:Array<string>) {
        super(file,specs);
    }
    public getContent() {
        var output = "";
        output +=  "{\n";
        output +=  "    \n";
        output +=  "}";

        return output;
    }

    public saveFile() {
        fileApi.saveFile(this.file.getFullLink() + ".json", this.getContent());
        this.openFileForEdit(this.file.getFullLink() + ".json");
    }
}