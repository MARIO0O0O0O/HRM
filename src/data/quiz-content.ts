// Self-assessment and knowledge-quiz content for the free compliance tools.
// Ported and adapted from the earlier hrbiz.org prototype, with scoring
// language softened to match the site's "educate, don't scare" tone.

export type YesNoQuestion = {
  q: string
  /** Shown only when the tool offers per-item feedback (IIPP, KYR style) */
  yesNote?: string
  noNote?: string
}

export type SelfAssessmentProgram = {
  slug: string
  name: string
  lawRef: string
  intro: string
  questions: YesNoQuestion[]
  /** Whether to reveal per-question feedback after submit (IIPP/KYR style) vs. a single aggregate result (HPP style) */
  showPerItemFeedback: boolean
  toolkitHref: string
}

export const selfAssessmentPrograms: Record<string, SelfAssessmentProgram> = {
  hpp: {
    slug: 'hpp',
    name: 'Harassment Prevention (SB 1343)',
    lawRef: 'Gov. Code §12950.1 · SB 1343 · 2 CCR §11024',
    intro: 'Answer honestly — there are no wrong answers, just a clearer picture of where you stand.',
    showPerItemFeedback: false,
    toolkitHref: '/tools/hpp',
    questions: [
      { q: 'Does your company have 5 or more employees in California?' },
      { q: 'Have all supervisors completed AB 1825-compliant training in the past 2 years?' },
      { q: 'Have all non-supervisory employees completed SB 1343-compliant training in the past 2 years?' },
      { q: 'Do you have a written harassment prevention policy distributed to all employees?' },
      { q: 'Do you have a written complaint procedure employees know how to use?' },
      { q: 'Are all required CRD/EEOC posters currently displayed in your workplace?' },
      { q: 'Do you retain training records for at least 2 years?' },
      { q: 'Have new hires received harassment prevention training within 6 months of hire?' },
      { q: 'Do supervisors understand their mandatory reporting obligations?' },
      { q: 'Do you have a documented complaint investigation procedure?' },
    ],
  },
  iipp: {
    slug: 'iipp',
    name: 'Injury & Illness Prevention (Cal/OSHA IIPP)',
    lawRef: '8 CCR §3203',
    intro: 'Each question maps to one of the 9 required IIPP sections — a "no" tells you exactly what to fix next.',
    showPerItemFeedback: true,
    toolkitHref: '/tools/iipp',
    questions: [
      {
        q: 'Do you have a written IIPP signed by management?',
        yesNote: 'A signed written IIPP is the foundation of Cal/OSHA compliance under 8 CCR §3203.',
        noNote: 'A written IIPP is required for all California employers with 1+ employees — this is the most commonly cited Cal/OSHA gap.',
      },
      {
        q: 'Is a specific person designated as your IIPP Program Administrator?',
        yesNote: 'Your IIPP names the specific individual responsible for the program, as required.',
        noNote: 'Section 1 of your IIPP must name a specific responsible person — "management" or "HR" alone doesn\'t satisfy this.',
      },
      {
        q: 'Do you conduct regular workplace safety inspections?',
        yesNote: 'Documented periodic inspections satisfy Section 4 (Hazard Assessment).',
        noNote: 'Section 4 requires scheduled, documented safety inspections.',
      },
      {
        q: 'Do you have a documented process for employees to report hazards?',
        yesNote: 'Employees have a safe, documented way to report hazards without fear of retaliation.',
        noNote: 'Sections 3 and 4 require a documented hazard-reporting process — this is a common gap.',
      },
      {
        q: 'Are all workplace injuries and near-misses investigated and documented?',
        yesNote: 'Section 5 requires documented investigations for all injuries, illnesses, and near-misses.',
        noNote: 'Section 5 requires documenting every incident, including near-misses.',
      },
      {
        q: 'Do employees receive IIPP training upon hire and annually thereafter?',
        yesNote: 'Training at hire and annually is required — keep sign-in rosters as proof.',
        noNote: 'Section 7 requires training at hire and annually. Undocumented training is treated the same as no training.',
      },
      {
        q: 'Do you maintain 5 years of safety records (inspections, training, investigations)?',
        yesNote: 'California requires a minimum 5-year retention period for IIPP records.',
        noNote: 'Section 8 requires 5-year retention — Cal/OSHA can request records going back that far during an inspection.',
      },
      {
        q: 'Is your Cal/OSHA 300A posted February 1–April 30 each year? (If 10+ employees)',
        yesNote: 'The 300A annual summary is posted during the required window and signed by a company executive.',
        noNote: 'Employers with 10+ employees must post the 300A Feb 1–Apr 30 every year — a separate recordkeeping requirement.',
      },
    ],
  },
  kyr: {
    slug: 'kyr',
    name: 'Know Your Rights (SB 294)',
    lawRef: 'Labor Code §2810.6',
    intro: 'SB 294\'s notice requirement has a few specific, easy-to-miss details — this checks all of them.',
    showPerItemFeedback: true,
    toolkitHref: '/tools/kyr',
    questions: [
      {
        q: 'Have you provided a stand-alone Know Your Rights notice to ALL current employees?',
        noNote: 'SB 294 requires a stand-alone written notice to each current employee — not folded into a handbook or another document.',
      },
      {
        q: 'Was the notice provided by February 1, 2026 (or annually by February 1 each year after)?',
        noNote: 'Labor Code §2810.6 sets February 1 as the annual deadline every calendar year.',
      },
      {
        q: 'Does your notice cover all required rights — wage/overtime, breaks, sick leave, workers\' comp, safety reporting, union rights, FEHA, accommodation, CFRA/FMLA, personnel file, wage theft, and anti-retaliation?',
        noNote: 'A partial notice doesn\'t satisfy the requirement — every listed right needs to be addressed, even briefly.',
      },
      {
        q: 'Did you offer each employee the chance to designate an emergency contact (name, phone, relationship)?',
        noNote: 'This is a separate SB 294 requirement that\'s often missed — you have to actively offer it, not just make a form available.',
      },
      {
        q: 'Was the notice a SEPARATE, standalone document — not just added to the employee handbook?',
        noNote: 'Embedding rights information in a handbook section doesn\'t comply; it needs to be its own delivered document.',
      },
      {
        q: 'Do you have signed acknowledgments or delivery records confirming each employee received the notice?',
        noNote: 'You need to be able to prove delivery — signed acknowledgments, email read receipts, or electronic confirmation all work.',
      },
      {
        q: 'If 10% or more of your workforce speaks a language other than English, was the notice also provided in that language?',
        noNote: 'If 10%+ of employees primarily speak another language, the notice must be provided in that language too — Spanish is the most common case in California.',
      },
    ],
  },
}

