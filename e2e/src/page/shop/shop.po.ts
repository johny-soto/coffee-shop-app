import { by, element, promise } from 'protractor';

export class ShopPage {
  private createOrderButton = element(by.id('summary'));
  private payButton = element(by.id('pay'));
  private namesInList = element.all(by.className('name'));
  private checkbox = element.all(by.tagName('mat-checkbox'));

  async clickBotonCreateOrder() {
    await this.createOrderButton.click();
  }


  async clickPay() {
    await this.payButton.click();
  }

  async selectFirstCoffee() {
    await this.checkbox.get(0).click();
  }


  getFirstCardDataName(): promise.Promise<string> {
    return this.namesInList.get(0).getText();
  }

}
