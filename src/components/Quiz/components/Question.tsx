import { QuestionAndAnswers } from "types";
import { Radio } from "components";

export const Question = ({ result, name, isHidden }: Props) => {
  return (
    <div className={`card ${isHidden ? "is-hidden" : "is-block"}`}>
      <header className="card-header">
        <p
          className="card-header-title"
          dangerouslySetInnerHTML={{ __html: result.question }}
        ></p>
      </header>
      <div className="card-content">
        <div className="content">
          <Radio
            name={name}
            options={result.answers.map((answer) => ({
              value: answer.trim(),
              label: answer.trim(),
            }))}
          />
        </div>
      </div>
      <footer className="card-footer p-2">
        <button type="submit" className="card-footer-item button is-info">
          Submit answer
        </button>
      </footer>
    </div>
  );
};

interface Props {
  result: QuestionAndAnswers;
  name: string;
  isHidden: boolean;
}
