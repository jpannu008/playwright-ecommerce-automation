# E-commerce UI Automation with Playwright

TypeScript + Playwright test suite for the public SauceDemo practice store: https://www.saucedemo.com/

## Coverage
- Valid login and invalid-password validation
- Product listing visibility
- Add/remove product from cart
- Required checkout-field validation
- Successful checkout journey

## Setup
Requires Node.js 18+.

```bash
npm install
npx playwright install
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

## Portfolio evidence
After executing the suite, add your own report screenshots under `evidence/`. This project does not claim production coverage, payment integration testing, security testing or accessibility certification.
