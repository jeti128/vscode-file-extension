import { base } from './base';
import { fileModel } from '../models/fileModel';
import { fileApi } from '../fileApi';

export class react extends base {
    constructor(file:fileModel, specs:Array<string>) {
        super(file,specs);
    }
    public getContent() {
        var cValue = this.getSpecValue("c");
        if (cValue === "" || cValue === " ") {
            cValue = "view";
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

        output +=  "class " + cValue + " extends React.Component {\n";
        output +=  '    constructor(props) {\n';
        output +=  '        super(props);\n';
        output +=  '        this.state = {\n';
        output +=  '            value: null,\n';
        output +=  '        };\n';
        output +=  '    }\n';
        output +=  "    render() {\n";
        output +=  "        \n";
        output +=  "    }\n";
        output +=  '    \n';
        output +=  '    renderSquare(i) {\n';
        output +=  '        \n';
        output +=  '    }\n';
        output +=  '    \n';
        output +=  "}";

        return output;
    }

    public saveFile() {
        fileApi.saveFile(this.file.getFullLink() + ".js", this.getContent());
        this.openFileForEdit(this.file.getFullLink() + ".js");
        /*
        var openPath = vscode.Uri.parse("file:/" +this.file.getFullLink() + ".js"); //A request file path
        vscode.workspace.openTextDocument(openPath).then(doc => {
            vscode.window.showTextDocument(doc);
        });*/
    }
}