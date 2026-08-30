export interface FeeItem {
  id: string
  label: string
  type: 'hourly' | 'flat'
  amount: number | null // null = not yet researched/set
  unit?: string // e.g. "per hour", "per session", "per employee"
  notes?: string
}

export interface PricingPhase {
  phase: 'launch' | 'stepping-up' | 'market-rate' | 'premium' | 'cpi-adjusted'
  label: string
  description: string
  lastAdjusted: string | null // ISO date, null until first real adjustment
  nextScheduledReview: string | null
}

export const currentPricingPhase: PricingPhase = {
  phase: 'launch',
  label: 'Launch pricing',
  description: 'Approximately 20% below market rate, increasing quarterly toward market rate.',
  lastAdjusted: null,
  nextScheduledReview: null
}

export const feeSchedule: FeeItem[] = [
  {
    id: 'general-hourly',
    label: 'General HR consulting',
    type: 'hourly',
    amount: null,
    unit: 'per hour',
    notes: 'On-demand California HR guidance and compliance support.'
  },
  {
    id: 'nonsupervisor-training',
    label: 'Non-supervisor harassment prevention training',
    type: 'flat',
    amount: null,
    unit: 'per session',
    notes: 'Mandatory 1-hour live training for California employees (SB 1343).'
  },
  {
    id: 'supervisor-training',
    label: 'Supervisor harassment prevention training',
    type: 'flat',
    amount: null,
    unit: 'per session',
    notes: 'Mandatory 2-hour live training for California supervisors (SB 1343).'
  },
  {
    id: 'wvpp-training',
    label: 'Workplace Violence Prevention training',
    type: 'flat',
    amount: null,
    unit: 'per session',
    notes: 'Mandatory annual interactive training for California staff (SB 553).'
  },
  {
    id: 'iipp-training',
    label: 'IIPP & Cal/OSHA safety compliance training',
    type: 'flat',
    amount: null,
    unit: 'per session',
    notes: 'Injury & Illness Prevention and Heat Illness prevention overview.'
  },
  {
    id: 'wage-hour-training',
    label: 'Wage and hour compliance training',
    type: 'flat',
    amount: null,
    unit: 'per session',
    notes: 'Timekeeping, meal/rest break rules, and paystub compliance for managers.'
  },
  {
    id: 'onboarding-kyr-training',
    label: 'Onboarding & Know Your Rights compliance training',
    type: 'flat',
    amount: null,
    unit: 'per session',
    notes: 'Mandatory notice delivery and employee rights onboarding protocol.'
  }
]
