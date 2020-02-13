import * as vscode from 'vscode';
import { selectFiletype } from "./selectFiletype";
import { openFile } from "./openFile";
import { searchFile } from "./searchFile";
import { newFolder } from "./newFolder";

export class mainmenu {
    protected pickerItems: Array<vscode.QuickPickItem> = [
        {
            'label': 'new file',
            'description': '',
            'detail': ''
        },
        {
            'label': 'creat folder',
            'description': '',
            'detail': ''
        },
        {
            'label': 'open file',
            'description': '',
            'detail': ''
        },
        {
            'label': 'search file',
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

    constructor() {
        vscode.window.showQuickPick(this.pickerItems, this.pickerOptions)
            .then(function (value) {
                if (value) {
                    if (value.label === "new file") {
                        new selectFiletype();
                    }
                    if (value.label === "open file") {
                        new openFile();
                    }
                    if (value.label === "search file") {
                        new searchFile();
                    }
                    if (value.label === "creat folder") {
                        new newFolder();
                    }
                }
            });
    }
}
