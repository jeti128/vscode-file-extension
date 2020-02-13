import { base } from './base';
import { fileModel } from '../models/fileModel';
import { fileApi } from '../fileApi';

export class simple extends base {
    constructor(file:fileModel, specs:Array<string>) {
        super(file,specs);
    }

    public saveFile() {
        fileApi.saveFile(this.file.getFullLink(), "");
        this.openFileForEdit(this.file.getFullLink());
        /*
        var openPath = vscode.Uri.parse("file:/" +this.file.getFullLink()); //A request file path
        vscode.workspace.openTextDocument(openPath).then(doc => {
            vscode.window.showTextDocument(doc);
        });*/
    }
}