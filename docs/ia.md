# HRM SaaS Information Architecture (IA)

This document establishes the user navigation mapping and click-flow structure, ensuring that all primary user actions are reachable within a maximum of 2 clicks.

---

## 1. Navigational Hierarchy

```
       [Home (/)]
        ├─── [Services (/services)]
        │     └─── [Spokes (/spokes/[slug])]  <-- Pre-rendered sub-pages
        ├─── [Blog (/blog)]
        ├─── [Contact (/contact)]
        ├─── [Book Consultation (/book)]
        └─── [Client Portal (/portal)]
              └─── [Sign In (/auth/login)]
```

---

## 2. Click-Flow Mapping & Goal Auditing

| Target User Goal | Path / Navigation Sequence | Click Count | Reachability |
|------------------|---------------------------|-------------|--------------|
| **Book Consultation** | Click Header "Book a Call" or Persistent Floating CTA | **1 Click** | Instant |
| **Verify Specific Service Detail** | Home → Click Services Card / Menu → Spoke detail | **2 Clicks** | High |
| **Access Client Billing** | Home → Click Client Portal → Authenticate | **2 Clicks** | Medium |
| **Review California Compliance Blog** | Home → Click Blog Link → Select article | **2 Clicks** | High |
| **Locate Agency Contact Info** | Home → Click Contact Link | **1 Click** | Instant |

---

## 3. IA Compliance Rule
No primary section or target marketing resource may reside at a depth greater than **2 navigation clicks** from the homepage or active route. A persistent floating Book a Call button is present on the bottom-right corner of all viewports to provide instant one-click booking conversion.
