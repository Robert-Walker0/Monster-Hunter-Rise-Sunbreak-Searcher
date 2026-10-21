// @vitest-environment jsdom

import {
  cleanup,
  configure,
  render,
  screen,
  within,
} from "@testing-library/react";
import { describe, expect, test, beforeAll, afterAll } from "vitest";
import { computeAccessibleName } from "dom-accessibility-api";
import "@testing-library/jest-dom/vitest";
import Home from "../src/app/page";
import styles from "../src/app/page.module.css";

configure({
  getElementError: (message) => {
    const error = new Error(message?.split("\n\n")[0] ?? "");
    error.name = "TestingLibraryElementError";
    return error;
  },
});

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
  "Powder Mantle"
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
  "Offensive Guard",
  "Critical Draw",
  "Affinity Sliding",
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
  "Poison Resistance",
  "Blight Resistance",
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


const categories = {
  "Attack (Status)": attackStatusSkills,
  "Defense Stats": defenseStatsSkills,
  "Blademaster Skills": blademasterSkills,
  "Gunner Skills": gunnerSkills,
  "Set Skills": setSkills,
  "Battle (Special)": battleSpecialSkills,
  "Battle (Survival)": battleSurvivalSkills,
  "Battle (Attack)": battleAttackSkills,
  "Quest": questSkills,
  "Item": itemSkills,
};

const categorizedSkills = Object.values(categories).flat();

const expectedMaxLevels: Record<string, number> = {
  "Free Meal": 3,
  "Stun Resistance": 3,
  "Evade Window": 5,
  "Bubbly Dance": 3,
  "Evade Extender": 3,
  "Recovery Up": 3,
  "Recovery Speed": 3,
  "Blood Rite": 3,
  "Quick Breath": 1,
  "Divine Blessing": 3,
  "Poison Resistance": 3,
  "Blight Resistance": 3,
  "Guts": 3,
  "Intrepid Heart": 2,
  "Redirection": 2,
  "Defiance": 5,
  "Embolden": 3,
  "Flinch Free": 3,
  "Shock Absorber": 1,
  "Earplugs": 5,
  "Windproof": 3,
  "Tremor Resistance": 3,
  "Paralysis Resistance": 3,
  "Sleep Resistance": 3,
  "Muck Resistance": 2,
  "Blast Resistance": 3,
  "Guard": 5,
  "Guard Up": 3,
  "Attack Boost": 7,
  "Fire Attack": 5,
  "Ice Attack": 5,
  "Thunder Attack": 5,
  "Water Attack": 5,
  "Dragon Attack": 5,
  "Paralysis Attack": 3,
  "Poison Attack": 3,
  "Sleep Attack": 3,
  "Blast Attack": 3,
  "Defense Boost": 7,
  "Fire Resistance": 3,
  "Ice Resistance": 3,
  "Thunder Resistance": 3,
  "Water Resistance": 3,
  "Dragon Resistance": 3,
  "Speed Sharpening": 3,
  "Grinder (S)": 3,
  "Handicraft": 5,
  "Master's Touch": 3,
  "Razor Sharp": 3,
  "Protective Polish": 3,
  "Bludgeoner": 3,
  "Ammo Up": 3,
  "Ballistics": 3,
  "Bow Charge Plus": 1,
  "Normal/Rapid Up": 3,
  "Pierce Up": 3,
  "Rapid Fire Up": 3,
  "Recoil Down": 3,
  "Reload Speed": 3,
  "Spare Shot": 3,
  "Special Ammo Boost": 2,
  "Spread Up": 3,
  "Steadiness": 3,
  "Tune-Up": 2,
  "Chameleos Blessing": 4,
  "Kushala Blessing": 4,
  "Stormsoul": 5,
  "Teostra Blessing": 4,
  "Thunder Alignment": 5,
  "Wind Alignment": 5,
  "Charge Master": 3,
  "Dragon Conversion": 3,
  "Master Mounter": 1,
  "Partbreaker": 3,
  "Slugger": 3,
  "Stamina Thief": 3,
  "Status Trigger": 3,
  "Heaven-Sent": 3,
  "Jump Master": 1,
  "Leap of Faith": 1,
  "Mind's Eye": 3,
  "Focus": 3,
  "Power Prolonger": 3,
  "Horn Maestro": 1,
  "Artillery": 3,
  "Load Shells": 2,
  "Punishing Draw": 3,
  "Quick Sheathe": 3,
  "Marathon Runner": 3,
  "Constitution": 5,
  "Stamina Surge": 3,
  "Fortify": 1,
  "Element Exploit": 3,
  "Buildup Boost": 3,
  "Foray": 3,
  "Hunger Resistance": 3,
  "Rapid Morph": 3,
  "Bladescale Hone": 3,
  "Inspiration": 1,
  "Diversion": 1,
  "Wirebug Whisperer": 3,
  "Wall Runner": 3,
  "Wall Runner (Boost)": 1,
  "Wind Mantle": 3,
  "Frenzied Bloodlust": 3,
  "Bloodlust": 3,
  "Dragonheart": 5,
  "Hellfire Cloak": 4,
  "Mail of Hellfire": 3,
  "Dereliction": 3,
  "Berserk": 2,
  "Furious": 3,
  "Powder Mantle": 3,
  "Agitator": 5,
  "Peak Performance": 3,
  "Resentment": 5,
  "Resuscitate": 3,
  "Critical Eye": 7,
  "Critical Boost": 3,
  "Weakness Exploit": 3,
  "Latent Power": 5,
  "Maximum Might": 3,
  "Critical Element": 3,
  "Offensive Guard": 3,
  "Critical Draw": 3,
  "Affinity Sliding": 1,
  "Counterstrike": 3,
  "Sneak Attack": 3,
  "Adrenaline Rush": 3,
  "Coalescence": 3,
  "Blood Awakening": 3,
  "Burst": 3,
  "Strife": 3,
  "Frostcraft": 3,
  "Heroics": 5,
  "Botanist": 4,
  "Geologist": 3,
  "Capture Master": 1,
  "Carving Master": 1,
  "Good Luck": 3,
  "Carving Pro": 1,
  "Spiribird's Call": 1,
  "Speed Eating": 3,
  "Bombardier": 3,
  "Mushroomancer": 3,
  "Item Prolonger": 3,
  "Wide-Range": 5
};


