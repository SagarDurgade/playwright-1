import { test, expect, chromium } from "@playwright/test";
import { createPage } from "./amzon/app"

test("test", async () => {
  test.setTimeout(60000)
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  const pages = createPage(page)

  // Go to url and verify title
  pages.amazon.gotoUrlAndVerifyTitle(testData.url)

  // Select dropdown
  pages.amazon.selectTheDepartment()

  // Search text and verify dropdown
  pages.amazon.searchTextAndVerify(testData.search)

  // Search text and open first result
  pages.amazon.searchAndSelect(testData.seatchText)

  // Select iphone and handel new tab
  const pagePromise = context.waitForEvent('page')
  await page.locator("//*[contains(text(),'Apple iPhone 13')]").first().click()
  const newTab = await pagePromise

  const newPage = createPage(newTab)

  // Navigate to next tab and click on Visit the Apple Store
  newPage.amazonNewPage.visitTheAppleLinkStore


  // Select apple watch 
  newPage.amazonNewPage.selectAppleWatch()

  // Verify same product is open
  newPage.amazonNewPage.selectQuickLook(testData.watch)
})

const testData = {
  url: "https://www.amazon.in/",
  search: "iphone 13",
  seatchText: "iphone 13 128GB",
  watch: "[GPS + Cellular 40 mm]",
}
