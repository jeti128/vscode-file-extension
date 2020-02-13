import { base } from './base';
import { fileModel } from '../models/fileModel';
import { fileApi } from '../fileApi';

export class php extends base{
    constructor(file:fileModel, specs:Array<string>) {
        super(file, specs);
    }

    public getContent() {
        var output = "<?php\n";
        var eValue = this.getSpecValue("e");
        var cValue = this.getSpecValue("c");
        var iValue = this.getSpecValue("i");
        output += '/*\n';
        output += ' * +--------------------------Metainfo------------------------------------------+\n';
        output += ' * Author : ' + this.userName + '\n';
        output += ' * Tool   : VSCode / jT file vscode\n';
        output += ' * Date   : ' + this.getDateTimeTo() +'\n';
        output += ' * Version: 1.0.0\n';
        output += ' * +--------------------------Descript------------------------------------------+\n';
        output += ' * Write here your descript\n';
        output += ' * +--------------------------Code----------------------------------------------+\n';
        output += ' */\n';                
        output +=  "\n";

        if (eValue !== null)
        {
            output += 'include "";\n';
        }
        output +=  "\n";
        if (cValue !== null)
            {
                output +=  "class " + cValue;
                if (eValue !== null)
                    {
                        output +=  " extends " + eValue;
                        if (iValue !== null)
                            {
                                output +=  " interface " + iValue;
                            }                                        
                    }
                output +=  "\n";        
                output +=  "    {\n";
                output +=  "        public function __construct()\n";
                output +=  "            {\n";
                output +=  "                //your code here\n";
                output +=  "                \n";
                output +=  "            }\n";
                output +=  "    }\n";
            }

        output +=  "?>\n";

        return output;
    }

    public saveFile() {
        //console.log(this.file.getFullLink() + ".php");
        fileApi.saveFile(this.file.getFullLink() + ".php", this.getContent());
        this.openFileForEdit(this.file.getFullLink() + ".php");
        /*
        var openPath = vscode.Uri.parse("file:/" +this.file.getFullLink() + ".php"); //A request file path
        vscode.workspace.openTextDocument(openPath).then(doc => {
            vscode.window.showTextDocument(doc);
        });*/
    }
}