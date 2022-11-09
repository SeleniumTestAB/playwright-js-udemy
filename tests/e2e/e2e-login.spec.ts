import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.parallel('Login / Logout flow', () => {
  let loginPage: LoginPage
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    await homePage.visit()
    await homePage.clickOnSignIn()
  })

  test('Negative Scenario for login', async ({ page }) => {
    await (
      await loginPage.login('invalid username', 'invalid password')
    ).assertErrorMessage()
  })

  test('Positive Scenario for login + logout', async ({ page }) => {
    await loginPage.login('username', 'password')

    const accountSummaryTab = await page.locator('#account_summary_tab')

    await expect(accountSummaryTab).toBeVisible()

    await page.goto('http://zero.webappsecurity.com/logout.html')

    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
