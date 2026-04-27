'use client'

import React from 'react'
import { Descendant } from 'slate'

const Leaf = ({ attributes, children, leaf }: { attributes: any, children: React.ReactNode, leaf: any }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.code) {
    children = <code className="bg-muted text-foreground p-1 rounded-sm text-sm">{children}</code>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  return <span {...attributes}>{children}</span>
}

const Element = ({ attributes, children, element }: { attributes: any, children: React.ReactNode, element: any }) => {
  const style = { textAlign: element.align } as React.CSSProperties
  switch (element.type) {
    case 'block-quote':
      return <blockquote style={style} {...attributes} className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">{children}</blockquote>
    case 'bulleted-list':
      return <ul style={style} {...attributes} className="list-disc pl-6 my-4 space-y-2">{children}</ul>
    case 'heading-one':
      return <h1 style={style} {...attributes} className="text-2xl font-bold my-5">{children}</h1>
    case 'heading-two':
      return <h2 style={style} {...attributes} className="text-xl font-bold my-4">{children}</h2>
    case 'list-item':
      return <li style={style} {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol style={style} {...attributes} className="list-decimal pl-6 my-4 space-y-2">{children}</ol>
    default:
      return <p style={style} {...attributes} className="mb-4">{children}</p>
  }
}

const renderNodes = (nodes: Descendant[]): JSX.Element[] => {
  return nodes.map((node, i) => {
    if ('text' in node) { // Text node (leaf)
      return (
        <Leaf key={i} leaf={node} attributes={{ 'data-slate-leaf': true }}>
          {node.text}
        </Leaf>
      )
    }
    
    // Element node
    return (
      <Element key={i} element={node} attributes={{ 'data-slate-node': 'element' }}>
        {renderNodes(node.children)}
      </Element>
    )
  })
}

export const SlateRenderer = ({ content }: { content?: string }) => {
  if (!content) return null;

  let nodes: Descendant[] = [];
  try {
    nodes = JSON.parse(content);
  } catch (e) {
    // Fallback for old plain text/markdown content
    return <div className="text-foreground/90 whitespace-pre-wrap">{content}</div>
  }

  if (!Array.isArray(nodes) || nodes.length === 0) {
     return <div className="text-foreground/90 whitespace-pre-wrap">{content}</div>
  }

  return (
    <div className="prose-p:my-2 prose-headings:my-3">
        {renderNodes(nodes)}
    </div>
  )
}
