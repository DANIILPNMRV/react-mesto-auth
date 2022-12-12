export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this.container =  document.querySelector(containerSelector);
  }

  addItem(element) {
this.container.prepend(element);
  }

  renderCards() {
    this._items.forEach(item => {
      this._renderer(item)
    });
  }
}
