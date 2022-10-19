import { useState } from "react";

const useTabHandler = () => {
  const flag = true;
  const [tab1, setTab1] = useState(true);
  const [tab2, setTab2] = useState(false);
  const [tab3, setTab3] = useState(false);

  const tabFirstHandler = () => {
    console.log("First Tab Clicked");

    setTab1(true);
    setTab2(false);
    setTab3(false);
  };

  const tabSecondHandler = () => {
    console.log("Second Tab Clicked");

    setTab2(true);
    setTab1(false);
    setTab3(false);
  };

  const tabThirdHandler = () => {
    console.log("Third Tab Clicked");
    setTab3(true);
    setTab1(false);
    setTab2(false);
  };
  return {
    tabFirstHandler,
    tabSecondHandler,
    tabThirdHandler,
    tab1,
    tab2,
    tab3,
  };
};

export default useTabHandler;
