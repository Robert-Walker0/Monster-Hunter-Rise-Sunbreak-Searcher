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