import { memo } from "react";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Enter from "../../components/enter";
import UserInfo from "../../components/user-info";

/**
 *  страница информации о юзере
 */
function User() {
  const { t } = useTranslate();

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
