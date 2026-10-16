type LabeledSelectProps = {
  id: string;
  label: string;
  options: string[];
  defaultValue?: string;
};

export default function LabeledSelect({
  id,
  label,
  options,
  defaultValue,
}: LabeledSelectProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} defaultValue={defaultValue}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}