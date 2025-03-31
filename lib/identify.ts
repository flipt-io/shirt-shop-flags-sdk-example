import { Identify } from "flags";
import { dedupe } from "flags/next";
import { getStableId } from "./get-stable-id";

export type EvaluationContext = {
  id?: string;
};

export const identify = dedupe(async () => {
  const id = await getStableId();

  return { id: id.value };
}) satisfies Identify<EvaluationContext>;