export type MCQuestion = {
  q: string
  options: string[]
  correct: number
  explanation: string
}

export const wvppKnowledgeQuiz: MCQuestion[] = [
  {
    q: 'How often must California employers provide WVPP training under SB 553?',
    options: ['Every 2 years', 'Annually', 'Once at hire', 'Only after an incident'],
    correct: 1,
    explanation: 'Labor Code §6401.9(e) requires annual training — every 12 months — for all employees, unlike the 2-year cycle for harassment prevention.',
  },
  {
    q: 'Who must receive WVPP training under SB 553?',
    options: ['Only supervisors', 'Only employees who handle cash', 'All employees — no tier split', 'Supervisors (2 hrs) and employees (1 hr)'],
    correct: 2,
    explanation: 'Unlike HPP training, WVPP has no supervisor/employee tier — all employees get the same annual session.',
  },
  {
    q: "Which agency enforces California's WVPP requirement?",
    options: ['CRD (California Civil Rights Department)', 'DFEH', 'Cal/OSHA', 'EEOC'],
    correct: 2,
    explanation: 'SB 553 is a workplace safety law, so enforcement falls under Cal/OSHA rather than CRD.',
  },
  {
    q: 'How long must a Violent Incident Log be retained?',
    options: ['1 year', '2 years', '3 years', '5 years'],
    correct: 3,
    explanation: 'Labor Code §6401.9(f) requires the Violent Incident Log be kept for 5 years and made available to Cal/OSHA on request.',
  },
  {
    q: 'When must a work-related fatality be reported to Cal/OSHA?',
    options: ['Within 24 hours', 'Within 8 hours', 'Within 3 business days', 'Within 48 hours'],
    correct: 1,
    explanation: 'Cal/OSHA must be notified within 8 hours of a work-related fatality, serious injury requiring hospitalization, amputation, or loss of an eye.',
  },
  {
    q: 'Which of these businesses is exempt from SB 553?',
    options: ['A retail store with 5 employees', 'A restaurant with 50 employees', 'A hospital subject to Title 8 CCR §3342', 'A grooming business with 10 employees'],
    correct: 2,
    explanation: 'Healthcare facilities already subject to the stricter Title 8 CCR §3342 standard are exempt from §6401.9.',
  },
  {
    q: 'What must be excluded from the Violent Incident Log shared with non-management employees?',
    options: ['Date and time of the incident', 'Type of violence (I–IV)', "Personally identifiable information of victims", 'Location of the incident'],
    correct: 2,
    explanation: "Labor Code §6401.9(d) requires PII of victims to be removed from copies shared with non-management employees.",
  },
  {
    q: 'Under SB 553, WVPP training must occur during:',
    options: ["The employee's personal time", 'Paid working hours', "Either — employer's discretion", 'Within 30 days of hire on any schedule'],
    correct: 1,
    explanation: 'Labor Code §6401.9(e) requires training during paid working hours — employees can\'t be required to train on their own time.',
  },
]

