
import {
    type EditorConfig,
    ClassicEditor,
    AutoLink,
    Autosave,
    Bold,
    Code,
    Essentials,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    Highlight,
    Italic,
    Link,
    Paragraph,
    PlainTableOutput,
    RemoveFormat,
    Strikethrough,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableLayout,
    TableProperties,
    TableToolbar,
    Underline,
    Input
  } from 'ckeditor5';
  

export const editorConfig: EditorConfig = {  
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'subscript',
        'superscript',
        'code',
        'removeFormat',
        '|',
        'link',
        'insertTable',
        'insertTableLayout',
        'highlight'
      ],
      shouldNotGroupWhenFull: false
    },
    ui : {
      poweredBy : {
        forceVisible : true,
      }
    },
    plugins: [
      AutoLink,
      Autosave,
      Bold,
      Code,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      Highlight,
      Italic,
      Link,
      Paragraph,
      PlainTableOutput,
      RemoveFormat,
      Strikethrough,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableLayout,
      TableProperties,
      TableToolbar,
      Underline
    ],
    fontFamily: {
      supportAllValues: true
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true
    },
    initialData: '',
    licenseKey: 'GPL',
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file'
          }
        }
      }
    },
    menuBar: {
      isVisible: false
    },
    placeholder: 'Type or paste your content here!',
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    }
 }; // CKEditor needs the DOM tree before calculating the configuration.
