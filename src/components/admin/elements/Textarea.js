export default function Input({
  required,
  type,
  placeholder,
  id,
  value,
  onChange,
  name,
  label,
  className,
  classLabel,
  classTextArea,
}) {
  return (
    <>
      <div className={`textarea-group ${className}`}>
        <label htmlFor="" className={classLabel}>
          {label}
        </label>
        <div className=" flex items-center">
          <textarea
            name={name}
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className={`border-[.1rem] border-black/10 ${classTextArea}`}
          ></textarea>
        </div>
      </div>
    </>
  );
}
