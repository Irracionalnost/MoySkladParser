
import Typograf from 'typograf'
const tp = new Typograf({
    locale: ['en-US'],
    htmlEntity: { type: 'name' },
})

tp.setSetting('common/nbsp/afterShortWord', 'lengthShortWord', 2);

//добавление заголовка
export function addHLevel(level, text){
    return (level == 2)? `<h${level} id="">${tp.execute(text)}</h${level}>\n\n` 
    : `<h${level}>${tp.execute(text)}</h${level}>\n\n`
}

//добавление параграфа
export function addParagraph(text){
    return `<p>${tp.execute(text)}</p>\n\n`
}

//добавление содержания
export function addContentTable(content){
    let result = '<div class="blog-post__toggle">\n'
    result += '  <button class="blog-post__toggle-head" type="button">Table of Contents</button>\n'
    result += '  <div class="blog-post__toggle-body">\n'
    result += '    <div class="blog-post__toggle-content">\n'
    result += '      <ol class="is-anchors">\n'
    content.forEach(element => {
        result += `        <li><a href="#">${tp.execute(element.value)}</a></li>\n`    
    });
    result += '      </ol>\n'
    result += '    </div>\n'
    result += '  </div>\n'
    result += '</div>\n\n'
    return result
}

//добавление списка
export function addList(list) {
    let result = list.replaceAll(/(?<=<ul>)|(?<=<\/li>)|(?<=<\/ul>)|(?<=<ol>)|(?<=<\/ol>)/g, "$&\n")
    result = result.replaceAll(/(?=<li>)/g, "    $&")
    result = tp.execute(result)
    return result += '\n'
}

//добавление картинки
export function addImage(url, label){
    let result = '<figure class="blog-post__image">\n'
    result += `  <img src="${url}" alt="img"/>\n`
    if (label !== "") result += `  <figcaption>${tp.execute(label)}</figcaption>\n`
    result += '</figure>\n\n'
    return result
}

//добавление видео
export function addVideo(url){
    let result = '<div class="blog-post__iframe">\n'
    result += `    <iframe src="${url}" width="560" height="315" title="YouTube video player" frameborder="0"\n`
    result += '    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"\n'
    result += '    allowfullscreen></iframe>\n'
    result += '</div>\n\n'
    return result;
}

//добавление кнопки
export function addButton(url, label) {
    let result = '<div class="blog-post__action">\n'
    result += `    <a href="${url}" class="button button--primary" target="_blank" rel="noopener">${tp.execute(label)}</a>\n`
    result += '</div>\n\n'
    return result
}

//добавление акцентного блока
export function addAccentBlock(values){
    let result = '<div class="blog-post__accent">\n'
    values.forEach((element) => {
        switch (element.type){
            case "paragraph" : {
                result += "  " + addParagraph(element.value)  
                break
            }
            case "hlevel" : {
                result += "  " + addHLevel(element.level, element.value)  
                break
            }
            case "list" : {
                result += "  " + addList(element.value)
                break
            }
            case "image" : {
                result += "  " + addImage(element.label, element.url)
                break
            }
            case "video" : {
                result += "  " + addVideo(element.label, element.url)
                break
            }
            case "button" : {
                result += addButton(element.label, element.url)
                break
            }
        }
    })
    result += '</div>\n\n'
    return result
}

//добавление блока с перелинковкой
export function addLinksBlock(values, target_blank){
    let result = '<div class="blog-post__accent">\n'
    result += '  <p class="is-bold">Read&#8209;alikes</p>\n'
    values.forEach((element) => {
        if (target_blank) 
            element.value = element.value.replaceAll(/<a\shref=".*"/g, '$& target="_blank"')
        result += `  ${tp.execute(element.value)}\n`
    })
    result += '</div>\n\n'
    return result
}

//добавление цитаты
export function addQuote(text_arr, author, label) {
    let result = '<figure class="blog-post__blockquote"\n>'
    result += '  <blockquote>\n'
    text_arr.forEach((elem) => {
        result += addParagraph(elem)
    })
    result += '  </blockquote>\n'
    result += '  <figcaption class="blog-post__blockquote-info">\n'
    result += '    <div class="blog-post__blockquote-author">\n'
    result += `      <div class="blog-post__blockquote-name">${author}</div>\n`
    result += `      <div class="blog-post__blockquote-position">${label}</div>\n`
    result += '    </div>\n'
    result += '  </figcaption>\n'
    result += '</figure>\n\n'
    return result;
}


export const kladana = new Map ()
kladana.set("addParagraph", addParagraph)
kladana.set("addHLevel", addHLevel)
kladana.set("addContentTable", addContentTable)
kladana.set("addList", addList)
kladana.set("addImage", addImage)
kladana.set("addVideo", addVideo)
kladana.set("addButton", addButton)
kladana.set("addAccentBlock", addAccentBlock)
kladana.set("addLinksBlock", addLinksBlock)
kladana.set("addQuote", addQuote)

