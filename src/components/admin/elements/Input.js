export default function Input({
  required,
  type,
  placeholder,
  id,
  value,
  onChange,
  name,
  svg,
  label,
  after,
  className,
  classLabel,
  classInput,
  classButton,
}) {
  return (
    <>
      <div className={`input-group ${className}`}>
        <label htmlFor="" className={classLabel}>
          {label}
        </label>
        <div className="flex items-center relative">
          <input
            name={name}
            type={type}
            id={id}
            after={after}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className={`border-[.16rem] border-black/10 ${classInput}`}
          />
          <button className={`invisible ${classButton}`}>
            <svg>
              <use href={`/images/sprite.svg#${svg}`} />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
