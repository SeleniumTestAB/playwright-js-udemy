import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly userInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.userInput = page.locator('#user_login')
    this.passwordInput = page.locator('#user_password')
    this.submitButton = page.locator('text=Sign in')
    this.errorMessage = page.locator('.alert-error')
  }

  async login(username: string, password: string): Promise<LoginPage> {
    this.userInput.type(username)
    this.passwordInput.type(password)
    this.submitButton.click()

    return this
  }

  async assertErrorMessage(): Promise<void> {
    expect(this.errorMessage).toContainText('Login and/or password are wrong')
  }
}
