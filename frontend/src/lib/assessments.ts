import { supabase } from "./supabase";
import type { AssessmentPayload, AssessmentResult } from "./api";

export type SavedAssessment = {
  id: string;
  risk_probability: number;
  risk_label: "Low" | "Moderate" | "High";
  top_factors: AssessmentResult["top_factors"];
  inputs: AssessmentPayload;
  created_at: string;
};

export async function saveAssessment(
  userId: string,
  inputs: AssessmentPayload,
  result: AssessmentResult
) {
  const { error } = await supabase.from("assessments").insert({
    user_id: userId,
    risk_probability: result.risk_probability,
    risk_label: result.risk_label,
    top_factors: result.top_factors,
    inputs,
  });

  if (error) throw error;
}

export async function getAssessments(userId: string): Promise<SavedAssessment[]> {
  const { data, error } = await supabase
    .from("assessments")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as SavedAssessment[];
}

export async function deleteAssessment(id: string) {
  const { error } = await supabase.from("assessments").delete().eq("id", id);
  if (error) throw error;
}
