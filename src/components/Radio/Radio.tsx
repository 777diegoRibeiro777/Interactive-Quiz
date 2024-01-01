import { Field } from "formik";

export const Radio = ({ options, name }: Props) => {
  return (
    <div className="control">
      {options.map((option) => {
        return (
          <div key={option.value}>
            <label className="radio">
              <Field type="radio" name={name} value={option.value} />
              <span className="ml-2" dangerouslySetInnerHTML={{ __html: option.label }}></span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

interface Props {
  options: { value: string; label: string }[];
  name: string;
}