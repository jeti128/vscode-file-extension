import * as vscode from 'vscode';
import { fileModel } from './models/fileModel';
import { fileApi } from './fileApi';

export class openFileFolderBrowser {
    protected pickerItems: Array<vscode.QuickPickItem> = [
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
            matchOnDescription: true
        };

    constructor(file: fileModel) {
        var folders = fileApi.getFiles(file.getFullpath());
        if (folders !== "no input link") {
            var a = 0;

            while (a < folders[0].length) {
                this.pickerItems.push({
                    'label': folders[0][a],
                    'description': '',
                    'detail': ''
                });
                a++;
            }
            a = 0;
            while (a < folders[1].length) {
                this.pickerItems.push({
                    'label': '',
                    'description': folders[1][a],
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
                            new openFileFolderBrowser(file);
                        } else {
                            if (value.label !== '') {
                                file.addItem(value.label);
                                new openFileFolderBrowser(file);
                            }

                            if (value.description !== '') {
                                try {
                                    var openPath = vscode.Uri.parse("file:/" + file.getFullpath() + value.description); //A request file path
                                    vscode.workspace.openTextDocument(openPath).then(doc => {
                                        try {
                                        vscode.window.showTextDocument(doc);
                                        } catch(e) {
                                            vscode.window.showErrorMessage("File open error: " + e);        
                                        }
                                    }, (error: any) => {
                                        vscode.window.showErrorMessage("File open error: " + error);
                                    });
                                } catch (e) {
                                    vscode.window.showErrorMessage("File open error: " + e);
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