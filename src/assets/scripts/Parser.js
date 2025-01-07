const TEXT_ELEMENT = /^\S.*\n?$/


export class Parser {
    constructor(inputText){
        this.text = inputText
        this.pos = 0
        this.result = []
        this.refs = []
    }

    start(){
        this.text = this.text.replace(/^<span[^<]*/, '').replace(/<\/span>$/, '')
        this.text = this.text.replace(/(?<=<p)[^>]*/g, '')
        this.text = this.text.replace(/<span style="([^"]*)(?=font-weight:\s700;)/g, '<b>$&').replace(/<b><span[^>]*>[^<]*<\/span>/g, '$&</b>')
        this.text = this.text.replace(/<span style="([^"]*)(?=font-style:\sitalic;)/g, '<i>$&').replace(/<i><span[^>]*>[^<]*<\/span>/g, '$&</i>')
        this.text = this.text.replace(/\sstyle="[^"]*"/g,'')
        this.text = this.text.replace(/<span>|<\/span>/g, '').replaceAll("<br>", '').replaceAll("</b><b>", '').replaceAll("</i><i>", '').replaceAll("</ul><ul>", '')
        this.text = this.text.replace(/(?<=<li)[^>]*/g, '')
        this.text = this.text.replaceAll("<div>", '').replaceAll("</div>",'').replaceAll("&nbsp;", '')
        this.text = this.text.replace(/\sdir="[^"]*"/g, '')
        console.log(this.text)
        return this.text
    }
}


