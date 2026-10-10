import type { Classification, LeadPost } from "./jev.ts";

export const STATUSES = ["new", "useful", "dismissed", "contacted"] as const;
export type LeadStatus = (typeof STATUSES)[number];
export type FeedbackVerdict = Exclude<LeadStatus, "new">;
export type CrmLead = {
  id: string;
  post: LeadPost;
  result: Classification | null;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string | null;
  submittedAt: string | null;
  messageId: string | null;
};
export type Feedback = { id: number; verdict: FeedbackVerdict | "legacy"; reason: string; recorded_at: string };
export type FeedbackEvent = { platform: string; spaceId: string; messageId: string; text: string; targetMessageId?: string };
export type FeedbackResponse = { action: "feedback" | "clarify" | "ignore"; text?: string; leadId?: string; duplicate?: boolean };
export type Submission = { messageId: string; platform: string; spaceId: string };
