'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const MAX_CONCURRENT = 4

let queue: Array<() => void> = []
let running = 0

const runNext = () => {
    if (running >= MAX_CONCURRENT || queue.length === 0) return
    const task = queue.shift()
    if (!task) return
    running++
    task()
}

const finishTask = () => {
    running = Math.max(0, running - 1)
    runNext()
}

export function useSmartLazyLoad(id: string | number) {
    const ref = useRef<HTMLDivElement>(null)
    const [enabled, setEnabled] = useState(false)
    const hasTriggeredRef = useRef(false)

    const done = useCallback(() => {
        finishTask()
    }, [])
    useEffect(() => {
        return () => {
            hasTriggeredRef.current = false
        }
    }, [id])

    useEffect(() => {
        const el = ref.current
        if (!el || enabled || hasTriggeredRef.current) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || hasTriggeredRef.current) return
                hasTriggeredRef.current = true
                queue.push(() => setEnabled(true))
                runNext()
            },
            {
                threshold: 0.5,        
                rootMargin: '0px'
            }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [id, enabled]) 
    return { ref, enabled, done }
}