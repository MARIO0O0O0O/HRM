// Server-only Anthropic client wrapper for the AI Lab (Strategic Audit
// Engine + Policy Architect). Lazy-instantiated, never imported from
// client components.

export async function callClaude(params: {
  system: string
  userMessage: string
  maxTokens?: number
}): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error(
      'ANTHROPIC_API_KEY is not configured. Add it in Vercel → Settings → Environment Variables.'
    )
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: params.maxTokens ?? 1500,
      system: params.system,
      messages: [{ role: 'user', content: params.userMessage }],
    }),
  })

  if (!response.ok) {
    const errText = await response.text()
    throw new Error(`Claude API error (${response.status}): ${errText}`)
  }

  const data = await response.json()
  const textBlock = data.content?.find((b: { type: string }) => b.type === 'text')
  return textBlock?.text ?? ''
}
