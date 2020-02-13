import * as vscode from 'vscode';
import { fileModel } from './models/fileModel';
import {openFileFolderSelector} from './openFileFolderSelector';
import {openFileFolderBrowser} from './openFileFolderBrowser';

export class openFile {
    constructor() {
        if (vscode.workspace.workspaceFolders !== undefined) {
            if (vscode.workspace.workspaceFolders.length === 1) {
                new openFileFolderBrowser(
                    new fileModel("openFile", "", vscode.workspace.workspaceFolders[0].uri.path)
                );
            } else {
                new openFileFolderSelector(vscode.workspace.workspaceFolders, "openFile");
            }
        } else {
            vscode.window.showErrorMessage("not found workspace");
        }
    }
}
