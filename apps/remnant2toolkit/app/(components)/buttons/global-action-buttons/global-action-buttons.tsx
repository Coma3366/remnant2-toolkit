'use client'

import {
  ArrowUpIcon,
  BugAntIcon,
  Cog6ToothIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/solid'
import { BaseButton } from '@repo/ui/base/button'
import { cn } from '@repo/ui/classnames'
import { ZINDEXES } from '@repo/ui/zindexes'
import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { BugReportPrompt } from '@/app/(components)/alerts/bug-report-prompt'
import { ReportBug } from '@/app/(components)/buttons/global-action-buttons/actions'
import { NAV_ITEMS } from '@/app/(types)/navigation'

// Lazy-load the theme toggle, since it relies on client context
const ThemeSelectButton = dynamic(
  () => import('./theme-select-button.client'),
  {
    ssr: false,
    loading: () => (
      <BaseButton color="dark/white">
        <PaintBrushIcon className="h-5 w-5" />
      </BaseButton>
    ),
  },
)

export function GlobalActionButtons() {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        'fixed bottom-[8px] right-[8px] flex items-center justify-center gap-x-1',
        ZINDEXES.GLOBAL_ACTION_BUTTONS,
      )}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            className="bg-background-solid isolate inline-flex min-w-[140px] gap-x-1 rounded-md shadow-sm"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span className="sr-only">Theme Select</span>
              <ThemeSelectButton />
            </div>
            <div>
              <span className="sr-only">Report Bug</span>
              <ReportBugButton />
            </div>
            <div>
              <span className="sr-only">Change Log</span>
              <ChangeLogButton />
            </div>
            <div>
              <span className="sr-only">Back to Top</span>
              <BackToTopButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SettingsButton onToggle={() => setOpen((prev) => !prev)} />
    </div>
  )
}

function SettingsButton({ onToggle }: { onToggle: () => void }) {
  return (
    <BaseButton color="yellow" onClick={onToggle}>
      <Cog6ToothIcon className="h-5 w-5" />
    </BaseButton>
  )
}

function BackToTopButton() {
  function handleBackToTopClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <BaseButton onClick={handleBackToTopClick} color="cyan">
      <ArrowUpIcon className="h-5 w-5" />
    </BaseButton>
  )
}

function ChangeLogButton() {
  return (
    <BaseButton href={NAV_ITEMS.changeLog.href} target="_blank" color="violet">
      <NAV_ITEMS.changeLog.icon className="h-5 w-5" />
    </BaseButton>
  )
}

function ReportBugButton() {
  const [open, setOpen] = useState(false)

  async function handleReportBug(report: string) {
    if (!report || report.trim() === '') {
      setOpen(false)
      toast.error('Please provide a bug report')
      return
    }
    const { message } = await ReportBug(report)
    toast.success(message)
    setOpen(false)
  }

  return (
    <>
      <BugReportPrompt
        key={open ? 'open' : 'closed'}
        open={open}
        onConfirm={handleReportBug}
        onClose={() => setOpen(false)}
      />
      <BaseButton color="green" onClick={() => setOpen(true)}>
        <BugAntIcon className="h-5 w-5" />
      </BaseButton>
    </>
  )
}
