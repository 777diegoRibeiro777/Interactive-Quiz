import { InputHTMLAttributes } from "react";
import { Field } from "formik";

export const Input = ({ label, name, ...props }: Props) => {
  return (
    <div className="mb-2">
      <label htmlFor={name} className="is-block mb-1">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        className="input is-rounded"
        type={props.type || "text"}
        {...props}
      />
    </div>
  );
};

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}
