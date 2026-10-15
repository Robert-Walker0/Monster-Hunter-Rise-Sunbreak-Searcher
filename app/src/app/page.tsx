import Image from "next/image";
import styles from "./page.module.css";

const PLACEHOLDER_MAX_LEVEL = 5;
const levels = Array.from({ length: PLACEHOLDER_MAX_LEVEL + 1 }, (_, level) => level);

const questSkills = [
  "Botanist",
  "Geologist",
  "Capture Master",
  "Carving Master",
  "Good Luck",
  "Carving Pro",
  "Spiribird's Call",
];

const itemSkills = [
  "Speed Eating",
  "Bombardier",
  "Mushroomancer",
  "Item Prolonger",
  "Wide-Range",
  "Free Meal",
];

const battleSurvivalSkills = [
  "Recovery Up",
  "Recovery Speed",
  "Blood Rite",
  "Quick Breath",
  "Divine Blessing",
  "Guts",
  "Intrepid Heart",
  "Redirection",
  "Defiance",
  "Embolden",
  "Evade Window",
  "Evade Extender",
  "Flinch Free",
  "Shock Absorber",
  "Earplugs",
  "Windproof",
  "Tremor Resistance",
  "Paralysis Resistance",
  "Sleep Resistance",
  "Stun Resistance",
  "Muck Resistance",
  "Blast Resistance",
  "Bubbly Dance",
  "Guard",
  "Guard Up",
];

const battleAttackSkills = [
  "Agitator",
  "Peak Performance",
  "Resentment",
  "Resuscitate",
  "Critical Eye",
  "Critical Boost",
  "Weakness Exploit",
  "Latent Power",
  "Maximum Might",
  "Critical Element",
  "Affinity Sliding",
  "Offensive Guard",
  "Critical Draw",
  "Counterstrike",
  "Sneak Attack",
  "Adrenaline Rush",
  "Coalescence",
  "Blood Awakening",
  "Burst",
  "Strife",
  "Frostcraft",
  "Heroics",
];

const battleSpecialSkills = [
  "Charge Master",
  "Dragon Conversion",
  "Master Mounter",
  "Partbreaker",
  "Slugger",
  "Stamina Thief",
  "Status Trigger",
  "Heaven-Sent",
  "Jump Master",
  "Leap of Faith",
  "Mind's Eye",
  "Focus",
  "Power Prolonger",
  "Horn Maestro",
  "Artillery",
  "Load Shells",
  "Punishing Draw",
  "Quick Sheathe",
  "Marathon Runner",
  "Constitution",
  "Stamina Surge",
  "Fortify",
  "Element Exploit",
  "Buildup Boost",
  "Foray",
  "Hunger Resistance",
  "Rapid Morph",
  "Bladescale Hone",
  "Inspiration",
  "Diversion",
  "Wirebug Whisperer",
  "Wall Runner",
  "Wall Runner (Boost)",
  "Wind Mantle",
  "Frenzied Bloodlust",
  "Bloodlust",
  "Dragonheart",
  "Hellfire Cloak",
  "Mail of Hellfire",
  "Dereliction",
  "Berserk",
  "Furious",
  "Powder Mantle",
];

const attackStatusSkills = [
  "Attack Boost",
  "Fire Attack",
  "Ice Attack",
  "Thunder Attack",
  "Water Attack",
  "Dragon Attack",
  "Paralysis Attack",
  "Poison Attack",
  "Sleep Attack",
  "Blast Attack",
];

const defenseStatsSkills = [
  "Defense Boost",
  "Fire Resistance",
  "Ice Resistance",
  "Thunder Resistance",
  "Water Resistance",
  "Dragon Resistance",
];

const blademasterSkills = [
  "Speed Sharpening",
  "Grinder (S)",
  "Handicraft",
  "Master's Touch",
  "Razor Sharp",
  "Protective Polish",
  "Bludgeoner",
];

const gunnerSkills = [
  "Ammo Up",
  "Ballistics",
  "Bow Charge Plus",
  "Normal/Rapid Up",
  "Pierce Up",
  "Rapid Fire Up",
  "Recoil Down",
  "Reload Speed",
  "Spare Shot",
  "Special Ammo Boost",
  "Spread Up",
  "Steadiness",
  "Tune-Up",
];

const setSkills = [
  "Chameleos Blessing",
  "Kushala Blessing",
  "Stormsoul",
  "Teostra Blessing",
  "Thunder Alignment",
  "Wind Alignment",
];

function SkillItem({ skill }: { skill: string }) {
  const id = `skill-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

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

function SkillList({ skills }: { skills: string[] }) {
  return (
    <div className={styles.skillList}>
      {skills.map((skill) => (
        <SkillItem key={skill} skill={skill} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <title>Monster Hunter Rise: Set Searcher</title>
      <h2>Hunter Info</h2>
      <p>Stuff about the user hunter</p>
      <p>Male or Female</p>
      <p>None Slot Weapon</p>
      <p>Limit Results: 200</p>

      <br></br>

      <h3 className={styles.categoryHeader}>Quest</h3>
      <SkillList skills={questSkills} />

      <h3 className={styles.categoryHeader}>Item</h3>
      <SkillList skills={itemSkills} />

      <h3 className={styles.categoryHeader}>Battle (Survival)</h3>
      <SkillList skills={battleSurvivalSkills} />

      <h3 className={styles.categoryHeader}>Battle (Attack)</h3>
      <SkillList skills={battleAttackSkills} />

      <h3 className={styles.categoryHeader}>Battle (Special)</h3>
      <SkillList skills={battleSpecialSkills} />

      <h3 className={styles.categoryHeader}>Attack (Status)</h3>
      <SkillList skills={attackStatusSkills} />

      <h3 className={styles.categoryHeader}>Defense Stats</h3>
      <SkillList skills={defenseStatsSkills} />

      <h3 className={styles.categoryHeader}>Blademaster Skills</h3>
      <SkillList skills={blademasterSkills} />

      <h3 className={styles.categoryHeader}>Gunner Skills</h3>
      <SkillList skills={gunnerSkills} />

      <h3 className={styles.categoryHeader}>Set Skills</h3>
      <SkillList skills={setSkills} />

      <h3 className={styles.categoryHeader}>Remaining Slots</h3>
      <ul>
        <li>Lvl 1 Slot Skill</li>
        <li>Lvl 2 Slot Skill</li>
        <li>Lvl 3 Slot Skill</li>
        <li>Lvl 4 Slot Skill</li>
      </ul>

      <button>Search</button>
      <button>More Skills</button>
      <button>Clear</button>
    </div>
  );
}
