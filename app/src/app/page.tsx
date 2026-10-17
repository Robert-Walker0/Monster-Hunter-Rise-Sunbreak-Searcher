import styles from "./page.module.css";
import SkillList from "./components/SkillList";
import LabeledSelect from "./components/LabeledSelect";

const genderOptions = ["Male", "Female"];

const MAX_VILLAGE = 8;
const villageOptions = Array.from(
  { length: MAX_VILLAGE },
  (_, i) => `Village ${i + 1}`,
);

const rankFilterOptions = ["Low Rank", "High Rank", "Master Rank", "No Filter"];

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

export default function Home() {
  return (
    <div>
      <title>Monster Hunter Rise: Set Searcher</title>

      <h2>Hunter Info</h2>
      <p>Stuff about the user hunter</p>

      <div
        role="group"
        aria-label="Hunter Info fields"
        className={styles.hunterInfoRow}
      >
        <div>
          <label htmlFor="hunter-rank">Hunter Rank</label>
          <input id="hunter-rank" type="number" />
        </div>

        <div>
          <label htmlFor="master-rank">Master Rank</label>
          <input id="master-rank" type="number" />
        </div>

        <LabeledSelect
          id="gender"
          label="Gender"
          options={genderOptions}
        />

        <LabeledSelect
          id="village"
          label="Village"
          options={villageOptions}
        />

        <LabeledSelect
          id="rank-filter"
          label="Rank Filter"
          options={rankFilterOptions}
          defaultValue="No Filter"
        />

        <p>None Slot Weapon</p>
        <p>Limit Results: 200</p>
      </div>

      <br />

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