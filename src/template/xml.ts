import { base } from './base';
import { fileModel } from '../models/fileModel';
import { fileApi } from '../fileApi';

export class xml extends base {
    constructor(file:fileModel, specs:Array<string>) {
        super(file,specs);
    }
    public getContent() {
        var aValue = this.getSpecValue("a");
        if (aValue === "" || aValue === " ") {
            aValue = "app";
        }
        var output = "";
        output += '/*\n';
        output += '+--------------------------Metainfo------------------------------------------+\n';
        output += 'Author : ' + this.userName + '\n';
        output += 'Tool   : VSCode / jT file vscode\n';
        output += 'Date   : ' + this.getDateTimeTo() + '\n';
        output += 'Version: 1.0.0\n';
        output += '+--------------------------Descript------------------------------------------+\n';
        output += 'Write here your descript\n';
        output += '+--------------------------Code----------------------------------------------+\n';
        output += '*/\n';

        output +=  '<?xml version="1.0" encoding="UTF-8"?>\n';

        return output;
    }

    public saveFile() {
        fileApi.saveFile(this.file.getFullLink() + ".xml", this.getContent());
        this.openFileForEdit(this.file.getFullLink() + ".xml");
        /*
        var openPath = vscode.Uri.parse("file:/" +this.file.getFullLink() + ".xml"); //A request file path
        vscode.workspace.openTextDocument(openPath).then(doc => {
            vscode.window.showTextDocument(doc);
        });*/
    }
}