import './Input.scss';

export default function Input({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className='field'>
      <label className='field__label' htmlFor={name}>
        {label}
      </label>
      <input
        className='field__input'
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
