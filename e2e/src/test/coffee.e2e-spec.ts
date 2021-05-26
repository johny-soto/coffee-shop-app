import { browser } from 'protractor';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { CoffeePage } from '../page/coffee/coffee.po';


describe('workspace-project Coffee Management', () => {
  let page: AppPage;
  let navBar: NavbarPage;
  let coffee: CoffeePage;
  let alert;

  beforeEach(() => {
    page = new AppPage();
    navBar = new NavbarPage();
    coffee = new CoffeePage();
  });

  afterEach(async () => {
    await page.navigateTo();
    await navBar.clickButtonCoffeeManagement();
    await coffee.clickFristEditButtonOnList();
    const NAME = 'Test Uno';
    await coffee.clearName();
    await coffee.enterName(NAME);

    await coffee.clickSaveCoffee();
  });


  it('Deberia crear caffee', async () => {
    const NAME = 'Test Coffee';
    const CATEGORY_ID = 1;
    const PRICE = 10;
    const UNTIS = 1;
    await page.navigateTo();
    await navBar.clickButtonCoffeeManagement();
    const initialItems = await coffee.countItems();

    await coffee.clickBotonCreateCoffee();
    await coffee.enterName(NAME);
    await coffee.selectCategory(CATEGORY_ID);
    await coffee.enterPrice(PRICE);
    await coffee.enterUnits(UNTIS);
    await coffee.clickSaveCoffee();

    const finalItems = await coffee.countItems();
    expect(initialItems + 1).toBe(finalItems);
  });


  it('Deberia listar cafe', async () => {
    await page.navigateTo();
    await navBar.clickButtonCoffeeManagement();
    const name = await coffee.getFirstRowDataName();
    expect(name).toBe('Test Uno');
  });


  it('Deberia editar cafe', async () => {
    await page.navigateTo();
    await navBar.clickButtonCoffeeManagement();
    await coffee.clickFristEditButtonOnList();
    const NAME = 'Edited Coffee';
    await coffee.clearName();
    await coffee.enterName(NAME);

    await coffee.clickSaveCoffee();

    const name = await coffee.getFirstRowDataName();
    expect(name).toBe('Edited Coffee');
  });

  it('Deberia eliminar cafe', async () => {
    await page.navigateTo();
    await navBar.clickButtonCoffeeManagement();

    const initialItems = await coffee.countItems();
    await coffee.clickFristDeleteButtonOnList();
    alert = browser.switchTo().alert();
    alert.accept();
    const finalItems = await coffee.countItems();
    expect(initialItems - 1).toBe(finalItems);

  });

});
