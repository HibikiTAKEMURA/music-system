import useTitle from "@/hook/UseTitle";
import FrequencyContent from "../components/frequency/frequencyContent";
import DefaultPage from "./DefaultPage";
import { PAGE_TITLES } from "@/constants/appSettings";


const FrequencyPage = () => {
  useTitle(PAGE_TITLES.OSCILLATOR);

  return(
    <DefaultPage>
      <FrequencyContent />
    </DefaultPage>
  );
};

export default FrequencyPage;