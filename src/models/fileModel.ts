var os = require('os');

export class fileModel {
    public type:string = "";    public os:string = "unix";
    public name:string = "";
    public link:Array<string> = new Array<string>();

    constructor(type:string = "", name:string = "",link:string = "") {
        this.type = type;
        this.name = name;
        var separator:string = "/";
        this.link = link.split(separator);
    }

    public addItem(folder:string) {
        this.link.push(folder);
    }

    public addItems(folders:string) {
        var folderArray = folders.split("/");
        folderArray = folderArray.splice(1,folderArray.length);
        this.link = this.link.concat(folderArray);
    }

    public removeItem() {
        if (this.link.length > 1) {
            this.link.length = this.link.length - 1;
        }
    }

    public getFullpath(index = 0) {
        if (index === 0) {
            index = this.link.length;
        }
        var a = 1;
        var output = "";
        if (os.platform() === "linux") {
            output = "/";
        }

        var separator = "/";
        while (a < index) {
            output += this.link[a] + separator;
            a++;
        }

        return output;
    }

    public getFullLink() {
        return this.getFullpath() + this.name;
    }

    public getLastItem(){
        return this.link[this.link.length - 1];
    }
}