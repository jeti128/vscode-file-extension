import { base } from './base';
import { fileModel } from '../models/fileModel';
import { fileApi } from '../fileApi';

export class vue extends base {
    constructor(file:fileModel, specs:Array<string>) {
        super(file,specs);
    }
    public getContent() {
        var aValue = this.getSpecValue("a");
        if (aValue === "" || aValue === " ") {
            aValue = "app";
        }
        var output = "";
        output += '<!--\n';
        output += '+--------------------------Metainfo------------------------------------------+\n';
        output += 'Author : ' + this.userName + '\n';
        output += 'Tool   : VSCode / jT file vscode\n';
        output += 'Date   : ' + this.getDateTimeTo() + '\n';
        output += 'Version: 1.0.0\n';
        output += '+--------------------------Descript------------------------------------------+\n';
        output += 'Write here your descript\n';
        output += '+--------------------------Code----------------------------------------------+\n';
        output += '-->\n';
        output +=  "<template>\n";
        output +=  "</template>\n";
        output +=  "\n";
        output +=  "<script>\n";
        output +=  "export default {\n";
        output +=  "    name: '" + aValue + "',\n";
        output +=  "    components: {\n";
        output +=  "    },\n";
        output +=  "    data: () => ({\n";
        output +=  "    }),\n";
        output +=  "    created() {\n";
        output +=  "    },\n";
        output +=  "    mounted() {\n";
        output +=  "    },\n";
        output +=  "    methods: {\n";
        output +=  "    }\n";
        output +=  "}\n";
        output +=  "</script>\n";
        output +=  "\n";
        output +=  "<style>\n";
        output +=  "</style>";
        return output;
    }

    public saveFile() {
        fileApi.saveFile(this.file.getFullLink() + ".vue", this.getContent());
        this.openFileForEdit(this.file.getFullLink() + ".vue");
        /*
        var openPath = vscode.Uri.parse("file:/" +this.file.getFullLink() + ".vue"); //A request file path
        vscode.workspace.openTextDocument(openPath).then(doc => {
            vscode.window.showTextDocument(doc);
        });*/
    }
}