export type LeadScore = "hot" | "warm" | "cold";

export type ScoreInput = {
  lead_type?: string | null;
  budget_range?: string | null;
  timeline?: string | null;
  qualification?: Record<string, unknown> | null;
  email?: string | null;
  whatsapp?: string | null;
};

export function scoreLead(input: ScoreInput): LeadScore {
  const timeline = (input.timeline ?? "").toLowerCase();
  const budget = (input.budget_range ?? "").toLowerCase();
  const q = input.qualification ?? {};

  const urgent =
    /asap|immediate|this week|this month|urgent|1-2 week|2 week/.test(timeline) ||
    q.urgency === "high";

  const hasBudget =
    budget && !/unknown|not sure|tbd|todo/.test(budget) && budget.length > 2;

  const hasContact = Boolean(input.email || input.whatsapp);

  if (urgent && hasBudget && hasContact) return "hot";
  if (hasContact && (urgent || hasBudget)) return "warm";
  if (input.lead_type === "audit" || input.lead_type === "contact") return "warm";
  return "cold";
}
