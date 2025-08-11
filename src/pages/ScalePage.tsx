import ScaleContent from "@/components/scale/ScaleContent";
import { PAGE_TITLES } from "@/constants/appSettings";
import useTitle from "@/hook/UseTitle";
import DefaultPage from "@/pages/DefaultPage";


const ScalePage = () => {
  useTitle(PAGE_TITLES.SCALE);
  
  return(
    <DefaultPage>
      <ScaleContent />
    </DefaultPage>
  );
};

export default ScalePage;