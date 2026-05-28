export interface Spoke {
  slug: string
  title: string
  description: string
  details: string[]
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
    title: 'California Labor Law Compliance',
    description: 'Ensure strict alignment with complex and evolving California labor codes and regulations.',
    details: [
      'Meal and rest period policy validation',
      'Overtime calculations and paystub compliance',
      'Mandatory state posting requirements setup',
      'Leaves of absence administration review'
    ]
  },
  'handbook': {
    slug: 'handbook',
    title: 'Employee Handbook Development',
    description: 'Drafting custom, comprehensive employee handbooks customized to California laws.',
    details: [
      'Custom at-will employment clauses',
      'State-mandated anti-harassment and leave policy incorporation',
      'Custom company standards and expectations guidelines',
      'Annual regulatory updates subscription option'
    ]
  },
  'training': {
    slug: 'training',
    title: 'HR Training & Development',
    description: 'Provide state-mandated and professional development training for your staff.',
    details: [
      'SB 1343 compliant sexual harassment prevention training',
      'Leadership & managerial compliance workshops',
      'Conflict resolution and documentation practices',
      'Performance evaluation and feedback systems'
    ]
  },
  'ai-services': {
    slug: 'ai-services',
    title: 'AI-Powered HR Consulting',
    description: 'Leveraging cutting-edge AI assistants to streamline policy drafting and question resolution.',
    details: [
      'Instant interactive California compliance checker',
      'AI policy draft templates custom-tailored in real-time',
      'Automated job description generation',
      'Affordable large-firm-quality consulting rates'
    ]
  }
}