export type HazardCategory = {
  category: string
  icon: string
  items: string[]
}

export const iippHazardCategories: HazardCategory[] = [
  {
    category: 'Emergency Preparedness',
    icon: '🚨',
    items: [
      'Emergency evacuation routes are posted and clearly marked',
      'Emergency exit doors are unobstructed and functional',
      'Emergency contact numbers are posted near phones',
      'First aid kit is stocked and accessible to all employees',
      'Fire extinguishers are mounted, tagged, and inspected annually',
    ],
  },
  {
    category: 'Chemical Safety',
    icon: '⚗️',
    items: [
      'Safety Data Sheets (SDS) are available for all hazardous materials',
      'Chemical containers are labeled with product name and hazard warnings',
      'Employees have received hazardous materials (HazCom) training',
      'Flammable materials are stored in approved containers away from ignition sources',
    ],
  },
  {
    category: 'Ergonomics',
    icon: '🪑',
    items: [
      'Workstations are adjusted to minimize repetitive strain',
      'Heavy lifting tasks have defined procedures or mechanical assists available',
      'Employees have received ergonomic training for their job tasks',
      'Reported musculoskeletal discomforts are tracked and addressed',
    ],
  },
  {
    category: 'Fire Safety',
    icon: '🔥',
    items: [
      'Smoke detectors are functional in all required areas',
      'Electrical panels are accessible and not blocked',
      'No frayed cords or overloaded power strips are present',
      'Flammable storage area meets distance and ventilation requirements',
    ],
  },
  {
    category: 'Slip / Trip / Fall',
    icon: '⚠️',
    items: [
      'Floor surfaces are clean, dry, and free of debris',
      'Anti-slip mats are in place at wet or high-traffic areas',
      'Walkways and aisles are clear of obstructions',
      'Ladders and step stools are in good condition and used correctly',
    ],
  },
  {
    category: 'Equipment Safety',
    icon: '🔧',
    items: [
      'All machinery has required guards and safety devices in place',
      'Equipment is inspected before use and defects are reported',
      'Lockout/tagout procedures are documented for energy-controlled equipment',
      'PPE is available and employees are trained on proper use',
    ],
  },
]
