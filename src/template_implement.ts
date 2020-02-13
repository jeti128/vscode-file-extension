import { text } from './template/text';
import { php } from './template/php';
import { angularjs } from './template/angularjs';
import { html } from './template/html';
import { cs } from './template/cs';
import { vue } from './template/vue';
import { c } from './template/c';
import { cpp } from './template/cpp';
import { simple } from './template/simple';
import { react } from './template/react';
import { xml } from './template/xml';
import { json } from './template/json';

import { fileModel } from './models/fileModel';

export class template_implement {
    public static savefile(file: fileModel, specs: Array<string>) {
        var templete;
        
        if (file.type === "text") {
            templete = new text(file, specs);
        }

        if (file.type === "php") {
            templete = new php(file, specs);
        }

        if (file.type === "angularjs") {
            templete = new angularjs(file, specs);
        }

        if (file.type === "html") {
            templete = new html(file, specs);
        }

        if (file.type === "cs") {
            templete = new cs(file, specs);
        }
        
        if (file.type === "vue") {
            templete = new vue(file, specs);
        }

        if (file.type === "c") {
            templete = new c(file, specs);
        }

        if (file.type === "cpp") {
            templete = new cpp(file, specs);
        }
        
        if (file.type === "simple") {
            templete = new simple(file, specs);
        }

        if (file.type === "react") {
            templete = new react(file, specs);
        }

        if (file.type === "xml") {
            templete = new xml(file, specs);
        }

        if (file.type === "json") {
            templete = new json(file, specs);
        }

        if (templete !== undefined) {
            return templete.saveFile();
        }

        return "";
    }
}