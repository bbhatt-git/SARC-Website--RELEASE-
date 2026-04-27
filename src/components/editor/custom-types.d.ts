import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type CustomTextKey = 'bold' | 'italic' | 'underline' | 'code'
export type CustomText = { [key in CustomTextKey]?: boolean; text: string }

export type CustomElementType =
  | 'paragraph'
  | 'heading-one'
  | 'heading-two'
  | 'block-quote'
  | 'numbered-list'
  | 'bulleted-list'
  | 'list-item'

export interface CustomElementWithAlign {
  align?: 'left' | 'center' | 'right' | 'justify'
}

export type CustomElement = {
  type: CustomElementType
  children: Descendant[]
} & CustomElementWithAlign

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
