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
  "Attack Status": attackStatusSkills,
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

  testSkillCategory("Attack Status", attackStatusSkills);
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