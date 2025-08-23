export const HLEVEL = /\S*(H|h)\d\s/;
export const LIST = /<ul>.*?(?=<\/ul>)<\/ul>|<ol>.*?(?=<\/ol>)<\/ol>/;
export const TABLE_OF_CONTENT = /(\[)|(\])/;
export const LINKS_BLOCK = /(\{)|(\})/;
export const IMAGE = /IMG\s*/;
export const VIDEO = /YTB\s*/;
export const BUTTON = /BTN\s*/;
export const TABLE = /<table>.*?<\/table>/;

export const SIMPLE_ACСENT_BLOCK = /!!\s*/;
export const ACСENT_BLOCK_PINK = /!!\sPINK\s*/;
export const ACСENT_BLOCK_WARNING = /!!\sWARNING\s*/;

export const ACСENT_BLOCK = new RegExp(
  SIMPLE_ACСENT_BLOCK.source + '|' + ACСENT_BLOCK_PINK.source + '|' + ACСENT_BLOCK_WARNING.source
);

export const ELEM = new RegExp(
  /(<p>[\s\S]*?<\/p>)|(<ul>[\s\S]*?<\/ul>)|(<ol>[\s\S]*?<\/ol>)|(<b>[\s\S]*?<\/b>)|(\s*!!\s*)|(<table>.*?<\/table>)/,
  'g'
);
