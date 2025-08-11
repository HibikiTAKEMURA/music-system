import useTitle from "@/hook/UseTitle";
import ScoreContent from "../components/score/ScoreContent";
import DefaultPage from "./DefaultPage";
import { PAGE_TITLES } from "@/constants/appSettings";


const ScalePage = () => {
  useTitle(PAGE_TITLES.SCORE);
  
  return(
    <DefaultPage>
      <ScoreContent />
    </DefaultPage>
  );
};

export default ScalePage;