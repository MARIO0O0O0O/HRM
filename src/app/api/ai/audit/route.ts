import { NextRequest, NextResponse } from 'next/server'
import { callClaude } from '@/lib/claude/server'

const SYSTEM_PROMPT = `You are a California HR compliance analyst working for CalBizHR. A small
business owner will describe their current HR practices in plain English. Your job is to
identify where they likely have compliance gaps, WITHOUT alarming them or exaggerating risk.

Respond ONLY with valid JSON in this exact shape, nothing else, no markdown fences:
{
  "areas": [
    { "name": "string (e.g. Meal & Rest Breaks)", "score": number (0-100, higher = better), "note": "one calm, factual sentence -- what's working, what to check" }
  ],
  "topPriority": "one sentence naming the single most worth-fixing area and why",
  "summary": "two to three sentences, encouraging and factual tone, no scare language, ending with a note that this is a starting point, not a legal audit"
}

Cover these areas if the input gives you enough to assess them, otherwise give a score of 50 with a note saying more detail is needed: Meal & Rest Breaks, Paystub Accuracy, Overtime & Off-the-Clock Work, Harassment Prevention Training, Workplace Violence Prevention Plan, Worker Classification, Recordkeeping, Posting Compliance.

Tone rules: never use words like "risk," "exposure," "violation," or "penalty" more than once total across the whole response. Prefer "worth checking," "a good next step," "already solid." This is meant to build trust and point to a fix, not to scare anyone.`

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json()

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please describe your current HR practices in a bit more detail.' },
        { status: 400 }
      )
    }

    const raw = await callClaude({
      system: SYSTEM_PROMPT,
      userMessage: description.slice(0, 3000),
      maxTokens: 1200,
    })

    // Claude should return clean JSON per the system prompt; guard against
    // any stray markdown fences just in case.
    const cleaned = raw.replace(/^```json\s*|\s*```$/g, '').trim()
    const parsed = JSON.parse(cleaned)

    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Strategic Audit Engine error:', err)
    return NextResponse.json(
      { error: 'Something went wrong generating your audit. Please try again.' },
      { status: 500 }
    )
  }
}
