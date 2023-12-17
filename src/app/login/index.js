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

/**
 *  страница авторизации
 */
function LogIn() {
  const { t } = useTranslate();

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
