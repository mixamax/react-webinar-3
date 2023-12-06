import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemParams from "../../components/item-params";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function ItemPage() {
  let { itemId } = useParams();
  const { data, isLoading } = useGetItemData(itemId);

  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  return (
    <PageLayout>
      {isLoading ? <Head title="...loading" /> : <Head title={data.title} />}
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <ItemParams
          addToBasket={callbacks.addToBasket}
          _id={itemId}
          data={data}
        />
      )}
    </PageLayout>
  );
}

export default memo(ItemPage);

function useGetItemData(id) {
  const [itemData, setItemData] = useState({
    data: {},
    isLoading: true,
  });

  useEffect(() => {
    const getData = async (id) => {
      try {
        const fetchedData = await fetch(
          `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
        );

        const Data = await fetchedData.json();

        setItemData({
          data: {
            ...data,
            title: Data.result.title,
            description: Data.result.description,
            price: Data.result.price,
            edition: Data.result.edition,
            category: Data.result.category.title,
            madeIn: Data.result.madeIn.title,
          },
          isLoading: false,
        });
      } catch (err) {
        setItemData({
          ...itemData,
          isLoading: false,
        });
      }
    };

    getData(id);
  }, []);
  const { data, isLoading } = itemData;

  console.log(itemData);
  return { data, isLoading };
}
