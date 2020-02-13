import * as vscode from 'vscode';
import { searchFile } from "./searchFile";

export class searchFileList {
    protected pickerItems: Array<vscode.QuickPickItem> = [
        {
            'label': '/',
            'description': '',
            'detail': ''
        }
    ];

    protected pickerOptions: vscode.QuickPickOptions = <vscode.QuickPickOptions>
        {
            placeHolder: "Select file location",
            matchOnDetail: false,
            matchOnDescription: false
        };

    constructor(files: Array<Array<string>>) {
        //var folders = fileApi.getFolders(file.getFullpath());
        if (files !== []) {
            var a = 0;

            while (a < files.length) {
                this.pickerItems.push({
                    'label': files[a][2],
                    'description': '',
                    'detail': files[a][0] + files[a][1] + "/" + files[a][2]
                });
                a++;
            }

            //this.pickerOptions.placeHolder = file.getFullpath();
            vscode.window.showQuickPick(this.pickerItems, this.pickerOptions)
                .then(function (value) {
                    if (value) {
                        if (value.label === "/") {
                            new searchFile();
                        } else {
                            //console.log(value.detail);
                            var openPath = vscode.Uri.parse("file:/" + value.detail); //A request file path
                            vscode.workspace.openTextDocument(openPath).then(doc => {
                                vscode.window.showTextDocument(doc);
                            });
                        }
                    }
                });
        } else {
            vscode.window.showErrorMessage("no input files");
        }
    }
}
