import { useState } from "react";
import { Formik, Form } from "formik";
import { Select, Input } from "components";
import { useGlobalProvider } from "hooks";
import {
  QuestionAndAnswers,
  TriviaApiResponse,
  View,
  CreateQuizFormValues,
} from "types";
import { createTriviaApiUrl, shuffleArray } from "helpers";

const initialValues: CreateQuizFormValues = {
  category: "21",
  amount: 10,
  difficulty: "",
  type: "",
};

export const CreateQuiz = () => {
  const { onSetResults, onSetShowLoader, onSetView } = useGlobalProvider();
  const [error, setError] = useState("");

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          const url = createTriviaApiUrl(values);

          try {
            onSetShowLoader(true);
            const res = await fetch(url);
            const data: TriviaApiResponse = await res.json();
            if (data.response_code === 1) {
              setError("Not enough results. Please try again.");
              return;
            }
            // save results to global provider to use questions/answers in quiz
            const results: QuestionAndAnswers[] = [];
            for (let i = 0; i < data.results.length; i++) {
              const result = data.results[i];
              results.push({
                question: result.question,
                correct_answer: result.correct_answer,
                answers: shuffleArray([...result.incorrect_answers, result.correct_answer]),
              });
            }
            onSetResults(results);
            onSetView(View.Quiz);
          } catch (error) {
            console.log(error);
          } finally {
            actions.setSubmitting(false);
            onSetShowLoader(false);
          }
        }}
      >
        <Form>
          <Select
            label="Category"
            name="category"
            options={[
              { value: "21", label: "Sports" },
              { value: "22", label: "Geography" },
              { value: "27", label: "Animals" },
              { value: "28", label: "Vehicles" },
            ]}
          />
          <Input
            name="amount"
            label="Number of questions"
            type="number"
            min={5}
            step={1}
          />
          <Select
            label="Difficulty"
            name="difficulty"
            options={[
              { value: "", label: "Any difficulty" },
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
          />
          <Select
            label="Type"
            name="type"
            options={[
              { value: "", label: "Any type" },
              { value: "multiple", label: "Multiple choice" },
              { value: "boolean", label: "True/False" },
            ]}
          />
          <button type="submit" className="button is-primary is-rounded mt-4">
            Create quiz
          </button>
        </Form>
      </Formik>
      {error && (
        <div className="message is-danger mt-4">
          <div className="message-body">{error}</div>
        </div>
      )}
    </>
  );
};
