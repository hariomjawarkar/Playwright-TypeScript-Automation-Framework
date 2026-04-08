import { test, expect } from '../fixtures/baseTest';
import { getExcelData } from '../utils/excelReader';
import * as path from 'path';

test.describe('Data-Driven Login Tests @ddt', () => {

  // Load data from Excel
  const excelFilePath = path.resolve(__dirname, '../test-data/loginData.xlsx');

  // Clear storage state to ensure we actually test the login process
  test.use({ storageState: { cookies: [], origins: [] } });

  const loginCredentials = getExcelData(excelFilePath).filter((c: any) => c.username);

  for (const credentials of loginCredentials) {
    test(`Login test for user: ${credentials.username}`, async ({ loginPage, page }) => {
      await loginPage.navigateToLogin();
      await loginPage.login(credentials.username, credentials.password);
      
      // Check if login was successful
      await expect(page).toHaveURL(/.*inventory.html/);
      await expect(page.locator('.title')).toHaveText('Products');
    });
  }

});
