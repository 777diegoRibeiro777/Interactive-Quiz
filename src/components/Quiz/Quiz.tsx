import { useState } from "react";
import { Formik, Form } from "formik";
import { useGlobalProvider } from "hooks";
import { Question } from "./components";
import { View, QuizFormValues } from "types";

const initialValues: QuizFormValues = {
  answers: [],
};

export const Quiz = () => {
  const { results, onSetView, onSetUserAnswers } = useGlobalProvider();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [error, setError] = useState(false);

  return (
    <Formik initialValues={initialValues} onSubmit={(values) => {
      setError(false);
      if (values.answers.length !== activeQuestion + 1) {
        setError(true);
        return;
      }
      if (activeQuestion < results.length - 1) {
        // go to next question
        setActiveQuestion(activeQuestion + 1);
      } else {
        // submit results
        onSetUserAnswers(values.answers);
        // go to done view
        onSetView(View.Done);
      }
    }}>
      <Form>
        <p className="mb-2">
          Question #{activeQuestion + 1}/{results.length}
        </p>
        {results.map((result, index) => {
          return (
            <Question
              key={index}
              result={result}
              name={`answers[${index}]`}
              isHidden={activeQuestion !== index}
            />
          );
        })}
        {error && (
          <div className="message is-danger mt-4">
            <div className="message-body">Please select one answer</div>
          </div>
        )}
      </Form>
    </Formik>
  );
};
