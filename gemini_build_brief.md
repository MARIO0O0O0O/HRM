# GeminiCLI Build Brief — BizHR Static Site
## Device: Samsung Galaxy S24 Ultra
## Target Repository: MARIO0O0O0O/HRM.git

---

## Overview

Use this brief to build and deploy a complete static HR services landing site for BizHR using GeminiCLI on a Samsung Galaxy S24 Ultra. All work should be committed and pushed to the GitHub repository at `https://github.com/MARIO0O0O0O/HRM.git`.

---

## Environment Setup (Run first on S24 Ultra via Termux or Android Terminal)

```bash
# Install dependencies via Termux
pkg update && pkg upgrade -y
pkg install git nodejs python -y
npm install -g @google/gemini-cli

# Authenticate Gemini
gemini auth login

# Clone or init the repo
git clone https://github.com/MARIO0O0O0O/HRM.git
cd HRM

# Set Git identity if not already set
git config user.email "mario_espindola@outlook.com"
git config user.name "Mario Espindola"
```

---

## Site Architecture

Build a fully static, mobile-first, SEO-optimized website using semantic HTML5, CSS3 (no frameworks required), and lightweight vanilla JavaScript.

### Pages / Tabs

| File | Purpose |
|---|---|
| `index.html` | Main landing page — done-for-you HR services |
| `about.html` | Bio page — Who is Mario Espindola / BizHR |
| `ai-services.html` | AI implementation guidance for small businesses |
| `contact.html` | Contact, booking, and payment options |
| `styles.css` | Shared responsive styles |
| `script.js` | Booking form logic and nav behavior |

---

## Section Instructions for `index.html`

Build the homepage with these sections in order:

1. **Navigation** — sticky, with links to: Home, About, AI Services, Book Now, Contact
2. **Hero** — primary headline, subhead, trust indicators, CTA buttons
3. **Services** — 6 service cards
4. **Industries Served** — chip/tag layout
5. **California HR Risk Areas** — checklist column + info panel
6. **Consultation Pricing** — $75 / 30-min card with apply-to-service note
7. **Booking Section** — Cal.com placeholder embed or button
8. **AI Services Preview** — teaser section linking to ai-services.html
9. **About Teaser** — brief bio snippet linking to about.html
10. **Contact & Payment** — phone, email, Zelle, Venmo, Cash App
11. **Footer**

### Hero copy

- **Headline:** Done-for-you HR and AI services for California small businesses.
- **Subhead:** BizHR helps employers in the San Gabriel Valley clean up HR, wage-and-hour, and compliance gaps — and implement AI tools that give small businesses the output of a large firm.
- **CTA 1:** Book a $75 Consultation
- **CTA 2:** Call 626-999-6239

### Consultation offer (must appear on homepage and contact page)

> **$75 initial consultation — 30 minutes.** The consultation fee is applicable toward any service if you choose to continue. No obligation.

### Contact details (insert exactly as shown)

- Phone: 626-999-6239
- Email: mario_espindola@outlook.com
- Zelle: mario_espindola@outlook.com
- Venmo: @marioo00
- Cash App: 10mario01

### Booking

Embed or link to a Cal.com or Calendly scheduling page. Use this placeholder:
```html
<!-- REPLACE WITH YOUR REAL CAL.COM LINK -->
<a class="btn btn-primary" href="https://cal.com/your-handle/bizhr-consult" target="_blank" rel="noopener">
  Book your 30-minute consultation — $75
</a>
```

---

## SEO Requirements (apply to all pages)

Add to every `<head>`:

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>[Page title] | BizHR — Done-for-You HR and AI Services, San Gabriel Valley CA</title>
<meta name="description" content="[Unique page description]" />
<meta name="keywords" content="HR services San Gabriel Valley, small business HR consultant California, PAGA compliance, done-for-you HR, AI implementation small business, fractional HR" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://bizhr.org/[page]" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="BizHR" />
<meta property="og:title" content="[Page title]" />
<meta property="og:description" content="[Page description]" />
<meta property="og:url" content="https://bizhr.org/[page]" />
```

Add this Schema.org structured data to `index.html`:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "BizHR",
  "url": "https://bizhr.org",
  "telephone": "+1-626-999-6239",
  "email": "mario_espindola@outlook.com",
  "founder": {
    "@type": "Person",
    "name": "Mario Espindola",
    "description": "MPA, public sector HR professional, AI automation specialist"
  },
  "areaServed": ["San Gabriel Valley", "Los Angeles County", "California"],
  "description": "Done-for-you HR services and AI implementation for California small businesses.",
  "priceRange": "$75 - $2,500+",
  "paymentAccepted": ["Zelle", "Venmo", "Cash App"],
  "knowsAbout": ["California Labor Law", "PAGA Compliance", "Wage and Hour", "AI Automation for Small Business"]
}
```

---

## GitHub Push Instructions

After building all files, run:

```bash
cd HRM
git add .
git commit -m "feat: BizHR static site — HR services + AI implementation + bio — built via GeminiCLI"
git push origin main
```

If the remote branch is `master`, use:
```bash
git push origin master
```

To confirm the push:
```bash
git log --oneline -5
```

---
