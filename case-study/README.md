# Can a shopper finish checkout with an empty cart?

I used SauceDemo, a public practice store, to test the path from cart to order confirmation. I started with a normal order and then changed one input at a time: the number of items and the first name. The expected behavior below is based on ordinary checkout requirements for this exercise.

## What I checked

| Check | Expected result | Result |
| --- | --- | --- |
| One item, valid details | Review shows the item and Finish opens confirmation | Passed |
| First name left blank | Form stays open and explains what's missing | Passed |
| No items, valid details | Checkout stops before confirmation | Failed — [QA-01](findings.md#qa-01--empty-cart-reaches-order-confirmation) |
| First name contains three spaces | Form treats the value as blank | Failed — [QA-02](findings.md#qa-02--first-name-with-only-spaces-passes-validation) |

I used the `standard_user` account and synthetic contact details. The recorded run exercised the public demo's JavaScript bundle in jsdom on 12 November 2026. It covered client-side navigation, validation, and confirmation. Payments, order storage, fulfillment, and cross-browser behavior were outside the scope of this run.

[Recorded output](evidence/checkout-run.json) · [Playwright repro steps](../tests/checkout-findings.spec.ts)

## Release recommendation

For a real store with the same behavior, I'd hold checkout sign-off until an empty cart can no longer reach confirmation. The retest should cover both the cart button and direct navigation to checkout. I’d also trim the first name before validating it, then rerun the blank, spaces-only, and valid-name cases. Once both fixes are in, rerun a normal one-item order through confirmation.

The [Chromium run on GitHub Actions](https://github.com/jpannu008/playwright-ecommerce-automation/actions/runs/43269942317) reproduced both findings. The `checkout-qa-report` artifact contains the screenshot attachments for each repro.
