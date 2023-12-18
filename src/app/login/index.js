import { memo } from "react";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import EnterContainer from "../../containers/enter-container";

/**
 *  страница авторизации
 */
function LogIn() {
  const { t } = useTranslate();

  return (
    <PageLayout head={<EnterContainer />}>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm />
    </PageLayout>
  );
}

export default memo(LogIn);
