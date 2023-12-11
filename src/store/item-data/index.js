// import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class ItemData extends StoreModule {
  constructor(store, name) {
    super(store, name);
    // this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      goodItem: {},
    };
  }

  async load(id) {
    const fetchedData = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await fetchedData.json();
    const goodItemData = json.result;

    this.setState(
      {
        ...this.getState(),
        goodItem: goodItemData,
      },
      "Загружен товар из АПИ"
    );
  }
}

export default ItemData;
