import { base } from './base';
import { fileModel } from '../models/fileModel';
import { fileApi } from '../fileApi';

export class c extends base {
    constructor(file: fileModel, specs: Array<string>) {
        super(file, specs);
    }
    public getContent() {
        var aValue = this.getSpecValue("a");
        if (aValue === "" || aValue === " ") {
            aValue = "";
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

        if (aValue) {
            output += "#include <stdio.h>\n";
            output += "\n";
            output += "int main() {\n";
            output += "\n";
            output += "    return 0;\n";
            output += "}";
        }

        return output;
    }

    public saveFile() {
        fileApi.saveFile(this.file.getFullLink() + ".c", this.getContent());
        this.openFileForEdit(this.file.getFullLink() + ".c");
    }
}