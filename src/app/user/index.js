import { memo } from "react";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Enter from "../../components/enter";
import UserInfo from "../../components/user-info";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";

/**
 *  страница информации о юзере
 */
function User() {
  const { t } = useTranslate();

  const store = useStore();
  const select = useSelector((state) => ({
    isLogin: state.login.isLogin,
  }));

  useInit(
    () => {
      store.actions.login.setLogInState();
      store.actions.user.getAccess();
    },
    [select.isLogin],
    true
  );

  return (
    <PageLayout head={<Enter />}>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <UserInfo />
    </PageLayout>
  );
}

export default memo(User);
