import { NextRequest, NextResponse } from 'next/server'
import { callClaude } from '@/lib/claude/server'

const SYSTEM_PROMPT = `You are a California HR policy drafter working for BizHR. A small business
owner will describe, in plain English, a workplace policy they need. Draft a clear, professional,
California-compliant policy document.

Rules:
- Write in plain, direct language a small business owner and their employees can actually read
- Cite the relevant California statute or regulation where applicable (e.g. Labor Code section, CCR title)
- Structure with clear headers (##) and short paragraphs or bullet points
- Include a short "Employee Acknowledgment" section at the end
- Start the response with a single-line disclaimer exactly like this, then a blank line, then the policy:
"⚠️ AI-generated draft. Have this reviewed by a California employment attorney before adopting it."
- Do not invent specific statute numbers you are not confident about -- if unsure, describe the
  general legal area instead of citing a specific section
- Keep the total length reasonable for a real policy (roughly 400-700 words)`

export async function POST(req: NextRequest) {
  try {
    const { request: policyRequest } = await req.json()

    if (!policyRequest || typeof policyRequest !== 'string' || policyRequest.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please describe the policy you need in a bit more detail.' },
        { status: 400 }
      )
    }

    const draft = await callClaude({
      system: SYSTEM_PROMPT,
      userMessage: policyRequest.slice(0, 2000),
      maxTokens: 2000,
    })

    return NextResponse.json({ draft })
  } catch (err) {
    console.error('Policy Architect error:', err)
    return NextResponse.json(
      { error: 'Something went wrong generating your policy draft. Please try again.' },
      { status: 500 }
    )
  }
}
