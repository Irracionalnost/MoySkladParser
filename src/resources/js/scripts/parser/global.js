export const PARAGRAPH = /<p>.*?(?=<\/p>)<\/p>/;
export const LIST = /<ul>.*?(?=<\/ul>)<\/ul>|<ol>.*?(?=<\/ol>)<\/ol>/;
export const HLEVEL = /<h\d>.*?(?=<\/h\d>)<\/h\d>|<p>h\d.*?(?=<\/p>)<\/p>/i;

export const VIDEO = /<p>YTB\s.*?(?=<\/p)<\/p>/;
export const IMAGE = /<p>IMG\s.*?(?=<\/p)<\/p>/;
export const BUTTON = /<p>BTN\s.*?(?=<\/p)<\/p>/;
export const TABLE_OF_CONTENT = /(.*\[.*)|(.*\].*)/;
export const LINKS_BLOCK = /<p>\s*(<b>)*\{(<\/b>)*\s*<\/p>|<p>\s*(<b>)*\}(<\/b>)*\s*<\/p>/;

export const SIMPLE_ACСENT_BLOCK = /<p>\s*!!\s*<\/p>/;
export const ACСENT_BLOCK_PINK = /<p>\s*!!PINK\s*<\/p>/;
export const ACСENT_BLOCK_WARNING = /<p>\s*!!WARNING\s*<\/p>/;
export const ACCENT_BLOCK_QUOTE = /<p>\s*!!QUOTE<\/p>/

export const ACСENT_BLOCK = new RegExp(
  SIMPLE_ACСENT_BLOCK.source + '|' + 
  ACСENT_BLOCK_PINK.source + '|' + 
  ACСENT_BLOCK_WARNING.source + '|' + 
  ACCENT_BLOCK_QUOTE.source
);

export const ELEM = new RegExp(
  PARAGRAPH.source +
    '|' +
    LIST.source +
    '|' +
    HLEVEL.source +
    '|' +
    VIDEO.source +
    '|' +
    IMAGE.source +
    '|' +
    BUTTON.source +
    '|' +
    ACСENT_BLOCK.source +
    '|' +
    TABLE_OF_CONTENT.source +
    '|' +
    LINKS_BLOCK.source,
  'g'
);