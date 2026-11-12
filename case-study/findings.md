# Checkout findings

## QA-01 — Empty cart reaches order confirmation

**Severity in a real store:** High. A shopper can see a success message with nothing in the order.

1. Sign in to SauceDemo as `standard_user`.
2. Open the cart without adding a product.
3. Choose **Checkout**. Enter `Taylor`, `Test`, and `411001`, then choose **Continue**.
4. Check the overview and choose **Finish**.

**Expected** — The cart or checkout blocks the attempt and tells the shopper to add an item.

**Actual** — The overview showed no items and a total of `$0.00`. Finish opened the confirmation page with “Thank you for your order!”

**Retest** — Open checkout with an empty cart from the cart page and by navigating directly to checkout. Repeat with one item to check the normal path.

## QA-02 — First name with only spaces passes validation

**Severity in a real store:** Medium. A mandatory customer field can be submitted without meaningful input.

1. Sign in as `standard_user`, add the Sauce Labs Backpack, and start checkout.
2. Enter `Test` for Last Name and `411001` for Zip/Postal Code. Leave First Name empty and choose **Continue**.
3. Confirm the form says “First Name is required.”
4. Enter three spaces in First Name and choose **Continue** again.

**Expected** — Three spaces produce the same validation error as a blank value.

**Actual** — The blank value produced the error. With three spaces, the form advanced to the order overview.

**Retest** — Try an empty value, three spaces, and a normal name with leading or trailing spaces. Verify that a valid name still lets the shopper continue.

[Recorded results](evidence/checkout-run.json)
