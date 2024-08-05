import { Page } from '@playwright/test'
import { BasePage } from './BasePage'
import { amazonPage } from './amazon.page' 
import { amazonNewPage } from './amazonNew.page' 

export const createPage = (page: Page) => {
    return {
        base: new BasePage(page),
        amazon: new amazonPage(page),
        amazonNewPage: new amazonNewPage(page)
    }
}
