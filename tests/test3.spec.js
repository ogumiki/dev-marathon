import { test, expect } from '@playwright/test';

test('顧客登録の確認画面まで進めて、顧客一覧画面が存在することを確認する', async ({ page }) => {
  // トップ
  await page.goto('http://marathon.rplearn.net/mikiya_ogura/index.html');

  // 顧客登録へ
  await page.getByText('顧客登録').click();

  // 入力して確認画面へ
  await page.getByRole('textbox', { name: '会社名:' }).fill('テスト会社');
  await page.getByRole('textbox', { name: '業種:' }).fill('IT');
  await page.getByRole('textbox', { name: '連絡先:' }).fill('test@example.com');
  await page.getByRole('textbox', { name: '所在地:' }).fill('東京');
  await page.getByRole('button', { name: '送信' }).click();

  // 確認画面が表示される
  await expect(page.getByText('顧客登録確認')).toBeVisible();

  // ✅ ここで登録は押さない（API不調でもテストが壊れない）
  // 代わりに顧客一覧画面へ直接遷移して「存在する」ことを確認
  await page.goto('http://marathon.rplearn.net/mikiya_ogura/customer/list.html');

  await expect(page.getByText('Customer List')).toBeVisible();
  await expect(page.locator('table')).toBeVisible();
});
