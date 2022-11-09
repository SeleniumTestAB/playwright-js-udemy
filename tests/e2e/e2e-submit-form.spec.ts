import { test, expect } from '@playwright/test'
import { FeedbackPage } from '../../page-objects/FeedbackPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Feedback form', () => {
  let homePage: HomePage
  let feedbackPage: FeedbackPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    feedbackPage = new FeedbackPage(page)
    await homePage.visit()
    await homePage.clickOnFeedbackLink()
  })

  test('Reset feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'some name',
      'some@email.com',
      'some subject',
      'some nice comment'
    )

    await feedbackPage.clearForm()
    await feedbackPage.assertReset()
  })

  test('Submit feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'some name',
      'some@email.com',
      'some subject',
      'some nice comment'
    )
    await feedbackPage.submitForm()
    await feedbackPage.feedbackFormSent()
  })
})
