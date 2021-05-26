import { by, element } from 'protractor';

export class NavbarPage {
  linkCoffeeManagement = element.all(by.xpath('/html/body/app-root/app-navbar/nav')).all(by.tagName('a')).get(1);

  async clickButtonCoffeeManagement() {
    await this.linkCoffeeManagement.click();
  }
}
