import { useMemo } from "react";
import { useGlobalProvider } from "hooks";
import { View } from "types";

export const Results = () => {
  const { userAnswers, results, onSetView } = useGlobalProvider();

  const correctAnswers = useMemo(() => {
    const correctAnswersArr = results.map((result) => result.correct_answer.trim());
    return userAnswers.reduce((previous, current, index) => {
      return correctAnswersArr[index] === current.trim() ? previous + 1 : previous;
    }, 0);
  }, [userAnswers, results]);

  return (
    <div>
      <h1 className="is-size-4 mb-4">Your results: {`${correctAnswers}/${results.length}`}</h1>
      {results.map((result, index) => {
        const isCorrect = result.correct_answer.trim() === userAnswers[index];

        return (
          <article className={`message ${isCorrect ? 'is-success' : 'is-danger'} mb-4`} key={index}>
            <div className="message-header">
              <p dangerouslySetInnerHTML={{ __html: result.question }} />
            </div>
            <div className="message-body">
              <p>Your answer: {userAnswers[index]}</p>
              {!isCorrect && <p>Correct answer: {result.correct_answer}</p>}
            </div>
          </article>
        );
      })}
      <div className="is-flex is-align-items-center is-justify-content-center py-3">
        <button type="button" className="button mx-2" onClick={() => onSetView(View.Quiz)}>Start again</button>
        <button type="button" className="button mx-2" onClick={() => onSetView(View.Create)}>New quiz</button>
      </div>
    </div>
  );
};