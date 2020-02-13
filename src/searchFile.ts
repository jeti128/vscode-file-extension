import * as vscode from 'vscode';
import { fileApi } from './fileApi';
import { searchFileList } from './searchFileList';

class search {
    public output: Array<Array<string>> = [];
    constructor(link: string, text: string,rootLink:string) {
        //console.log(rootLink);
        //console.log(link);
        var list = fileApi.getFiles(rootLink + link + "/");
        var a = 0;

        while (a < list[1].length) {
            //console.log(list[1][a].search(text));
            if (list[1][a].search(text) > -1) {
                this.output.push([rootLink,link, list[1][a]]);
                //console.log("found");
            }
            a++;
        }

        a = 0;
        while (a < list[0].length) {
            //console.log(link + "/" + list[0][a]);
            var tempSearch = new search(link + "/" + list[0][a], text, rootLink);
            this.output = this.output.concat(tempSearch.output);
            a++;
        }
    }
}

export class searchFile {
    constructor() {
        let boxoptions: vscode.InputBoxOptions = <vscode.InputBoxOptions>{
            value: '',
            placeHolder: 'file name',
            prompt: 'file name'
        };
        vscode.window.showInputBox(boxoptions).then(function (value) {
            if (value) {
                var a = 0;
                var founds:Array<Array<string>> = [];
                if (vscode.workspace.workspaceFolders !== undefined) {
                    while (a < vscode.workspace.workspaceFolders.length) {
                        //console.log(new search());
                        var searching = new search("", value,vscode.workspace.workspaceFolders[a].uri.fsPath);
                        founds = founds.concat(searching.output);
                        a++;
                    }
                }
                //console.log(founds);
                new searchFileList(founds);
            }
        });
    }
}