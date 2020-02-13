import * as vscode from 'vscode';
import { fileModel } from './models/fileModel';
import { fileApi } from './fileApi';
import { createFile } from './createFile';

export class fileBrowser {
    protected pickerItems: Array<vscode.QuickPickItem> = [
        {
            'label': '/',
            'description': '',
            'detail': ''
        },
        {
            'label': '..',
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

    constructor(file: fileModel) {
        var folders = fileApi.getFolders(file.getFullpath());
        if (folders !== "no input link") {
            var a = 0;

            while (a < folders.length) {
                this.pickerItems.push({
                    'label': folders[a],
                    'description': '',
                    'detail': ''
                });
                a++;
            }
            
            this.pickerOptions.placeHolder = file.getFullpath();
            vscode.window.showQuickPick(this.pickerItems, this.pickerOptions)
                .then(function (value) {
                    if (value) {
                        if (value.label === "..") {
                            file.removeItem();
                            new fileBrowser(file);
                        } else {
                            if (value.label === "/") {
                                let boxoptions: vscode.InputBoxOptions = <vscode.InputBoxOptions>{
                                    value: '',
                                    placeHolder: 'here link and file name',
                                    prompt: 'here link and file name'
                                };
                                vscode.window.showInputBox(boxoptions).then(function(value)
                                {
                                    if (value)
                                        {
                                            var tempinput = value.split(" ");
                                            var specs = value.split(">");
                                            if (specs.length === 1) {
                                                specs = [];
                                            }
                                            var separator = "/";
                                            //console.log(specs);
                                            if (tempinput[0].charAt(0) === separator) {
                                                if (tempinput[0].charAt(tempinput[0].length - 1) === separator) {
                                                    tempinput[0] = tempinput[0].substring(0,tempinput[0].length - 1);
                                                }
                                                file.name = tempinput[1];
                                                file.addItems(tempinput[0]);
                                                new createFile(file,specs);
                                            } else {
                                                if (tempinput[0]) {
                                                    //console.log("just file");
                                                    file.name = tempinput[0];
                                                    new createFile(file,specs);
                                                }
                                            }
                                        }
                                });

                            } else {
                                if (fileApi.isFolder(file.getFullpath() + value.label)) {
                                    file.addItem(value.label);
                                    new fileBrowser(file);
                                }
                            }
                        }

                    }
                });
        } else {
            vscode.window.showErrorMessage("no input link");
        }
    }
}