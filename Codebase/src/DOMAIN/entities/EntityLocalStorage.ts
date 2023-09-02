export default class EntityLocalStorage {
  private value: any;

  constructor(_value: any) {
    this.value = _value;
  }

  getValue = () => {
    return this.value
  }
}
