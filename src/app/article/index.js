import { memo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import { useDispatch, useSelector } from "react-redux";
import shallowequal from "shallowequal";
import articleActions from "../../store-redux/article/actions";
import commentsActions from "../../store-redux/comments/actions";
import Comments from "../../components/comments";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import customUseSelector from "../../hooks/use-selector";

function Article() {
  const store = useStore();

  const dispatch = useDispatch();

  // Параметры из пути /articles/:id
  const params = useParams();

  const customSelect = customUseSelector((state) => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
    userName: state.session.user.profile?.name,
  }));

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.loadComments(params.id));
  }, [params.id]);

  const select = useSelector(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data.items,
      count: state.comments.data.count,
      waitingComments: state.comments.waiting,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    sendComment: useCallback(
      (body) => dispatch(commentsActions.sendComment(body, params.id)),
      [params.id]
    ),
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <Spinner active={select.waitingComments}>
        <Comments
          userName={customSelect.userName}
          sendComment={callbacks.sendComment}
          articleId={params.id}
          waiting={customSelect.waiting}
          exists={customSelect.exists}
          count={select.count}
          comments={treeToList(listToTree(select.comments), (item, level) => ({
            margin: level,
            date: new Date(item.dateCreate).toLocaleString("ru", options),
            name: item.author.profile.name,
            text: item.text,
            id: item._id,
            parentId: item.parent._id,
          }))}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