function testSkillCategory(category: string, expectedSkills: string[]) {
  test(
    `${category} skills are displayed in individual dropdown menus in the expected category`,
    () => {
      const heading = screen.getByRole("heading", {
        level: 3,
        name: category,
        hidden: true,
      });

      expect(heading).toBeInTheDocument();

      const skillList = heading.nextElementSibling;

      const comboboxes = within(skillList as HTMLElement).getAllByRole(
        "combobox",
        { hidden: true },
      );
      const names = comboboxes.map((combobox) =>
        computeAccessibleName(combobox),
      );

      expectedSkills.forEach((skill) => {
        expect(names).toContain(skill);
      });
    },
  );
}

describe("Monster Hunter Rise: Set Searcher skill data", () => {
  test("does not contain duplicate skills", () => {
    const uniqueSkills = new Set(categorizedSkills);

    expect(uniqueSkills.size).toBe(categorizedSkills.length);
  });

  test("each skill only belongs to one category", () => {
    for (const [categoryName, skills] of Object.entries(categories)) {
      const otherCategories = Object.entries(categories).filter(
        ([otherCategoryName]) => otherCategoryName !== categoryName,
      );

      for (const skill of skills) {
        for (const [, otherSkills] of otherCategories) {
          expect(otherSkills).not.toContain(skill);
        }
      }
    }
  });
});

