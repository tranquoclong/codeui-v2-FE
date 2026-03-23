import { Shield, UserCheck, Users, CreditCard } from 'lucide-react'
import { type ElementStatus } from '@/schemaValidations/element.schema'

export const callTypes = new Map<ElementStatus, string>([
    ['APPROVED', 'bg-green-300/30 text-green-800 dark:text-green-200 border-green-200'],
    ['DRAFT', 'bg-neutral-300/40 border-neutral-300'],
    ['REVIEW', 'bg-yellow-200/40 text-yellow-700 dark:text-yellow-100 border-yellow-300'],
    [
        'REJECTED',
        'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
    ],
])

export const tech = [
    {
        label: 'Tailwind',
        value: true,
        icon: Shield,
    },
    {
        label: 'CSS',
        value: false,
        icon: Shield,
    },
] as const
