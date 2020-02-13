import { base } from './base';
import { fileModel } from '../models/fileModel';
import { fileApi } from '../fileApi';

export class html extends base {
    constructor(file:fileModel, specs:Array<string>) {
        super(file,specs);
    }
    public getContent() {
        var output = "";
        output +=  "<!DOCTYPE html>\n";
        output +=  "<html>\n";
        output +=  "    <head>\n";
        output +=  "        <title> html page </title>\n";
        output +=  '        <meta charset="UTF-8">\n';
        output +=  '        <meta name="description" content="html page">\n';
        output +=  '        <meta name="keywords" content="html page ">\n';
        output +=  '        <meta name="author" content="' + this.userName + '">\n';
        //output +=  '        <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
        output +=  "    </head>\n";
        output +=  "    <body>\n";
        output +=  "        your html page\n";
        output +=  "    </body>\n";
        output +=  "</html>\n";

        return output;
    }
    public saveFile() {
        fileApi.saveFile(this.file.getFullLink() + ".html", this.getContent());
        this.openFileForEdit(this.file.getFullLink() + ".html");
        /*
        var openPath = vscode.Uri.parse("file:/" +this.file.getFullLink() + ".html"); //A request file path
        vscode.workspace.openTextDocument(openPath).then(doc => {
            vscode.window.showTextDocument(doc);
        });*/
    }

}