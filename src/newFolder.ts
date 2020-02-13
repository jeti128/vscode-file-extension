import * as vscode from 'vscode';
import { fileModel } from './models/fileModel';
import { newFolderSelectFolder } from "./newFolderSelectFolder";
import { newFolderBrowser } from "./newFolderBrowser";

export class newFolder {
    constructor() {
        if (vscode.workspace.workspaceFolders !== undefined) {
            if (vscode.workspace.workspaceFolders.length === 1) {
                new newFolderBrowser(
                    new fileModel("openFile", "", vscode.workspace.workspaceFolders[0].uri.path)
                );
            } else {
                new newFolderSelectFolder(vscode.workspace.workspaceFolders, "openFile");
            }
        } else {
            vscode.window.showErrorMessage("not found workspace");
        }
    }
}