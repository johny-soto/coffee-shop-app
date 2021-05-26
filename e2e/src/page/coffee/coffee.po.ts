import { by, element, promise } from 'protractor';

export class CoffeePage {
  private buttonCreateCoffee = element(by.id('add'));
  private inputName = element(by.id('name'));
  private inputPrice = element(by.id('price'));
  private inputUnits = element(by.id('units'));
  private buttonSaveCoffee = element(by.id('save'));
  private select = element(by.id('selct-cat'));
  private categories = element.all(by.className('categ'));
  private namesInList = element.all(by.className('name'));
  private listButtons = element.all(by.tagName('td')).get(4);
  private paginator = element(by.id('paginator'));

  async clickBotonCreateCoffee() {
    await this.buttonCreateCoffee.click();
  }

  async enterName(name: string) {
    await this.inputName.sendKeys(name);
  }

  async clearName() {
    await this.inputName.clear();
  }

  async selectCategory(id: number) {
    await this.select.click();
    await this.categories.get(id).click();
  }

  async enterPrice(price: number) {
    await this.inputPrice.sendKeys(price);
  }

  async enterUnits(units: number) {
    await this.inputUnits.sendKeys(units);
  }

  async clickSaveCoffee() {
    await this.buttonSaveCoffee.click();
  }

  async clickFristEditButtonOnList() {
    await this.listButtons.element(by.id('edit')).click();
  }

  async clickFristDeleteButtonOnList() {
    await this.listButtons.element(by.id('delete')).click();
  }


  async countItems(): Promise<number> {
    let items = await this.paginator.getText();
    items = items.substr(items.length - 5);
    items = items.replace(/[^0-9\.]+/g, '');
    return +items;
  }

  getFirstRowDataName(): promise.Promise<string> {
    return this.namesInList.get(0).getText();
  }

}
