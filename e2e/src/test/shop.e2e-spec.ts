import { browser } from 'protractor';
import { AppPage } from '../app.po';
import { ShopPage } from '../page/shop/shop.po';


describe('workspace-project Shop', () => {
  let page: AppPage;
  let shop: ShopPage;
  let alert;

  beforeEach(() => {
    page = new AppPage();
    shop = new ShopPage();
  });

  it('Deberia listar cafe en tienda', async () => {
    await page.navigateTo();
    const name = await shop.getFirstCardDataName();
    expect(name).toBe('Test Uno');
  });

  it('Comprar café', async () => {
    await page.navigateTo();
    await shop.selectFirstCoffee();
    await shop.clickBotonCreateOrder();
    await shop.clickPay();
    browser.manage().timeouts().implicitlyWait(50000);
    alert = browser.switchTo().alert();

    expect(alert.getText()).toBe('Gracias por su compra');
    alert.accept();

  });
});
