import SkillItem from "./SkillItem";
import styles from "../page.module.css";

type SkillListProps = {
  skills: string[];
};

export default function SkillList({ skills }: SkillListProps) {
  return (
    <div className={styles.skillList}>
      {skills.map((skill) => (
        <SkillItem key={skill} skill={skill} />
      ))}
    </div>
  );
}