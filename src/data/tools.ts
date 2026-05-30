// ─── Tools Registry ─────────────────────────────────────────────────────────
// Each tool is a "mini app" ported from the hrbiz.org repo.
// Add new tools here — they automatically appear in /tools and /tools/[slug].

export interface ToolItem {
  icon: string
  title: string
  description: string
  tags: string[]
}

export interface ToolFAQ {
  q: string
  a: string
}

export interface Tool {
  slug: string
  title: string
  shortTitle: string
  badge: string          // e.g. "SB 553 Compliant"
  description: string
  lawRef: string         // e.g. "Government Code § 12950.1"
  price: number
  priceLabel: string
  items: ToolItem[]
  faqs: ToolFAQ[]
  ctaLabel: string
  accentColor: 'indigo' | 'cyan' | 'violet' | 'rose'
}

export const toolsRegistry: Record<string, Tool> = {

  // ── Harassment Prevention Program ──────────────────────────────────────────
  hpp: {
    slug: 'hpp',
    title: 'Harassment Prevention Program (HPP) Toolkit',
    shortTitle: 'HPP Toolkit',
    badge: 'SB 1343 Compliant',
    description:
      'A complete, California-compliant DIY Harassment Prevention Program — written policy, complaint forms, manager training agenda, and employee sign-in templates. Everything you need to satisfy SB 1343 and pass a DFEH audit.',
    lawRef: 'Gov. Code § 12950.1 (SB 1343)',
    price: 149,
    priceLabel: '$149 one-time',
    accentColor: 'indigo',
    items: [
      {
        icon: '📋',
        title: 'Written HPP Policy Template',
        description:
          'A fully fillable anti-harassment and discrimination policy covering all protected classes under FEHA. Includes prohibited conduct definitions, scope of coverage (vendors, contractors, clients), investigation procedures, and non-retaliation clause. Compatible with employee handbooks.',
        tags: ['FEHA Compliant', 'All Protected Classes', 'Fillable', 'Handbook-Ready'],
      },
      {
        icon: '📝',
        title: '4 DFEH-Defensible Forms',
        description:
          'HPP-FORM-001: Employee Harassment Complaint Form. HPP-FORM-002: Supervisor Complaint Receipt Log. HPP-FORM-003: Witness Statement Template. HPP-FORM-004: Investigation Summary & Outcome Record. All forms designed for DFEH audit readiness and 4-year file retention.',
        tags: ['4 Forms', 'DFEH-Defensible', '4-Year Retention', 'Investigation-Ready'],
      },
      {
        icon: '🎓',
        title: 'Employee Training Facilitator Agenda (1-Hour)',
        description:
          'A timed, SB 1343-compliant 60-minute training agenda for all non-supervisory employees. Includes: pre-training checklist, timed module breakdowns, discussion prompts, scenario exercises, bystander intervention section, and post-training acknowledgment sign-off.',
        tags: ['SB 1343', '1-Hour', 'All Employees', 'Discussion Prompts'],
      },
      {
        icon: '🧑‍💼',
        title: 'Supervisor Training Agenda (2-Hour)',
        description:
          'A 120-minute AB 1825/SB 1343-compliant supervisor training agenda. Covers mandatory reporting duties, personal liability, FEHA complaint process, effective documentation, quid pro quo vs. hostile work environment, and power dynamics. Includes facilitator notes and breakout scenarios.',
        tags: ['AB 1825 + SB 1343', '2-Hour', 'Supervisors', 'Liability Focus'],
      },
      {
        icon: '✍️',
        title: 'Training Sign-In & Acknowledgment Templates',
        description:
          'Employee sign-in roster with training date, trainer name, and employee signatures. Separate acknowledgment form confirming employees received and understood the anti-harassment policy. Both forms are defensible in DFEH investigations.',
        tags: ['Sign-In Roster', 'Acknowledgment Form', 'DFEH-Defensible', 'Annual Use'],
      },
    ],
    faqs: [
      {
        q: 'Who is required to receive harassment prevention training in California?',
        a: 'Under SB 1343, employers with 5 or more employees must provide 1 hour of training to all non-supervisory employees and 2 hours to supervisors every two years. New hires and newly promoted supervisors must be trained within 6 months of hire/promotion.',
      },
      {
        q: 'Does this toolkit replace a live trainer?',
        a: 'The training agendas provide a complete framework, but California law requires training be delivered by a "qualified trainer" — an attorney, HR professional, or a trainer with knowledge and expertise in FEHA law. The toolkit is the script; you still need a qualified person to deliver it. We offer live training separately.',
      },
      {
        q: 'What format are the documents in?',
        a: 'All documents are delivered as fillable PDFs and editable Microsoft Word (.docx) files. Fill in your company name, location, and applicable details once.',
      },
      {
        q: 'How do I receive the documents?',
        a: 'After payment confirmation, we\'ll email your complete toolkit within 1 business day. Contact mario_espindola@outlook.com or call 626-999-6239 with any questions.',
      },
    ],
    ctaLabel: 'Get the HPP Toolkit — $149',
  },

  // ── Workplace Violence Prevention Plan ─────────────────────────────────────
  wvpp: {
    slug: 'wvpp',
    title: 'Workplace Violence Prevention Plan (WVPP) Toolkit',
    shortTitle: 'WVPP Toolkit',
    badge: 'SB 553 / Cal/OSHA Required',
    description:
      'California SB 553 took effect July 1, 2024. Every employer must have a written WVPP. This toolkit includes the complete written plan, hazard assessment, Cal/OSHA-ready forms, and a 60-minute training facilitator guide.',
    lawRef: 'Labor Code § 6401.9 (SB 553)',
    price: 199,
    priceLabel: '$199 one-time',
    accentColor: 'cyan',
    items: [
      {
        icon: '📋',
        title: 'Written WVPP Document (SB 553 Compliant)',
        description:
          'A fully fillable Workplace Violence Prevention Plan covering all 9 required elements under Labor Code § 6401.9: (1) Plan administrator, (2) Employee involvement, (3) Coordination with employers, (4) Definitions, (5) Prohibition on retaliation, (6) Hazard identification, (7) Incident response, (8) Emergency procedures, and (9) Training. Editable by location, industry, and size.',
        tags: ['9 Required Elements', 'SB 553 Compliant', 'All Industries', 'Fillable'],
      },
      {
        icon: '🔍',
        title: 'Workplace Hazard Assessment Template',
        description:
          'A structured workplace violence hazard assessment tool covering: physical environment risks, job task exposure, client/customer interaction risk, after-hours exposure, and lone worker scenarios. Documents your hazard identification process — required by SB 553.',
        tags: ['Hazard ID Required', 'Physical + Task Risk', 'SB 553 § 6401.9(c)(5)', 'Fillable'],
      },
      {
        icon: '📝',
        title: '5 Cal/OSHA-Ready Forms',
        description:
          'WVP-FORM-001: Violent Incident Report. WVP-FORM-002: Training Sign-In Roster. WVP-FORM-003: Training Completion Master Log. WVP-FORM-004: Violent Incident Log (5-year retention, PII-compliant). WVP-FORM-005: Annual WVPP Review Checklist. All forms are Cal/OSHA inspection-ready.',
        tags: ['5 Forms', '5-Year Retention', 'Cal/OSHA Ready', 'PII-Safe'],
      },
      {
        icon: '🎓',
        title: 'Annual Training Facilitator Guide (60 Min)',
        description:
          '60-minute live training script for in-person or webinar delivery. Includes: timed session agenda, pre-training checklist, facilitated discussion prompts, module scripts, site-specific customization instructions, Q&A guide, and post-session wrap-up. Covers all mandated topics: 4 types of violence, company WVPP overview, threat levels, reporting procedures, emergency response, and bystander action.',
        tags: ['60-Min Script', 'All Employees', 'In-Person & Webinar', 'Annual'],
      },
    ],
    faqs: [
      {
        q: 'Is my business required to have a WVPP?',
        a: 'Yes — SB 553 requires virtually all California employers to maintain a written Workplace Violence Prevention Plan. The law took effect July 1, 2024. Healthcare employers have a separate, more stringent standard under SB 1299.',
      },
      {
        q: 'What happens if I don\'t have a WVPP?',
        a: 'Cal/OSHA can issue citations ranging from $18,000 (serious violation) to $25,000+ (willful/repeat violation) per occurrence. A Cal/OSHA inspection, employee complaint, or workplace incident can trigger an audit.',
      },
      {
        q: 'Does this cover healthcare employers?',
        a: 'No — healthcare employers (hospitals, clinics, home health, etc.) are subject to a separate Cal/OSHA standard (Title 8 § 3342 / SB 1299) with stricter requirements. This toolkit is designed for general industry employers.',
      },
      {
        q: 'How do I receive the documents?',
        a: 'After payment confirmation, we\'ll email your complete toolkit within 1 business day. Contact mario_espindola@outlook.com or call 626-999-6239 with any questions.',
      },
    ],
    ctaLabel: 'Get the WVPP Toolkit — $199',
  },

  // ── Injury & Illness Prevention Program ────────────────────────────────────
  iipp: {
    slug: 'iipp',
    title: 'Injury & Illness Prevention Program (IIPP) Toolkit',
    shortTitle: 'IIPP Toolkit',
    badge: '8 CCR § 3203 Required',
    description:
      'Every California employer must have a written IIPP — no exceptions, no employee minimum. This toolkit includes the complete 9-section written program, 6 Cal/OSHA forms, 30-minute training guide, and Cal/OSHA 300 log template.',
    lawRef: '8 CCR § 3203 (Cal/OSHA)',
    price: 199,
    priceLabel: '$199 one-time',
    accentColor: 'violet',
    items: [
      {
        icon: '📋',
        title: 'Written IIPP Template (9-Section)',
        description:
          'A fully fillable 9-section IIPP covering every element required by 8 CCR § 3203: (1) Responsible Person, (2) Compliance, (3) Communication, (4) Hazard Assessment, (5) Accident/Exposure Investigation, (6) Hazard Correction, (7) Training & Instruction, (8) Recordkeeping, and (9) Appendices. Editable — fill in your company name, job titles, locations, and hazard-specific procedures.',
        tags: ['9 Sections', '8 CCR § 3203', 'All Industries', 'Fillable'],
      },
      {
        icon: '📝',
        title: '6 Cal/OSHA-Compliant Forms',
        description:
          'IIPP-FORM-001: Annual Review Checklist. IIPP-FORM-002: Safety Inspection Report. IIPP-FORM-003: Hazard Report Form. IIPP-FORM-004: Incident / Near-Miss Report. IIPP-FORM-005: Hazard Correction Log. IIPP-FORM-006: Training Sign-In Roster. All forms are Cal/OSHA inspection-ready and designed for 5-year retention.',
        tags: ['6 Forms', 'Cal/OSHA Ready', '5-Year Retention', 'All Required'],
      },
      {
        icon: '🎓',
        title: '30-Minute Training Facilitator Guide',
        description:
          'A 30-minute new-hire and annual safety training script. Covers: what the IIPP is and why it matters, how to identify and report hazards, incident reporting procedures, emergency response overview, and employee rights under Cal/OSHA. Includes discussion prompts and sign-in roster.',
        tags: ['30 Min', 'New Hire + Annual', 'All Employees', 'Discussion Prompts'],
      },
      {
        icon: '📊',
        title: 'Cal/OSHA 300 Log Template',
        description:
          'A fillable Cal/OSHA Form 300 (Log of Work-Related Injuries and Illnesses), Form 300A (Summary), and Form 301 (Incident Investigation Report) — all pre-formatted and ready to use. Includes instructions on recordability thresholds, posting requirements (Feb 1–Apr 30 annually), and 5-year retention rules.',
        tags: ['Forms 300, 300A, 301', 'Posting Requirements', '5-Year Retention', 'Recordability Guide'],
      },
    ],
    faqs: [
      {
        q: 'Does every California employer need an IIPP?',
        a: 'Yes — 8 CCR § 3203 requires ALL California employers to have a written IIPP, regardless of size, industry, or number of employees. There is no minimum headcount exemption.',
      },
      {
        q: 'What are the penalties for not having an IIPP?',
        a: 'Cal/OSHA can cite employers up to $15,625 per serious violation. Willful or repeat violations can reach $156,259 per violation. An injury, employee complaint, or Cal/OSHA inspection can trigger a review of your IIPP.',
      },
      {
        q: 'Is this the same as the WVPP?',
        a: 'No — the IIPP (8 CCR § 3203) and WVPP (SB 553) are two separate, legally required programs. The IIPP covers all workplace safety hazards; the WVPP specifically addresses workplace violence. Both are required.',
      },
      {
        q: 'How do I receive the documents?',
        a: 'After payment confirmation, we\'ll email your complete toolkit within 1 business day. Contact mario_espindola@outlook.com or call 626-999-6239 with any questions.',
      },
    ],
    ctaLabel: 'Get the IIPP Toolkit — $199',
  },

  // ── Know Your Rights (SB 294) ───────────────────────────────────────────────
  kyr: {
    slug: 'kyr',
    title: 'Know Your Rights Notice Package (SB 294)',
    shortTitle: 'KYR Toolkit',
    badge: 'SB 294 Required — Annual',
    description:
      'SB 294 requires California employers to provide a written "Know Your Rights" notice to all employees at least once per year. This package includes the compliant notice template, employee acknowledgment form, emergency contact form, distribution log, and Spanish-language bonus.',
    lawRef: 'Labor Code § 2810.5 (SB 294)',
    price: 49,
    priceLabel: '$49 one-time',
    accentColor: 'rose',
    items: [
      {
        icon: '📄',
        title: 'SB 294-Compliant Notice Template',
        description:
          'A fillable, print-ready notice document covering all 13 required workers\' rights under SB 294: minimum wage, overtime, meal/rest breaks, paid sick leave (SB 616), workers\' compensation, safety reporting rights, union rights, FEHA protections, pregnancy/disability accommodation, CFRA/FMLA leave, personnel file access (SB 513), wage theft protections, and anti-retaliation rights. Available in Word and PDF formats.',
        tags: ['All 13 Rights', 'SB 294 Compliant', 'Word & PDF', 'Fillable'],
      },
      {
        icon: '✍️',
        title: 'Employee Acknowledgment & Signature Form',
        description:
          'A separate acknowledgment form employees sign (or electronically confirm) to prove they received the annual Know Your Rights notice. Includes fields for employee name, date received, delivery method, and employee signature. DLSE-defensible design — meets the recordkeeping requirement under SB 294.',
        tags: ['DLSE-Defensible', 'Print-Ready', 'Electronic-Friendly', 'Recordkeeping'],
      },
      {
        icon: '📞',
        title: 'Emergency Contact Designation Form',
        description:
          'The emergency contact form required under SB 294\'s often-overlooked provision. Employees designate a contact person\'s name, phone number, and relationship. Includes a decline option for employees who choose not to provide this information. Required to be offered annually alongside the notice.',
        tags: ['SB 294 Required', 'Opt-In Design', 'Annual Reissue', 'New Hire Use'],
      },
      {
        icon: '📋',
        title: 'Distribution Log & Annual Checklist',
        description:
          'A distribution tracking log to record which employees received the notice, when, and by what method (paper, email, or portal). Includes an annual distribution checklist with key deadlines and reminders. Satisfies the SB 294 recordkeeping requirement and demonstrates good-faith compliance in a DLSE audit.',
        tags: ['Distribution Log', 'Annual Checklist', 'DLSE Audit Ready', 'All Delivery Methods'],
      },
      {
        icon: '🇪🇸',
        title: 'Spanish-Language Notice Template (Bonus)',
        description:
          'A Spanish-language translation of the complete SB 294 Know Your Rights notice. California\'s workforce is linguistically diverse — distributing the notice in employees\' primary language strengthens compliance and demonstrates good faith. Included at no additional cost.',
        tags: ['Spanish Translation', 'Bonus Included', 'Bilingual Workforce', 'Good Faith Compliance'],
      },
    ],
    faqs: [
      {
        q: 'Who must receive the Know Your Rights notice?',
        a: 'All non-exempt (hourly) employees must receive the notice at least annually. New hires must receive it at time of hire. SB 294 applies to all California employers with at least 1 employee.',
      },
      {
        q: 'When do I need to distribute this?',
        a: 'At the time of hire and at least once per calendar year thereafter. Many employers distribute during annual performance review season or at the start of the year. The distribution log in this package helps you track compliance.',
      },
      {
        q: 'Is this the same as the Wage Theft Prevention Act notice?',
        a: 'SB 294 expanded the original Wage Theft Prevention Act (Labor Code § 2810.5) notice to include all 13 workers\' rights. This template satisfies both requirements in one document.',
      },
      {
        q: 'How do I receive the documents?',
        a: 'After payment confirmation, we\'ll email your complete package within 1 business day. Contact mario_espindola@outlook.com or call 626-999-6239 with any questions.',
      },
    ],
    ctaLabel: 'Get the KYR Package — $49',
  },
}

export const toolsList = Object.values(toolsRegistry)
