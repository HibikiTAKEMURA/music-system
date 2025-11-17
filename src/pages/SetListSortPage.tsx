import useTitle from "@/hook/UseTitle";
import DefaultPage from "./DefaultPage";
import { PAGE_TITLES } from "@/constants/appSettings";
import SetListSortContent from "@/components/setListSort/SetListSortContent/SetListSortContent";


const SetListSortPage = () => {
  useTitle(PAGE_TITLES.SET_LIST_SORT);
  
  return(
    <DefaultPage>
      <SetListSortContent />
    </DefaultPage>
  );
};

export default SetListSortPage;