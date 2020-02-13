import * as fs from 'fs';
var fss = require('fs-sync');
import { fileModel } from './models/fileModel';

export class fileApi {
    static getFolders(link: string = "") {
        if (link === "") {
            return "no input link";
        }
        var output: Array<string> = [];
        try {
            if (fs.promises.access(link)) {
                var files = fs.readdirSync(link, "utf-8");
                var a = 0;
                while (a < files.length) {
                    if (fs.lstatSync(link + files[a]).isDirectory()) {
                        //console.log(files[a]);
                        output.push("" + files[a]);
                    }
                    a++;
                }
            }
        } catch (e) {
            //console.error(e);
        }


        return output;
    }

    static getFiles(link: string = "") {
        if (link === "") {
            return "no input link";
        }
        var output: Array<Array<string>> = [[], []];
        try {
            if (fs.promises.access(link)) {

                //console.log(link);
                var files = fs.readdirSync(link, "utf-8");

                var a = 0;
                while (a < files.length) {
                    if (fs.lstatSync(link + files[a]).isDirectory()) {
                        output[0].push("" + files[a]);
                    } else {
                        output[1].push("" + files[a]);
                    }
                    a++;
                }
            }
        } catch (e) {
            //console.error(e);
        }

        return output;
    }

    static folderIsExists(link: string) {
        return fss.exists(link);
    }

    static isFolder(link: string) {
        try {
            if (fss.exists(link)) {
                if (fs.lstatSync(link).isDirectory()) {
                    return true;
                }
            }
        } catch(error) {
            console.error(error);
        }

        return false;
    }

    static createFolder(folderLink: fileModel) {
        var a = 0;
        while (a < folderLink.link.length) {
            if (!this.folderIsExists(folderLink.getFullpath(a))) {
                fs.mkdirSync(folderLink.getFullpath(a));

                if (this.folderIsExists(folderLink.getFullpath(a))) {
                    //console.log("create: " + folderLink.getFullpath(a));
                }

            } else {
                //console.log("exists: " + folderLink.getFullpath(a));
            }
            a++;
        }
    }

    static saveFile(link: string, content: string) {
        var fout = fs.createWriteStream(link);

        fout.write(content);
        fout.close();
    }
}