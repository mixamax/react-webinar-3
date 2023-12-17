import { memo, useEffect } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Enter from "../../components/enter";
import useInit from "../../hooks/use-init";
import { useNavigate } from "react-router-dom";

function UserPageContainer({ isLogin, children, redirect }) {
  const navigate = useNavigate();
  const { t } = useTranslate();
  const store = useStore();
  const select = useSelector((state) => ({
    isLoading: state.user.isLoading,
    access: state.user.access,
  }));

  useInit(
    () => {
      store.actions.user.getAccess();
    },
    [isLogin],
    true
  );
  useEffect(() => {
    if (!select.isLoading && !select.access) {
      navigate(redirect);
    }
  }, [select.access, select.isLoading]);

  if (select.isLoading)
    return (
      <PageLayout head={<Enter />}>
        <Head title={t("title")}>
          <LocaleSelect />
        </Head>
        <Navigation />
      </PageLayout>
    );
  return children;
}

export default memo(UserPageContainer);
