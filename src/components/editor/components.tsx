'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import {
  Bold,
  Italic,
  Underline,
  Code,
  Heading1,
  Heading2,
  Quote,
  ListOrdered,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  LucideProps,
} from 'lucide-react'

const iconMap: Record<string, React.FC<LucideProps>> = {
  format_bold: Bold,
  format_italic: Italic,
  format_underlined: Underline,
  code: Code,
  looks_one: Heading1,
  looks_two: Heading2,
  format_quote: Quote,
  format_list_numbered: ListOrdered,
  format_list_bulleted: List,
  format_align_left: AlignLeft,
  format_align_center: AlignCenter,
  format_align_right: AlignRight,
  format_align_justify: AlignJustify,
}

export const Button = React.forwardRef<
  HTMLSpanElement,
  {
    className?: string
    active: boolean
    reversed?: boolean
    children: React.ReactNode
  } & React.HTMLAttributes<HTMLSpanElement>
>(({ className, active, reversed, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={cn(
      'cursor-pointer p-1.5 rounded-sm transition-colors',
      reversed
        ? active
          ? 'text-white bg-black'
          : 'text-muted-foreground'
        : active
        ? 'bg-primary/20 text-primary'
        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
    )}
  />
))
Button.displayName = 'Button'

export const Icon = React.forwardRef<
  HTMLElement,
  { className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  const IconComponent = iconMap[children as string]
  if (!IconComponent) return null
  return <IconComponent className={cn('h-5 w-5', className)} {...props} />
})
Icon.displayName = 'Icon'

export const Toolbar = React.forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cn(
      'relative flex flex-wrap items-center gap-1 border-b bg-transparent p-2',
      className
    )}
  />
))
Toolbar.displayName = 'Toolbar'

export const ToolbarSeparator = () => (
  <div className="w-[1px] h-5 bg-border mx-1" />
)
