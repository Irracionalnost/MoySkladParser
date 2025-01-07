const ELEM = /<ul>.*?(?=<\/ul>)<\/ul>|<ol>.*?(?=<\/ol>)<\/ol>|<p>.*?(?=<\/p>)<\/p>|<h\d>.*?(?=<\/h\d>)<\/h\d>/gi
const LIST = /<ul>.*?(?=<\/ul>)<\/ul>|<ol>.*?(?=<\/ol>)<\/ol>/
const HLEVEL = /<h\d>.*?(?=<\/h\d>)<\/h\d>|<p>H\d.*?(?=<\/p>)<\/p>/i
const VIDEO = /<p>YTB\s.*?(?=<\/p)<\/p>/
const IMAGE = /<p>IMG\s.*?(?=<\/p)<\/p>/
const BUTTON = /<p>BTN\s.*?(?=<\/p)<\/p>/
const ACСENT_BLOCK = /<p>\s*!!\s*<\/p>/
const TABLE_OF_CONTENT = /<p>\s*(<b>)*\[(<\/b>)*\s*<\/p>|<p>\s*(<b>)*\](<\/b>)*\s*<\/p>/
const LINKS_BLOCK = /<p>\s*(<b>)*\{(<\/b>)*\s*<\/p>|<p>\s*(<b>)*\}(<\/b>)*\s*<\/p>/

export class Parser {
    constructor(inputText){
        this.text = inputText
        this.start_accent = false
        this.start_table_content = false
        this.start_links_block = false
        this.result = []
        this.elems = []
    }

    preparation() {
        this.text = this.text.replace(/^<span[^<]*/, '').replace(/<\/span>$/, '')
        this.text = this.text.replace(/(?<=<p)[^>]*/g, '')
        this.text = this.text.replace(/<span style="([^"]*)(?=font-weight:\s700;)/g, '<b>$&').replace(/<b><span[^>]*>[^<]*<\/span>/g, '$&</b>')
        this.text = this.text.replace(/<span style="([^"]*)(?=font-style:\sitalic;)/g, '<i>$&').replace(/<i><span[^>]*>[^<]*<\/span>/g, '$&</i>')
        this.text = this.text.replace(/\sstyle="[^"]*"/g,'')
        this.text = this.text.replace(/<span>|<\/span>/g, '').replaceAll("<br>", '').replaceAll("</b><b>", '').replaceAll("</i><i>", '').replaceAll("</ul><ul>", '')
        this.text = this.text.replace(/(?<=<li)[^>]*/g, '')
        this.text = this.text.replaceAll("<div>", '').replaceAll("</div>",'').replaceAll("&nbsp;", '')
        this.text = this.text.replace(/\sdir="[^"]*"/g, '')

        this.elems = this.text.match(ELEM)
        console.log(this.elems)
    }

    parsing(){
        try {
            this.elems.forEach((item)=>{
                
                switch (true){
                    //список
                    case (LIST.test(item)):{
                        this.result.push({type: "list", value: item})
                        break
                    }

                    //заголовок
                    case (HLEVEL.test(item)):{
                        let lvl = item.match(/(?<=<h)\d|(?<=H)\d/i) || []
                        let val = item.match(/(?<=<h\d>h\d\s)[^<]*|(?<=H\d)[^<]*/i) || []
                        this.result.push({type: "hlevel", level: lvl[0], value:val[0]})
                        break
                    }

                    //изображение
                    case (IMAGE.test(item)):{
                        let url_val = item.match(/(?<=<p>IMG\s<a href=")[^"]*/i) || []
                        let label = item.match(/(?<=<\/a>\s*)[^<]*/) || []
                        this.result.push({type: "image", url: url_val[0], label: label[0]})
                        break
                    }

                    //видео
                    case(VIDEO.test(item)):{
                        let url_val = item.match(/(?<=<p>YTB\s<a href=")[^"]*/i) || []
                        let label = item.match(/(?<=<\/a>\s*)[^<]*/) || []
                        this.result.push({type: "video", url: url_val[0], label: label[0]})
                        break
                    }

                    //кнопка
                    case(BUTTON.test(item)):{
                        let url_val = item.match(/(?<=<p>BTN\s<a href=")[^"]*/i) || []
                        let label = item.match(/(?<=(BTN[^>]*>(<b>)*))[^<]+/i) || []
                        this.result.push({type: "button", url: url_val[0], label: label[0]})
                        break
                    }

                    //акцентный блок
                    case (ACСENT_BLOCK.test(item)):{
                        this.start_accent = !this.start_accent
                        this.result.push({type: 'accent_block', value: this.start_accent})
                        break
                    }

                    //содержание
                    case (TABLE_OF_CONTENT.test(item)):{
                        this.start_table_content = !this.start_table_content
                        this.result.push({type: 'table_of_content', value: this.start_table_content})
                        break
                    }

                    //блок с перелинковкой
                    case (LINKS_BLOCK.test(item)):{
                        this.start_links_block = !this.start_links_block
                        this.result.push({type: 'links_block', value: this.start_links_block})
                        break
                    }

                    //параграф
                    default: {
                        let val = item.match(/(?<=<p>).*?(?=<\/p>)/) || []
                        this.result.push({type: "paragraph", value: val[0]})
                    }
                }
            })

            console.log("Процесс парсинга завершён!")
        }
        catch(e){
            console.log('Что-то пошло не так... ', e)
        }
    }

    start() {
        this.preparation()
        this.parsing()
        console.log(this.result)
        return this.text
    }
}


