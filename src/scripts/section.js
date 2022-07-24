export default class Section {
  constructor({ renderer }, containerSelector) {
    // объект настроек и классы формы
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderAll(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(domElement) {
    this._container.append(domElement);
  }
}