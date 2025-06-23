import { useActivePersonalGoalQuery } from "@/hooks/personal-goals/useActivePersonalGoalQuery";
import { PersonalGoal } from "@/types";
import { createContext, useContext } from "react";
import { useCalendar } from "./calendar";

type ActivePersonalGoalContextType = {
  personalGoal: PersonalGoal | null;
  isLoading: boolean;
};

export const ActivePersonalGoalContext =
  createContext<ActivePersonalGoalContextType>(
    {} as ActivePersonalGoalContextType
  );

interface ActivePersonalGoalProviderProps {}

export const ActivePersonalGoalProvider: React.FC<
  React.PropsWithChildren<ActivePersonalGoalProviderProps>
> = ({ children }) => {
  const { currentDate } = useCalendar();
  const {
    data: personalGoal,
    isLoading,
    isError,
    error,
  } = useActivePersonalGoalQuery(currentDate);

  if (isError) {
    console.error("Error fetching active personal goal:", error);
  }

  return (
    <ActivePersonalGoalContext.Provider
      value={{ personalGoal: personalGoal || null, isLoading }}
    >
      {children}
    </ActivePersonalGoalContext.Provider>
  );
};

export const useActivePersonalGoal = () => {
  const context = useContext(ActivePersonalGoalContext);
  if (!context) {
    throw new Error(
      "useActivePersonalGoal must be used within a ActivePersonalGoalProvider"
    );
  }
  return context;
};
