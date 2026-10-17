import styles from "../page.module.css";

const PLACEHOLDER_MAX_LEVEL = 5;
const levels = Array.from(
  { length: PLACEHOLDER_MAX_LEVEL + 1 },
  (_, level) => level,
);

type SkillItemProps = {
  skill: string;
};

export default function SkillItem({ skill }: SkillItemProps) {
  const id = `skill-${skill
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

  return (
    <div className={styles.skillItem}>
      <label htmlFor={id}>{skill}</label>
      <select id={id} defaultValue={0}>
        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
    </div>
  );
}