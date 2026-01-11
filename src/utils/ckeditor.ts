import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

import { Paragraph } from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import { Heading } from '@ckeditor/ckeditor5-heading/src/heading'

import { Bold } from '@ckeditor/ckeditor5-basic-styles/src/bold'
import { Italic } from '@ckeditor/ckeditor5-basic-styles/src/italic'
import { Underline } from '@ckeditor/ckeditor5-basic-styles/src/underline'
import { Strikethrough } from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'

import { Link } from '@ckeditor/ckeditor5-link/src/link'
import { List } from '@ckeditor/ckeditor5-list/src/list'
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote/src/blockquote'

import { Table } from '@ckeditor/ckeditor5-table/src/table'
import { TableToolbar } from '@ckeditor/ckeditor5-table/src/tabletoolbar'

export default class CustomEditor extends ClassicEditorBase {}

CustomEditor.builtinPlugins = [
  Paragraph,
  Heading,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link,
  List,
  BlockQuote,
  Table,
  TableToolbar,
]

CustomEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'blockQuote',
      'insertTable',
      'undo',
      'redo',
    ],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  language: 'en',
}
