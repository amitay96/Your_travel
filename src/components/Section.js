export class Section {
    constructor({renderer}, classSelector) {
        // this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(classSelector);
    }

    renderer(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }
    
    addItem(element) {
        this._container.prepend(element);
    }
}