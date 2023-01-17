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
        <div
          after={after}
          className="flex items-center relative border-[.16rem] border-black/10 rounded-[.4rem] mt-[.8rem] after:content-[attr(after)] after:font-light after:text-black after:text-[1.6rem]"
        >
          <input
            name={name}
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className={classInput}
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