describe("Monster Hunter Rise: Set Searcher page", () => {
  beforeAll(() => {
    render(<Home />);
  });

  afterAll(() => {
    cleanup();
  });

  test("renders the page without errors", () => {
    expect(screen.getByText("Hunter Info")).toBeInTheDocument();
  });

  const optionLabels = (select: HTMLElement) => within(select).getAllByRole("option", { hidden: true }).map((option) => option.textContent);


  test("gender is a dropdown with Male and Female", () => {
    const gender = screen.getByRole("combobox", { name: "Gender" });

    expect(optionLabels(gender)).toEqual(["Male", "Female"]);
  });

  test("Search button is at the bottom of the page", () => {
    const search = screen.getByRole("button", { name: "Search" });
    const lastHeading = screen.getAllByRole("heading", { level: 3 }).at(-1)!;

    expect(
      lastHeading.compareDocumentPosition(search) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  test("village is a dropdown from Village 1 to Village 8", () => {
    const village = screen.getByRole("combobox", { name: "Village" });

    expect(optionLabels(village)).toEqual(
      Array.from({ length: 8 }, (_, i) => `Village ${i + 1}`),
    );
  });

  test("hunter rank and master rank are number inputs", () => {
    expect(screen.getByRole("spinbutton", { name: "Hunter Rank" })).toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: "Master Rank" })).toBeInTheDocument();
  });

  test("rank filter is a dropdown with Low, High, Master and No Filter", () => {
    const filter = screen.getByRole("combobox", { name: "Rank Filter" });

    expect(optionLabels(filter)).toEqual([
      "Low Rank",
      "High Rank",
      "Master Rank",
      "No Filter",
    ]);
  });

  const hunterInfoFields = [
    "Hunter Rank",
    "Master Rank",
    "Gender",
    "Village",
    "Rank Filter",
    "None Slot Weapon",
    "Limit Results",
  ];

  const getHunterField = (row: HTMLElement, name: string) =>
    within(row).queryByLabelText(name) ??
    within(row).getByText(new RegExp(name));

  const getHunterInfoRow = () =>
    screen.getByRole("group", { name: "Hunter Info fields", hidden: true });

  test("Hunter Info fields are all in one row with nothing else", () => {
    const row = getHunterInfoRow();

    hunterInfoFields.forEach((field) => {
      expect(getHunterField(row, field)).toBeInTheDocument();
    });
    expect(row.children).toHaveLength(hunterInfoFields.length);
  });

  test("Hunter Info fields are in the expected order", () => {
    const row = getHunterInfoRow();
    const fields = hunterInfoFields.map((field) => getHunterField(row, field));

    fields.slice(1).forEach((field, index) => {
      expect(
        fields[index].compareDocumentPosition(field) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    });
  });

  test("Hunter Info row uses its layout class", () => {
    expect(getHunterInfoRow()).toHaveClass(styles.hunterInfoRow);
  });

  describe("skill max levels", () => {
    let optionsBySkill: Map<string, (string | null)[]>;

    // Read every dropdown once, instead of querying again for each skill.
    beforeAll(() => {
      optionsBySkill = new Map(
        screen
          .getAllByRole("combobox", { hidden: true })
          .map((select) => [computeAccessibleName(select), optionLabels(select)]),
      );
    });

    test.each(Object.entries(expectedMaxLevels))(
      "%s goes up to level %i",
      (skill, maxLevel) => {
        expect(optionsBySkill.get(skill)).toEqual(
          Array.from({ length: maxLevel + 1 }, (_, level) => String(level)),
        );
      },
    );
  });

  test("should contain exactly 147 skills", () => {
    expect(Object.keys(expectedMaxLevels)).toHaveLength(147);
  });

  testSkillCategory("Attack (Status)", attackStatusSkills);
  testSkillCategory("Defense Stats", defenseStatsSkills);
  testSkillCategory("Blademaster Skills", blademasterSkills);
  testSkillCategory("Gunner Skills", gunnerSkills);
  testSkillCategory("Set Skills", setSkills);
  testSkillCategory("Battle (Special)", battleSpecialSkills);
  testSkillCategory("Battle (Survival)", battleSurvivalSkills);
  testSkillCategory("Battle (Attack)", battleAttackSkills);
  testSkillCategory("Quest", questSkills);
  testSkillCategory("Item", itemSkills);
});