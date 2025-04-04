import { kladana } from "./templates/kladana"

export class ParserInterface {
    constructor(inputObjects, template){
        this.rules = new Map();
        this.inputObjects = inputObjects
        this.count_inputObjects = inputObjects.length
        this.result = ""

        switch (template) {
            case "kladana": {
                this.rules = kladana
                break
            }
        }

    }

    start() {
        this.inputObjects.forEach((element, index) => {
            switch (element.type){
                case "paragraph" : {
                    this.result += this.rules.get("addParagraph")(element.value)  
                    break
                }
                case "hlevel" : {
                    this.result += this.rules.get("addHLevel")(element.level, element.value)  
                    break
                }
                case "table_of_content" : {
                    this.result += this.rules.get("addContentTable")(element.value)
                    break
                }
                case "list" : {
                    this.result += this.rules.get("addList")(element.value)
                    break
                }
                case "image" : {
                    this.result += this.rules.get("addImage")(element.url, element.label)
                    break
                }
                case "video" : {
                    this.result += this.rules.get("addVideo")(element.url, element.label)
                    break
                }
                case "button" : {
                    this.result += this.rules.get("addButton")(element.url, element.label)
                    break
                }
                case "accent_block" : {
                    this.result += this.rules.get("addAccentBlock")(element.value, element.color)
                    break
                }
                case "links_block" : {
                    let target = (index + 1 != this.count_inputObjects)
                    this.result += this.rules.get("addLinksBlock")(element.value, target)
                    break
                }
                case "quote" : {
                    this.result += this.rules.get("addQuote")(element.value, element.author, element.label)
                    break
                }
            }
        });
        return this.result;
    }
}

