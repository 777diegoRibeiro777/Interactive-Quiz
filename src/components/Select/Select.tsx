import { Field } from "formik";

export const Select = ({ label, name, options }: Props) => {
  return (
    <div className="mb-2">
      <label htmlFor={name} className="is-block mb-1">
        {label}
      </label>
      <div className="select is-fullwidth is-rounded">
        <Field id={name} name={name} as="select">
          {options.map((option, index) => (
            <option key={`${index}_${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      </div>
    </div>
  );
};

interface Props {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}
