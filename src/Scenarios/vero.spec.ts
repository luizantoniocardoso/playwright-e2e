import { test } from "@playwright/test";
import { VeroPage } from "../Support/Pages/vero.page";

test.describe("Vero Internet – Página de Contato", () => {
  let vero: VeroPage;

  test.beforeEach(async ({ page }) => {
    vero = new VeroPage(page);
    await vero.open();
  });

  test("TC01 – Verificar se todos os campos e o layout estão visíveis", async () => {
    await vero.checkLayout();
    await vero.checkFormVisibility();
  });

  test("TC02 – Tentar enviar sem aceitar os termos de privacidade", async () => {
    await vero.fillFormWithoutTerm();
  });

  test("TC03 – Preencher todos os campos e enviar formulário com sucesso", async () => {
    await vero.fillFormAndSubmit();
  });
});
