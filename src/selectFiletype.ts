import * as vscode from 'vscode';
import { folderSelector } from './folderSelector';
import { fileModel } from './models/fileModel';
import { fileBrowser } from './fileBrowser';
//import { quickPiker_fileBrowser } from './quickpick_fileBrovser'

export class selectFiletype {
    protected pickerItems: Array<vscode.QuickPickItem> =
        [
            {
                'label': 'simple',
                'description': '*.* file',
                'detail': 'simple'
            },
            {
                'label': 'AngularJS',
                'description': '*.js file',
                'detail': 'angularjs'
            },
            {
                'label': 'c',
                'description': '*.c file',
                'detail': 'c'
            },
            {
                'label': 'c++',
                'description': '*.cpp / *.h + *.cppfile',
                'detail': 'cpp'
            },
            {
                'label': 'c#',
                'description': '*.cs file',
                'detail': 'cs'
            },
            {
                'label': 'HTML',
                'description': '*.html file',
                'detail': 'html'
            },
            {
                'label': 'JSON',
                'description': '*.json file',
                'detail': 'json'
            },
            {
                'label': 'PHP',
                'description': '*.php file',
                'detail': 'php'
            },
            {
                'label': 'React',
                'description': '*.js file',
                'detail': 'react'
            },
            {
                'label': 'Text',
                'description': '*.txt file',
                'detail': 'text'
            },
            {
                'label': 'Vue',
                'description': '*.vue file',
                'detail': 'vue'
            },
            {
                'label': 'XML',
                'description': '*.xml file',
                'detail': 'xml'
            }
        ];

    protected pickerOptions: vscode.QuickPickOptions = <vscode.QuickPickOptions>
        {
            placeHolder: "Select new file type",
            matchOnDetail: true,
            matchOnDescription: true
        };
        
    constructor() {
        vscode.window.showQuickPick(this.pickerItems, this.pickerOptions)
            .then(function (value) {
                if (value) {
                    //console.log(value);
                    if (vscode.workspace.workspaceFolders !== undefined) {
                        if (vscode.workspace.workspaceFolders.length === 1) {
                            //console.log(vscode.workspace.workspaceFolders[0]);
                            new fileBrowser(
                                new fileModel(value.detail, "", vscode.workspace.workspaceFolders[0].uri.path)
                            );
                        } else {
                            if (value.detail) {
                                //console.log(vscode.workspace.workspaceFolders);
                                new folderSelector(vscode.workspace.workspaceFolders, value.detail);
                            }
                        }
                    } else {
                        vscode.window.showErrorMessage("not found workspace");
                    }
                }
            });
    }
}