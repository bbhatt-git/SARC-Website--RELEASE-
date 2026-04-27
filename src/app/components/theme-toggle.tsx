"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // To prevent layout shift, render a placeholder of the same size.
    return <div className="w-16 h-9" />
  }
  
  const isLight = resolvedTheme === "light";

  return (
    <div
      className="relative flex items-center w-16 h-9 rounded-full p-1 bg-slate-200/70 dark:bg-slate-800/90 border border-white/20 cursor-pointer"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute h-7 w-7 bg-white dark:bg-slate-950 rounded-full shadow-md"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          left: isLight ? "4px" : "32px",
        }}
      />
      <div className="relative z-10 flex w-full justify-around items-center">
        <Sun className={`w-4 h-4 transition-colors ${isLight ? 'text-slate-900' : 'text-slate-400'}`} />
        <Moon className={`w-4 h-4 transition-colors ${!isLight ? 'text-white' : 'text-slate-500'}`} />
      </div>
    </div>
  )
}
