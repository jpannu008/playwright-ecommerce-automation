# E-commerce UI Automation with Playwright

TypeScript + Playwright test suite for the public SauceDemo practice store: https://www.saucedemo.com/

## Coverage
- Valid login and invalid-password validation
- Product listing visibility
- Add/remove product from cart
- Required checkout-field validation
- Successful checkout journey

## Setup
Requires Node.js 20 or later.

```bash
npm ci
npx playwright install chromium
```

## Run
```bash
npm test
npm run test:headed
npm run report
```

Practice credentials documented by the demo site:
- Username: `standard_user`
- Password: `secret_sauce`

These credentials are only for the public practice site. Demo-site behavior can change, so investigate failures before treating them as product defects.

## Design
- Reusable login helper
- User-facing locators and assertions
- Independent test cases
- HTML report, screenshots and trace on failure

## Checkout case study

[Read the checkout case study](case-study/README.md) for the scope, two reproducible findings, recorded results, and the release recommendation.

To rerun just the two findings and generate screenshot attachments in the HTML report:

```bash
npx playwright test tests/checkout-findings.spec.ts
npm run report
```

The two repro tests assert the behavior described in the findings. If the demo fixes either issue, its repro test should fail and the report should be reviewed.

The [first GitHub Actions run](https://github.com/jpannu008/playwright-ecommerce-automation/actions/runs/43269942317) passed all seven Chromium checks. Open the `checkout-qa-report` artifact for the HTML report and screenshots.
