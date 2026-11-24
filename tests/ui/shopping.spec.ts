import { test, expect } from '../../fixtures/test';

test.describe('Shopping flow', () => {
  test('products can be sorted by price low to high', async ({ loggedInInventory }) => {
    await loggedInInventory.sortBy('lohi');
    const prices = await loggedInInventory.prices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('cart badge reflects added items', async ({ loggedInInventory }) => {
    await loggedInInventory.addToCart('sauce-labs-backpack');
    await loggedInInventory.addToCart('sauce-labs-bike-light');
    await expect(loggedInInventory.cartBadge).toHaveText('2');
  });

  test('user can complete an end-to-end purchase', async ({ loggedInInventory, checkoutPage }) => {
    await loggedInInventory.addToCart('sauce-labs-backpack');
    await loggedInInventory.openCart();
    await expect(checkoutPage.cartItems).toHaveCount(1);

    await checkoutPage.checkoutButton.click();
    await checkoutPage.fillDetails('Test', 'User', '500001');
    await checkoutPage.finishButton.click();
    await checkoutPage.expectOrderComplete();
  });

  test('checkout requires a first name', async ({ loggedInInventory, checkoutPage, page }) => {
    await loggedInInventory.addToCart('sauce-labs-backpack');
    await loggedInInventory.openCart();
    await checkoutPage.checkoutButton.click();
    await checkoutPage.continueButton.click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });
});
