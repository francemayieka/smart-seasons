import { Stage, Status, Field } from "@prisma/client";

export function getFieldStatus(field: Field, daysSincePlanting: number, maxStageDays: Record<Stage, number>) {
  if (field.currentStage === Stage.Harvested) {
    return Status.Completed;
  }

  const allowable = maxStageDays[field.currentStage] ?? 0;
  if (daysSincePlanting > allowable) {
    return Status.AtRisk;
  }

  return Status.Active;
}

export function computeDaysSincePlanting(plantingDate: Date) {
  const diffMs = Date.now() - plantingDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
