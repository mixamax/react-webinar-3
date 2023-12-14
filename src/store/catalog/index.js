import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */

  initState() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
        sort: "order",
        query: "",
        category: "Все",
      },
      categoryList: [],
      count: 0,
      waiting: false,
    };
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */

  async getallCategories() {
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
    return categoryList;
  }

  async initParams(newParams = {}) {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has("page"))
      validParams.page = Number(urlParams.get("page")) || 1;
    if (urlParams.has("limit"))
      validParams.limit = Math.min(Number(urlParams.get("limit")) || 10, 50);
    if (urlParams.has("sort")) validParams.sort = urlParams.get("sort");
    if (urlParams.has("query")) validParams.query = urlParams.get("query");
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
      "Установлены параметры каталога"
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

export default CatalogState;
