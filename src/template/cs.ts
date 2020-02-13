import { base } from './base';
import { fileModel } from '../models/fileModel';
import { fileApi } from '../fileApi';

export class cs extends base {
    constructor(file: fileModel, specs: Array<string>) {
        super(file, specs);
    }
    public getContent() {
        var eValue = this.getSpecValue("e");
        var cValue = this.getSpecValue("c");
        var iValue = this.getSpecValue("i");
        var pValue = this.getSpecValue("p");
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
        output += 'using System;\n';
        output += '\n';
        output += 'namespace ';
        if (pValue !== null) {
            output += pValue + '\n';
        } else {
            output += ' Program\n';
        }
        output += '    {\n';
        output += '        public class';
        if (cValue !== null) {
            output += ' ' + cValue;
        } else {
            output += ' name';
        }

        if (eValue !== null) {
            output += " : " + eValue;
        }
        output += "\n";
        output += '            {\n';
        output += '                static int Main(){\n';
        output += '                        //your code here\n';
        output += '                }\n';
        output += '            }\n';
        output += '    }\n';
        return output;
    }
    public saveFile() {
        fileApi.saveFile(this.file.getFullLink() + ".cs", this.getContent());
        this.openFileForEdit(this.file.getFullLink() + ".cs");
        /*
        var openPath = vscode.Uri.parse("file:/" +); //A request file path
        vscode.workspace.openTextDocument(openPath).then(doc => {
            vscode.window.showTextDocument(doc);
        });
        */
    }

}