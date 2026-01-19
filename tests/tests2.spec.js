import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://marathon.rplearn.net/mikiya_ogura/');
  await page.getByRole('link', { name: '＋ 顧客登録 →' }).click();
  await page.getByRole('textbox', { name: '会社名:' }).click();
  await page.getByRole('textbox', { name: '会社名:' }).fill('test');
  await page.getByRole('textbox', { name: '業種:' }).click();
  await page.getByRole('textbox', { name: '業種:' }).fill('testtes');
  await page.getByRole('textbox', { name: '連絡先:' }).click();
  await page.getByRole('textbox', { name: '業種:' }).click();
  await page.getByRole('textbox', { name: '業種:' }).fill('test');
  await page.getByRole('textbox', { name: '連絡先:' }).click();
  await page.getByRole('textbox', { name: '連絡先:' }).fill('test');
  await page.getByRole('textbox', { name: '所在地:' }).click();
  await page.getByRole('textbox', { name: '所在地:' }).fill('test');
  await page.getByRole('button', { name: '送信' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: '登録する' }).click();
});