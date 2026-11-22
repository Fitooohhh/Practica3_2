import { expect, test } from '@playwright/test';

async function openPortfolio(page) {
  await page.goto('/');
  await page.getByRole('button', { name: /Empezar/ }).click();
}

test('muestra la portada y navegación principal', async ({ page }) => {
  await openPortfolio(page);
  await expect(page).toHaveTitle(/Adolfo Vera/);
  await expect(page.getByRole('heading', { name: /Adolfo Javier/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Proyectos', exact: true })).toBeVisible();
});

test('carga los proyectos del backend', async ({ page }) => {
  await openPortfolio(page);
  await page.getByRole('button', { name: 'Proyectos', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Proyectos', exact: true })).toBeVisible();
  await expect(page.getByText('Sistema de Control de Filas - Banco')).toBeVisible();
});

test('muestra la información de contacto', async ({ page }) => {
  await openPortfolio(page);
  await page.getByRole('navigation').getByRole('button', { name: 'Contacto', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Contacto', exact: true })).toBeVisible();
  await expect(page.getByText('avm0098@gmail.com')).toBeVisible();
});
