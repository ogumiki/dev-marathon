import { test, expect } from '@playwright/test';

test('顧客一覧から詳細ページへ遷移し、編集画面へ進める', async ({ page }) => {
  await page.goto('http://marathon.rplearn.net/mikiya_ogura/customer/list.html');

  await expect(page.getByText('Customer List')).toBeVisible();
  await expect(page.locator('table')).toBeVisible();

  // 一覧の1件目リンクで詳細へ
  const firstLink = page.locator('table a').first();
  await expect(firstLink).toBeVisible();
  await firstLink.click();

  // 詳細ページに来ていること（URLが customer 配下）
  await expect(page).toHaveURL(/\/customer\//);

  // 詳細ページに「編集/更新」導線があること
  const editTrigger =
    page.getByRole('link', { name: /編集|Edit|Update|更新/ })
      .or(page.getByRole('button', { name: /編集|Edit|Update|更新/ }));

  await expect(editTrigger.first()).toBeVisible();

  // 編集画面へ
  await editTrigger.first().click();

  // 編集フォームらしさ：会社名 or Company Name の入力欄が見えること
  const companyInput =
    page.getByRole('textbox', { name: /会社名|Company Name/ })
      .or(page.locator('input[name*="company" i]'))
      .or(page.locator('input[id*="company" i]'));

  await expect(companyInput.first()).toBeVisible();
});
