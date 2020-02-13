import { base } from './base';
import { fileModel } from '../models/fileModel';
import { fileApi } from '../fileApi';

export class cpp extends base {
    constructor(file: fileModel, specs: Array<string>) {
        super(file, specs);
    }
    public getContent(type: string) {
        var cValue = this.getSpecValue("c");

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

        if (type === "main") {
            output += "#include <iostream>\n";
            output += "using namespace std;\n";
            output += "\n";
            output += "int main() {\n";
            output += '    cout << "Hello World!";\n';
            output += "    return 0;\n";
            output += "}\n";

        }

        if (type === "h") {
            if (cValue === "" || cValue === " ") {
                cValue = this.file.name;
            }

            output +=   "class " + cValue + " {\n";
            output +=   "   public:\n";
            output +=   "       " + cValue + "();\n";
            output +=   "        \n";
            output +=   "   private:\n";
            output +=   "        \n";
            output +=   "   protected:\n";
            output +=   "        \n";
            output +=   "};\n";
        }

        if (type === "cpp") {
            if (cValue === "" || cValue === " ") {
                cValue = this.file.name;
            }

            output += '#include "' + cValue + '.h"\n';
            output += "\n";
            output += cValue + "::" + cValue + "() {\n";
            output +=  "    \n";
            output += "}\n";
        }

        return output;
    }

    public saveFile() {
        var openPath;
        if (this.getSpecValue("c") === null) {
            fileApi.saveFile(this.file.getFullLink() + ".cpp", this.getContent("main"));
            this.openFileForEdit(this.file.getFullLink() + ".cpp");
            /*
            openPath = vscode.Uri.parse("file:/" + this.file.getFullLink() + ".cpp"); //A request file path
            vscode.workspace.openTextDocument(openPath).then(doc => {
                vscode.window.showTextDocument(doc);
            });*/
        } else {
            fileApi.saveFile(this.file.getFullLink() + ".cpp", this.getContent("cpp"));
            fileApi.saveFile(this.file.getFullLink() + ".h", this.getContent("h"));
        }
    }
}