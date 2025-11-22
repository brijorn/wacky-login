// app/components/TransitionProvider.tsx
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        
        /* 1. Initial State (Before the new page enters) */
        /* It starts invisible and slightly smaller (0.9 scale) */
        initial={{ opacity: 0, scale: 0.9 }}
        
        /* 2. Animate State (When the page is visible) */
        /* It fades in to 100% and grows to full size (1.0 scale) */
        animate={{ opacity: 1, scale: 1 }}
        
        /* 3. Exit State (When the old page leaves) */
        /* It fades out and shrinks back down to 0.9 scale */
        exit={{ opacity: 0, scale: 0.9 }}
        
        transition={{ duration: 0.4, ease: "easeInOut" }}
        
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}