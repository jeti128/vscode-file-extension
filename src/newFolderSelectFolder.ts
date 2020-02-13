import * as vscode from 'vscode';
import { fileModel } from './models/fileModel';
import { newFolderBrowser } from './newFolderBrowser';

export class newFolderSelectFolder {
    protected pickerItems: Array<vscode.QuickPickItem> = [];

    protected pickerOptions: vscode.QuickPickOptions = <vscode.QuickPickOptions>
    {
        placeHolder: "Select new file type",
        matchOnDetail: false,
        matchOnDescription: false
    };
    
    constructor(workspaceFolders:vscode.WorkspaceFolder[], type:string)
    {
        var a = 0;
        
        while (a < workspaceFolders.length) {
            this.pickerItems.push({
                'label': workspaceFolders[a].name,
                'description': "" + workspaceFolders[a].index,
                'detail': ''
            });
            a++;
        }
        
        vscode.window.showQuickPick(this.pickerItems, this.pickerOptions)
        .then(function(value){
            if (value)
                {
                    new newFolderBrowser(
                        new fileModel("openFile", "", workspaceFolders[Number(value.description)].uri.path)
                    );
                }
        });
    }
}