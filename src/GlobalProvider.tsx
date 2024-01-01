import { ReactNode, createContext, useState } from "react";
import { QuestionAndAnswers, View } from "types";

interface GlobalContextProps {
  results: QuestionAndAnswers[];
  onSetResults: (results: QuestionAndAnswers[]) => void;
  view: View;
  onSetView: (view: View) => void;
  showLoader: boolean;
  onSetShowLoader: (value: boolean) => void;
  userAnswers: string[];
  onSetUserAnswers: (value: string[]) => void;
}

export const GlobalContext = createContext<GlobalContextProps>(undefined!);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<QuestionAndAnswers[]>([]);
  const [view, setView] = useState<View>(View.Create);
  const [showLoader, setShowLoader] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const onSetResults = (resultsArr: QuestionAndAnswers[]) => {
    setResults(resultsArr);
  };

  const onSetView = (newView: View) => {
    setView(newView);
  };

  const onSetShowLoader = (value: boolean) => {
    setShowLoader(value);
  };

  const onSetUserAnswers = (value: string[]) => {
    setUserAnswers(value);
  };

  return (
    <GlobalContext.Provider
      value={{
        results,
        onSetResults,
        view,
        onSetView,
        showLoader,
        onSetShowLoader,
        userAnswers,
        onSetUserAnswers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
