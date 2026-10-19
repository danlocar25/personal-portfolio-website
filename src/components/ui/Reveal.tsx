import { motion, useReducedMotion } from 'motion/react'
import type { PropsWithChildren } from 'react'

export function Reveal({
  children,
  className = '',
}: PropsWithChildren<{ className?: string }>) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
