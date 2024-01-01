import { useMemo } from "react";
import { useGlobalProvider } from "hooks";
import { CreateQuiz, Loader, Quiz, Results } from "components";
import { View } from "types";

function App() {
  const { showLoader, view } = useGlobalProvider();

  const renderView = useMemo(() => {
    switch (view) {
      case View.Quiz:
        return <Quiz />;
      case View.Done:
        return <Results />;
      default:
        return <CreateQuiz />;
    }
  }, [view]);

  return (
    <>
      <div className="container is-max-desktop py-4">
        <h1 className="title has-text-centered">
          Interactive Quiz
        </h1>
        <div className="box">
        {renderView}
        </div>
      </div>
      {showLoader && <Loader />}
    </>
  );
}

export default App;
