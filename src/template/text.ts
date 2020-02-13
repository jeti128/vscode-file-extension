import { base } from './base';
import { fileModel } from '../models/fileModel';
import { fileApi } from '../fileApi';

export class text extends base {
    constructor(file:fileModel, specs:Array<string>) {
        super(file,specs);
    }

    public saveFile() {
        fileApi.saveFile(this.file.getFullLink() + ".txt", "");
        this.openFileForEdit(this.file.getFullLink() + ".txt");
        /*
        var openPath = vscode.Uri.parse("file:/" +this.file.getFullLink() + ".txt"); //A request file path
        vscode.workspace.openTextDocument(openPath).then(doc => {
            vscode.window.showTextDocument(doc);
        });*/
    }

}