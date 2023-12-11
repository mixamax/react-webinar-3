import { memo, useCallback, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemParams from "../../components/item-params";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import FlexTool from "../../components/flex-tool";
import Menu from "../../components/menu";

function ItemPage() {
  let { itemId } = useParams();

  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    itemData: state.itemData.goodItem,
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
    loadItem: useCallback(
      (_id) => store.actions.itemData.load(_id),
      [store, itemId]
    ),
  };

  useLayoutEffect(() => {
    callbacks.loadItem(itemId);
    console.log(store);
  }, [itemId]);

  return (
    <PageLayout>
      <Head title={select.itemData.title} />
      <FlexTool>
        <Menu />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </FlexTool>

      <ItemParams
        addToBasket={callbacks.addToBasket}
        _id={itemId}
        data={select.itemData}
        list={select.list}
      />
    </PageLayout>
  );
}

export default memo(ItemPage);
