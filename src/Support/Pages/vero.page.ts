import { Page, expect } from "@playwright/test";
import { VeroElements } from "../Elements/vero.elements";

export class VeroPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto("https://querovero.com.br/para-voce/contato-vero", {
      waitUntil: "domcontentloaded",
    });
    await expect(this.page.locator(VeroElements.form)).toBeVisible();
  }

  async checkLayout() {
    await expect(this.page.locator(VeroElements.header)).toBeVisible();
    await expect(this.page.locator(VeroElements.main)).toBeVisible();
    await expect(this.page.locator(VeroElements.footer)).toBeVisible();
  }

  async checkFormVisibility() {
    await expect(this.page.locator(VeroElements.subjectSelect)).toBeVisible();
    await expect(this.page.locator(VeroElements.nameInput)).toBeVisible();
    await expect(this.page.locator(VeroElements.phoneInput)).toBeVisible();
    await expect(this.page.locator(VeroElements.emailInput)).toBeVisible();
    await expect(this.page.locator(VeroElements.cpfInput)).toBeVisible();
    await expect(this.page.locator(VeroElements.cityInput)).toBeVisible();
    await expect(this.page.locator(VeroElements.messageTextarea)).toBeVisible();
    await expect(this.page.locator(VeroElements.privacyCheckbox)).toBeVisible();
    await expect(this.page.locator(VeroElements.submitButton)).toBeVisible();
  }

  async fillFormWithoutTerm() {
    await this.page.selectOption(VeroElements.subjectSelect, { index: 1 });
    await this.page.fill(VeroElements.nameInput, "Luiz Cardoso");
    await this.page.fill(VeroElements.phoneInput, "(48) 99999-9999");
    await this.page.fill(VeroElements.emailInput, "teste@exemplo.com");
    await this.page.fill(VeroElements.cpfInput, "12345678909");
    await this.page.fill(VeroElements.cityInput, "Criciúma");
    await this.page.fill(VeroElements.messageTextarea, "Teste sem aceitar os termos.");

    await this.page.locator(VeroElements.submitButton).scrollIntoViewIfNeeded();
    await this.page.locator(VeroElements.submitButton).click();

    await expect(this.page.locator(VeroElements.submitButton)).toBeVisible();
  }

  async fillFormAndSubmit() {
    await this.page.selectOption(VeroElements.subjectSelect, { index: 2 });
    await this.page.fill(VeroElements.nameInput, "Luiz Cardoso");
    await this.page.fill(VeroElements.phoneInput, "(48) 99999-9999");
    await this.page.fill(VeroElements.emailInput, "teste@exemplo.com");
    await this.page.fill(VeroElements.cpfInput, "12345678909");
    await this.page.fill(VeroElements.cityInput, "Criciúma");
    await this.page.fill(VeroElements.messageTextarea, "Mensagem de teste automatizada.");
    await this.page.check(VeroElements.privacyCheckbox);

    const button = this.page.locator(VeroElements.submitButton);
    await button.scrollIntoViewIfNeeded();
    await button.click();

    await expect(button).toBeHidden({ timeout: 10000 });
  }
}
