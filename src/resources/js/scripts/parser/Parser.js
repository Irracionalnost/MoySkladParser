import { ELEM } from './global';
import {
  HLEVEL,
  LIST,
  IMAGE,
  VIDEO,
  BUTTON,
  ACСENT_BLOCK,
  ACСENT_BLOCK_PINK,
  ACСENT_BLOCK_WARNING,
  TABLE_OF_CONTENT,
  LINKS_BLOCK,
  TABLE,
} from './global';

export class Parser {
  constructor(inputText) {
    this.text = inputText;
    this.start_accent = false;
    this.result = [];
    this.elems = [];
  }

  getAllElements() {
    let search = this.text.match(ELEM) || [];

    search.forEach((item) => {
      this.elems.push(item.replaceAll('<p>', '').replaceAll('</p>', '').trim());
      this.elems = this.elems.filter((item) => item.trim() !== '');
    });

    console.log('Распознаны элементы: ', search);
  }

  //распознавание элементов и их свойств
  decodedElements() {
    let item;
    try {
      for (let i = 0; i < this.elems.length; i++) {
        item = this.elems[i];
        switch (true) {
          //заголовок
          case HLEVEL.test(item): {
            let lvl = item.match(/(?<=<h)\d(?=\s)|(?<=H)\d(?=\s)/i) || [];
            let val = item.match(/(?<=(H|h)\d\s)[^<]*/i) || [];
            this.result.push({ type: 'hlevel', level: lvl[0], value: val[0] });
            break;
          }

          //список
          case LIST.test(item): {
            item = item
              .replaceAll(/(<p>)|(<\/p>)/g, '')
              .replaceAll(/((?<=>)\s+?(?=<))|(\s(?=\s))|(\s(?=<))/g, '');
            this.result.push({ type: 'list', value: item });
            break;
          }

          //содержание
          case TABLE_OF_CONTENT.test(item): {
            i++;
            let content = [];
            while (this.elems[i] && this.elems[i] !== ']') {
              let elem = this.elems[i]
                .replaceAll(/(<a[^>]*>)|(<\/a>)/g, '')
                .replace(/(H|h)\d/, '')
                .trim();
              content.push(elem);
              i++;
            }
            this.result.push({ type: 'table_of_content', value: content });
            break;
          }

          // //блок с перелинковкой
          case LINKS_BLOCK.test(item): {
            i++;
            let content = [];
            while (this.elems[i] && this.elems[i] !== '}') {
              let elem = this.elems[i].replace(/(H|h)\d/, '').trim();
              content.push(elem);
              i++;
            }
            this.result.push({ type: 'links_block', value: content });
            break;
          }

          //изображение
          case IMAGE.test(item): {
            let label = item.replace('IMG', '').trim();
            let img_url = this.elems[i + 1];
            let jump = 1;
            let title_tag = '';
            let alt_tag = '';

            if (this.elems[i + 2] && this.elems[i + 2].includes('Title')) {
              title_tag = this.elems[i + 2]
                .replaceAll(/(<b>)|(<\/b>)/g, '')
                .replace(/.*(?=:):/, '')
                .replaceAll('&nbsp;', '')
                .trim();
              console.log(title_tag);
              jump += 1;
            }
            if (this.elems[i + 3] && this.elems[i + 3].includes('Alt')) {
              alt_tag = this.elems[i + 3]
                .replaceAll(/(<b>)|(<\/b>)/g, '')
                .replace(/.*(?=:):/, '')
                .replaceAll('&nbsp;', '')
                .trim();
              jump += 1;
            }
            this.result.push({
              type: 'image',
              url: img_url,
              label: label,
              title: title_tag,
              alt: alt_tag,
            });
            i += jump;
            break;
          }

          //видео
          case VIDEO.test(item): {
            let label = item.replace('YTB', '').trim();
            let video_url = this.elems[i + 1];
            this.result.push({ type: 'video', url: video_url, label: label });
            i++;
            break;
          }

          //кнопка
          case BUTTON.test(item): {
            item = item
              .replaceAll(/(<b>)|(<\/b>)/g, '')
              .replace('BTN', '')
              .trim();
            let url = item.match(/(?<=(href="))[^"]*/) || [''];
            let label = item.replace(/<a\shref="[^>]*>/, '').replace('</a>', '');
            this.result.push({ type: 'button', url: url[0], label: label });
            break;
          }

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
            }
            this.start_accent = !this.start_accent;
            this.result.push({ type: 'accent_block', value: this.start_accent, color: color });
            break;
          }

          //таблица
          case TABLE.test(item): {
            this.result.push({ type: 'table', value: item });
            break;
          }

          //параграф
          default: {
            this.result.push({ type: 'paragraph', value: item.trim() });
          }
        }
      }
      console.log(this.result);
    } catch (e) {
      console.log('parsing_first: Что-то пошло не так... ', e);
    }
  }

  parsing() {
    try {
      this.cleanStyle();
      this.getAllElements();
      this.decodedElements();
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
