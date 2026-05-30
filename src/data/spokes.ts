export interface Spoke {
  slug: string
  title: string
  description: string
  details: string[]
  icon?: string
}

export const spokesRegistry: Record<string, Spoke> = {
  'compliance-audit': {
    slug: 'compliance-audit',
    title: 'HR Compliance Audit',
    description: 'Comprehensive analysis of your current HR policies, files, and practices to identify compliance gaps.',
    details: [
      'I-9 audit and verification procedures',
      'Employee file structure & storage review',
      'Wage and hour classification check',
      'Local municipality ordinance compliance checks'
    ]
  },
  'labor-law': {
    slug: 'labor-law',
    title: 'Wage-and-Hour Cleanup',
    description: 'Break, overtime, paystub, scheduling, and classification process review aimed at reducing preventable exposure.',
    details: [
      'Meal and rest period policy validation',
      'Overtime calculations and paystub compliance',
      'Mandatory state posting requirements setup',
      'Leaves of absence administration review',
      'Contractor vs. employee classification analysis'
    ]
  },
  'handbook': {
    slug: 'handbook',
    title: 'Handbooks & Policies',
    description: 'Handbook updates, policy cleanup, notices, forms, and practical documentation built for California small-business reality.',
    details: [
      'Custom at-will employment clauses',
      'State-mandated anti-harassment and leave policy incorporation',
      'Custom company standards and expectations guidelines',
      'Annual regulatory updates subscription option'
    ]
  },
  'ai-services': {
    slug: 'ai-services',
    title: 'AI-Powered HR Consulting',
    description: 'Leveraging cutting-edge AI assistants to streamline policy drafting, automation, and question resolution.',
    details: [
      'Instant interactive California compliance checker',
      'AI policy draft templates custom-tailored in real-time',
      'Automated job description and onboarding content generation',
      'Affordable large-firm-quality consulting rates'
    ]
  },
  'manager-support': {
    slug: 'manager-support',
    title: 'Manager Support',
    description: 'Hands-on help with employee issues, write-ups, investigations, terminations, and day-to-day people problems.',
    details: [
      'Employee corrective action documentation and write-ups',
      'Internal investigation process design and coaching',
      'Termination checklist and legally compliant separation process',
      'Day-to-day people problem escalation support',
      'Onboarding process design for new managers'
    ]
  },
  'harassment-prevention': {
    slug: 'harassment-prevention',
    title: 'Harassment Prevention',
    description: 'Compliance-focused harassment prevention training and policy implementation for California employers.',
    details: [
      'SB 1343 compliant training delivery for all staff and supervisors',
      'Anti-harassment and anti-discrimination policy drafting',
      'Complaint intake and investigation procedure setup',
      'Interactive Harassment Prevention Program (HPP) toolkit',
      'Annual recertification and documentation tracking'
    ]
  },
  'workplace-violence': {
    slug: 'workplace-violence',
    title: 'Workplace Violence Prevention',
    description: 'SB 553 compliant workplace violence prevention plans, hazard assessments, and incident response training.',
    details: [
      'Written Workplace Violence Prevention Plan (WVPP) development',
      'Workplace hazard identification and risk assessment',
      'Incident reporting and response procedure design',
      'Staff training and documentation per Cal/OSHA SB 553 requirements',
      'Annual plan review and update process'
    ]
  },
  'onboarding': {
    slug: 'onboarding',
    title: 'Onboarding Systems',
    description: 'Offer letters, checklists, orientation flow, new-hire packets, and role clarity for growing teams.',
    details: [
      'California-compliant offer letter templates',
      'New-hire packet and day-one checklist development',
      'I-9 and required notice delivery process',
      'Orientation flow and role clarity documentation',
      'Background check and reference process design'
    ]
  },
  'hr-support': {
    slug: 'hr-support',
    title: 'Ongoing HR Support',
    description: 'Fractional, project-based, or on-call HR support for employers who need expertise without a full-time HR hire.',
    details: [
      'On-call HR advice and issue escalation',
      'Monthly compliance check-ins and policy updates',
      'Fractional HR management for growing teams',
      'Priority access and faster turnaround on deliverables',
      'Proactive regulatory update alerts for California employers'
    ]
  }
}
