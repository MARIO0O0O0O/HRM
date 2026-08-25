// Single source of truth for all payment handles.
// M.E. updates this file when handles change — all components pull from here.
export const PAYMENT_HANDLES = {
  venmo: '@marioo00',
  cashapp: '$10mario01',
  zelle: '626-708-2220',
  email: 'info@mario00.com',
  phone: '626-708-2220',
} as const
