import { test, users } from '../../fixtures/test';

test.describe('Login', () => {
  test('valid user can log in', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectLoaded();
  });

  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.locked.username, users.locked.password);
    await loginPage.expectError('this user has been locked out');
  });

  test('wrong password is rejected', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, 'wrong_password');
    await loginPage.expectError('Username and password do not match');
  });

  test('empty username shows a validation error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('', '');
    await loginPage.expectError('Username is required');
  });
});
