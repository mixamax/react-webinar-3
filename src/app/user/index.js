import { memo } from "react";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Enter from "../../components/enter";
import UserInfo from "../../components/user-info";
import useSelector from "../../hooks/use-selector";

/**
 *  страница информации о юзере
 */
function User() {
  const { t } = useTranslate();
  const select = useSelector((state) => ({
    name: state.user.userName,
    phone: state.user.userPhone,
    email: state.user.userEmail,
  }));

  return (
    <PageLayout head={<Enter />}>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <UserInfo name={select.name} phone={select.phone} email={select.email} />
    </PageLayout>
  );
}

export default memo(User);
