import { ELEM } from "./global";
import { LIST, HLEVEL, IMAGE, 
  VIDEO, BUTTON, ACСENT_BLOCK,
  ACСENT_BLOCK_PINK, ACСENT_BLOCK_WARNING,
  ACCENT_BLOCK_QUOTE,  TABLE_OF_CONTENT,
  LINKS_BLOCK,
} from "./global";


export class Parser {
  constructor(inputText) {
    this.text = inputText;
    this.start_accent = false;
    this.start_table_content = false;
    this.start_links_block = false;
    this.start_quote = false;
    this.result = [];
    this.elems = [];
  }

  cleanStyle() {
    //удаление стилей браузера
    this.text = this.text.replace(/^<span[^<]*/, '').replace(/<\/span>$/, '')
      .replace(/(?<=<p)[^>]*/g, '');
        
    this.text = this.text
      .replace(/<span style="([^"]*)(?=font-weight:\s700;)/g, '<b>$&')
      .replace(/<b><span[^>]*>[^<]*<\/span>/g, '$&</b>')
      .replace(/<span style="([^"]*)(?=font-style:\sitalic;)/g, '<i>$&')
      .replace(/<i><span[^>]*>[^<]*<\/span>/g, '$&</i>');

    this.text = this.text
      .replace(/\sstyle="[^"]*"/g, '')
      .replace(/\sdir="[^"]*"/g, '')
      .replace(/<span>|<\/span>/g, '')
      .replaceAll('</b><b>', '')
      .replaceAll('</i><i>', '')
      .replaceAll('</ul><ul>', '')
      .replaceAll('</ol><ol>', '')
      .replace(/(?<=<li)[^>]*/g, '')
      .replaceAll('<div>', '')
      .replaceAll('</div>', '')
      .replaceAll('&nbsp;', '');

    if (this.text[this.text.length - 1] !== '>')
      this.text = `<p>${this.text}</p>`
  }

  getAllElements() {
    this.elems = this.text.match(ELEM);
    // console.log('Распознаны элементы: ', this.elems);
  }

  //распознавание элементов и их свойств
  decodedElements() {
    try {
      this.elems.forEach((item) => {
        switch (true) {
          //акцентный блок
          case ACСENT_BLOCK.test(item): {
            let color = 'simple';
            switch (true) {
              case ACСENT_BLOCK_PINK.test(item): {
                color = 'pink';
                break;
              }
              case ACСENT_BLOCK_WARNING.test(item): {
                color = 'warning';
                break;
              }
              case ACCENT_BLOCK_QUOTE.test(item): {
                color = 'quote';
                break;
              }
            }
            this.start_accent = !this.start_accent;
            this.result.push({ type: 'accent_block', value: this.start_accent, color: color });
            break;
          }

          //содержание
          case TABLE_OF_CONTENT.test(item): {
            this.start_table_content = !this.start_table_content;
            this.result.push({ type: 'table_of_content', value: this.start_table_content });
            break;
          }

          //блок с перелинковкой
          case LINKS_BLOCK.test(item): {
            this.start_links_block = !this.start_links_block;
            this.result.push({ type: 'links_block', value: this.start_links_block });
            break;
          }

          //список
          case LIST.test(item): {
            item = item.replaceAll('<p>', '').replaceAll('</p>', '');
            this.result.push({ type: 'list', value: item });
            break;
          }

          //изображение
          case IMAGE.test(item): {
            let url_val = item.match(/(?<=<p>IMG\s<a href=")[^"]*/i) || [];
            let label = item.match(/(?<=<\/a>\s*)[^<]*/) || [];
            this.result.push({ type: 'image', url: url_val[0], label: label[0] });
            break;
          }

          //видео
          case VIDEO.test(item): {
            let url_val = item.match(/(?<=<p>YTB\s<a href=")[^"]*/i) || [];
            let label = item.match(/(?<=<\/a>\s*)[^<]*/) || [];
            this.result.push({ type: 'video', url: url_val[0], label: label[0] });
            break;
          }

          //кнопка
          case BUTTON.test(item): {
            let url_val = item.match(/(?<=<p>BTN\s<a href=")[^"]*/i) || [];
            let label = item.match(/(?<=(BTN[^>]*>(<b>)*))[^<]+/i) || [];
            this.result.push({ type: 'button', url: url_val[0], label: label[0] });
            break;
          }

          //заголовок
          case HLEVEL.test(item): {
            let lvl = item.match(/(?<=<h)\d|(?<=H)\d/i) || [];
            let val = item.match(/(?<=<h\d>h\d\s)[^<]*|(?<=<p>h\d\s)[^<]*/i) || [];
            this.result.push({ type: 'hlevel', level: lvl[0], value: val[0] });
            break;
          }

          //параграф
          default: {
            let val = item.match(/(?<=<p>).*?(?=<\/p>)/) || [];
            this.result.push({ type: 'paragraph', value: val[0].trim() });
          }
        }
      });
    } catch (e) {
      console.log('parsing_first: Что-то пошло не так... ', e);
    }
  }

  //доп обработка элементов с вложенностью
  decodedDeep() {
    let key_words = ['table_of_content', 'links_block', 'accent_block'];
    key_words.forEach((key_word) => {
      let items_container = [];
      let start_index = this.result.findIndex((item) => item.type == key_word);
      if (start_index != -1) {
        let color = this.result[start_index].color;
        this.result.splice(start_index, 1);
        let end_index = this.result.findIndex((item) => item.type == key_word);
        this.result.splice(end_index, 1);

        for (let i = start_index; i < end_index; i++) {
          items_container.push(this.result[start_index]);
          this.result.splice(start_index, 1);
        }
        this.result.splice(start_index, 0, {
          type: key_word,
          value: items_container,
          color: color,
        });
      }
    });
  }

  parsing() {
    try {
      this.cleanStyle();
      this.getAllElements();
      this.decodedElements();
      this.decodedDeep();
      console.log('Процесс парсинга завершён!');
      console.log(this.result);
    } catch (e) {
      console.log('Что-то пошло не так... ', e);
    }
  }

  start() {
    this.parsing();
    //console.log('Результат парсинга:', this.result);
    return this.result;
  }
}
