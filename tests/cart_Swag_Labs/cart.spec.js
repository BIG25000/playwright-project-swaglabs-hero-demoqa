import { test, expect } from "@playwright/test";

test("CARTS-020 เพิ่มสินค้าลงตะกร้า 2 ชิ้น", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
  await page.waitForLoadState("networkidle");
  await expect(page.getByText("Products")).toBeVisible();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText(
    "2"
  );

  await page.locator('[data-test="shopping-cart-link"]').click();

  const cartItems = page.locator(".cart_item");
  await expect(cartItems).toHaveCount(2);

  await expect(
    page.locator(
      '[data-test="item-4-title-link"] [data-test="inventory-item-name"]'
    )
  ).toContainText("Sauce Labs Backpack");
  await expect(page.locator('[data-test="cart-list"]')).toContainText("$29.99");

  await expect(
    page.locator(
      '[data-test="item-0-title-link"] [data-test="inventory-item-name"]'
    )
  ).toContainText("Sauce Labs Bike Light");
  await expect(page.locator('[data-test="cart-list"]')).toContainText("$9.99");

  await expect(page.locator('[data-test="checkout"]')).toContainText(
    "Checkout"
  );
});

test("CARTS-021 ลบสินค้าออกจากตะกร้า", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
  await page.waitForLoadState("networkidle");
  await expect(page.getByText("Products")).toBeVisible();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).toHaveText("2");

  await page.locator('[data-test="shopping-cart-link"]').click();

  const cartItems = page.locator(".cart_item");
  await expect(cartItems).toHaveCount(2);

  await cartItems
    .first()
    .getByRole("button", { name: /remove/i })
    .click();

  await expect(cartItems).toHaveCount(1);
  await expect(cartBadge).toHaveText("1");
});

test("CARTS-022 Checkout ผ่านครบขั้นตอน", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
  await page.waitForLoadState("networkidle");
  await expect(page.getByText("Products")).toBeVisible();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).toHaveText("2");

  await page.locator('[data-test="shopping-cart-link"]').click();

  const cartItems = page.locator(".cart_item");
  await expect(cartItems).toHaveCount(2);

  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="firstName"]').fill("Big");
  await page.locator('[data-test="lastName"]').fill("Tester");
  await page.locator('[data-test="postalCode"]').fill("10110");

  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="payment-info-value"]')).toBeVisible();
  await expect(page.locator('[data-test="shipping-info-value"]')).toBeVisible();
  await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();
  await expect(page.locator('[data-test="tax-label"]')).toBeVisible();
  await expect(page.locator('[data-test="total-label"]')).toBeVisible();
  await page.screenshot({ path: "screenshot.png", fullPage: true });

  const itemPriceTexts = await page
    .locator(".cart_item .inventory_item_price")
    .allInnerTexts();

  const parseMoney = (txt) => Number((txt || "").replace(/[^0-9.]/g, ""));

  const itemPrices = itemPriceTexts.map(parseMoney);
  const sumItemPrices = itemPrices.reduce((acc, v) => acc + v, 0);

  // ดึง subtotal / tax / total จาก summary
  const itemTotalText = await page
    .locator('[data-test="subtotal-label"]')
    .textContent();
  const taxText = await page.locator('[data-test="tax-label"]').textContent();
  const totalText = await page
    .locator('[data-test="total-label"]')
    .textContent();

  const itemTotalAmount = parseMoney(itemTotalText);
  const taxAmount = parseMoney(taxText);
  const totalAmount = parseMoney(totalText);

  expect(itemTotalAmount).toBeCloseTo(sumItemPrices, 2);

  expect(totalAmount).toBeCloseTo(itemTotalAmount + taxAmount, 2);

  await page.locator('[data-test="finish"]').click();

  await expect(page.locator('[data-test="complete-header"]')).toContainText(
    "Thank you for your order!"
  );

  await page.locator('[data-test="back-to-products"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
});

test("CARTS-023 Checkout ว่างข้อมูล", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
  await page.waitForLoadState("networkidle");
  await expect(page.getByText("Products")).toBeVisible();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).toHaveText("2");

  await page.locator('[data-test="shopping-cart-link"]').click();

  const cartItems = page.locator(".cart_item");
  await expect(cartItems).toHaveCount(2);

  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="error"]')).toContainText(
    "Error: First Name is required"
  );
});
