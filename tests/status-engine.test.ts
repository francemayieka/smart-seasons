import { getFieldStatus, computeDaysSincePlanting } from "../lib/status-engine";
import { Status, Stage } from "@prisma/client";

describe("Status Engine", () => {
  it("computes days since planting correctly", () => {
    const plantingDate = new Date();
    plantingDate.setDate(plantingDate.getDate() - 10);
    expect(computeDaysSincePlanting(plantingDate)).toBe(10);
  });

  it("marks field as Active when within timeframe", () => {
    const field = {
      currentStage: Stage.Growing,
      plantingDate: new Date(),
    };
    const days = 20;
    const maxDays = { [Stage.Growing]: 30 };
    expect(getFieldStatus(field as any, days, maxDays)).toBe(Status.Active);
  });

  it("marks field as At Risk when exceeding timeframe", () => {
    const field = {
      currentStage: Stage.Growing,
      plantingDate: new Date(),
    };
    const days = 35;
    const maxDays = { [Stage.Growing]: 30 };
    expect(getFieldStatus(field as any, days, maxDays)).toBe(Status.AtRisk);
  });

  it("marks field as Completed when harvested", () => {
    const field = {
      currentStage: Stage.Harvested,
      plantingDate: new Date(),
    };
    const days = 100;
    const maxDays = {};
    expect(getFieldStatus(field as any, days, maxDays)).toBe(Status.Completed);
  });
});