import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoryListState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */

  initState() {
    return {
      params: {
        category: "Все",
      },
      categoryList: [],
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */

  async getallCategories() {
    this.setState(
      {
        ...this.getState(),
        categoryList: [],
      },
      "Установлены параметры категории каталога"
    );

    const response = await fetch(
      `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
    );
    const json = await response.json();
    const allCategories = json.result.items;
    const parent = [];
    const children = [];
    const result = [{ title: "Все" }];
    const hash = {};

    function getOptions() {
      allCategories.forEach((item) => {
        if (item.parent === null) {
          parent.push(item);
        } else {
          children.push(item);
          hash[item.parent._id]
            ? (hash[item.parent._id] = [...hash[item.parent._id], item])
            : (hash[item.parent._id] = [item]);
        }
      });
      function res(parentId, count = "") {
        count += "- ";
        if (hash[parentId]) {
          hash[parentId].forEach((item) => {
            result.push({ ...item, title: count + item.title });

            res(item._id, count);
          });
        } else {
          return;
        }
      }
      parent.forEach((parentItem) => {
        result.push(parentItem);
        res(parentItem._id);
      });
    }
    getOptions();
    const categoryList = result.map((item) => ({
      value: item._id || "Все",
      title: item.title,
    }));

    this.setState(
      {
        ...this.getState(),
        categoryList,
      },
      "Установлены параметры категории каталога"
    );
  }

  async initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);

    let validParams = {};
    if (urlParams.has("category"))
      validParams.category = urlParams.get("category");
    await this.setParams(
      { ...this.initState().params, ...validParams, ...newParams },
      true
    );
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = { ...this.initState().params, ...newParams };
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = { ...this.getState().params, ...newParams };

    // Установка новых параметров и признака загрузки
    this.setState(
      {
        ...this.getState(),
        params,
        waiting: true,
      },
      "Установлены параметры категории каталога"
    );

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
    const url =
      window.location.pathname + "?" + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: "items(*),count",
      sort: params.sort,
      "search[query]": params.query,
    };

    if (params.category !== "Все") {
      apiParams["search[category]"] = params.category;
    }
    const response = await fetch(
      `/api/v1/articles?${new URLSearchParams(apiParams)}`
    );
    const json = await response.json();
    const categories = await this.getallCategories();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        categoryList: categories,
        waiting: false,
      },
      "Загружен список товаров из АПИ"
    );
  }
}

export default CategoryListState;
