'use client'

import { useState } from 'react'
import LeadForm from './LeadForm'

interface LeadFormModalProps {
  defaultState?: string
}

export default function LeadFormModal({ defaultState }: LeadFormModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="text-center my-8">
        <button
          onClick={() => setOpen(true)}
          className="bg-green-600 hover:bg-green-700 active:scale-95 text-white font-bold text-base sm:text-lg px-6 sm:px-10 py-4 rounded-xl shadow-lg transition-all cursor-pointer leading-snug"
        >
          Get an Exact Quote from a Licensed Agent in Your State
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/55 z-50 flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mt-10 mb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
              <p className="font-bold text-blue-900 text-lg">Request Your Exact Rate</p>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-xl leading-none cursor-pointer px-2"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <LeadForm defaultState={defaultState} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
