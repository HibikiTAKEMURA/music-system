import IrealContent from "@/components/ireal/IrealContent/IrealContent";
import { PAGE_TITLES } from "@/constants/appSettings";
import useTitle from "@/hook/UseTitle";
import DefaultPage from "@/pages/DefaultPage";


const IrealPage = () => {
  useTitle(PAGE_TITLES.IREAL);

  return(
    <DefaultPage>
      <IrealContent />
    </DefaultPage>
  );
};

export default IrealPage;