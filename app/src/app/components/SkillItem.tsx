import styles from "../page.module.css";
import { maxSkillLevels } from "../data/skills_data";

type SkillItemProps = {
  skill: string;
};

export default function SkillItem({ skill }: SkillItemProps) {
  const id = `skill-${skill
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

  const maxLevel = maxSkillLevels[skill] ?? 0;
  const levels = Array.from({ length: maxLevel + 1 }, (_, level) => level);

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