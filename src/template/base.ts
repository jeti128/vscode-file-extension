import * as vscode from 'vscode';
import { fileModel } from '../models/fileModel';

export class base {
    protected userName = require('os').userInfo().username;
    protected specs: Array<Array<string>> = [];
    protected file: fileModel = new fileModel();
    protected context: string = "";

    protected getDateTimeTo() {
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        return year + "." + month + "." + day + " " + hour + ":" + min;
    }

    constructor(file: fileModel, specs: Array<string>) {
        this.file = file;
        var a = 1;
        while (a < specs.length) {
            this.specs.push(specs[a].split(":"));
            a++;
        }
        //this.specs = specs;
    }

    protected getSpecValue(index: string) {

        var a = 0;
        while (a < this.specs.length) {
            if (this.specs[a][0] === index) {
                return this.specs[a][1];
            }
            a++;
        }

        return null;
    }

    protected openFileForEdit(link: string) {
        try {
            var openPath = vscode.Uri.parse("file:/" + link); //A request file path
            vscode.workspace.openTextDocument(openPath).then(doc => {
                vscode.window.showTextDocument(doc);
            }, (error: any) => {
                vscode.window.showErrorMessage("File open error: " + error);
            });
        } catch (e) {
            vscode.window.showErrorMessage("File open error: " + e.string);
        }
    }
}