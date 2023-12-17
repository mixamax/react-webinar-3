import { memo } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";

import LocaleSelect from "../../containers/locale-select";
import Enter from "../../components/enter";
import LoginForm from "../../components/login-form";
import useSelector from "../../hooks/use-selector";

/**
 *  страница авторизации
 */
function LogIn() {
  const { t } = useTranslate();
  const store = useStore();
  const select = useSelector((state) => ({
    isLogin: state.login.isLogin,
  }));

  useInit(
    () => {
      store.actions.login.setLogInState();
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
      <LoginForm />
    </PageLayout>
  );
}

export default memo(LogIn);
