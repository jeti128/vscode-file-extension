import * as vscode from 'vscode';
import { fileModel } from './models/fileModel';
import { fileApi } from './fileApi';
import { createFile } from './createFile';

export class newFolderBrowser {
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
                            new newFolderBrowser(file);
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
                                            if (value.charAt(0) !== "/") {
                                                value = "/" + value;
                                            }

                                            file.addItems(value);
                                            //new createFile(file,specs);
                                            fileApi.createFolder(file);
                                        }
                                });

                            } else {
                                if (fileApi.isFolder(file.getFullpath() + value.label)) {
                                    file.addItem(value.label);
                                    new newFolderBrowser(file);
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