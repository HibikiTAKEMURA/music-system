
import ChordContent from "@/components/chord/ChordContent/ChordContent";
import { PAGE_TITLES } from "@/constants/appSettings";
import useTitle from "@/hook/UseTitle";
import DefaultPage from "@/pages/DefaultPage";


const ChordPage = () => {
  useTitle(PAGE_TITLES.CHORD);
  
  return(
    <DefaultPage>
      <ChordContent />
    </DefaultPage>
  );
};

export default ChordPage;