import { useAuthRedirect } from "../../../hooks/useAuthRedirect";
import Header from "../../organisms/Header";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  useAuthRedirect(true);

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
