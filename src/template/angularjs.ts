import { base } from './base';
import { fileModel } from '../models/fileModel';
import { fileApi } from '../fileApi';

export class angularjs extends base {
    constructor(file: fileModel, specs: Array<string>) {
        super(file, specs);
    }
    public getContent() {
        var aValue = this.getSpecValue("a");
        var cValue = this.getSpecValue("c");
        var iValue = this.getSpecValue("i");

        var output = '';
        output += '/*\n';
        output += '+--------------------------Metainfo------------------------------------------+\n';
        output += 'Author : ' + this.userName + '\n';
        output += 'Tool   : VSCode / jT file vscode\n';
        output += 'Date   : ' + this.getDateTimeTo() + '\n';
        output += 'Version: 1.0.0\n';
        output += '+--------------------------Descript------------------------------------------+\n';
        output += 'Write here your descript\n';
        output += '+--------------------------Code----------------------------------------------+\n';
        output += '*/\n';
        output += 'var myApp = angular.module("';
        if (aValue !== null) {
            output += aValue;
        }
        else {
            output += 'myApp';
        }
        output += '",[]);\n';
        output += '\n';
        output += 'myApp.controller("';
        if (cValue !== null) {
            output += cValue;
        }

        output += '", ["$scope", function($scope) {\n';
        output += '   \n';
        output += '}]);\n';

        return output;
    }
    public saveFile() {
        fileApi.saveFile(this.file.getFullLink() + ".js", this.getContent());
        this.openFileForEdit(this.file.getFullLink() + ".js");
    }

}