import { dishesBySlot } from "@/constants/dishes";
import { MealsOverviewScreen } from "@/screens/MealsOverviewScreen";
import React from "react";

const App = () => {
  return <MealsOverviewScreen dishesBySlot={dishesBySlot} />;
};

export default App;
