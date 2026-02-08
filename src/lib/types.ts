export interface User {
  id: string;
  phone: string;
  first_name: string;
  age: number;
  gender: string;
  city: string;
  role: "single" | "matchmaker" | "candidate";
}

export interface SingleProfile {
  user_id: string;
  interested_in: string;
  age_range_min: number;
  age_range_max: number;
  preference_tags: string[];
  dealbreaker_tags: string[];
}

export interface MatchmakerAssignment {
  id: string;
  single_id: string;
  matchmaker_name: string;
  matchmaker_phone: string;
  personal_note: string | null;
  status: "notified" | "opened" | "looking" | "found_someone";
  invite_token: string;
  matchmaker_user_id: string | null;
}

export interface Introduction {
  id: string;
  assignment_id: string;
  single_id: string;
  matchmaker_name: string;
  candidate_name: string;
  candidate_phone: string;
  candidate_description: string;
  reason_why_great: string;
  your_description: string;
  single_status: "pending" | "accepted" | "declined";
  candidate_status: "pending" | "accepted" | "declined";
  overall_status:
    | "pending"
    | "single_accepted"
    | "candidate_accepted"
    | "mutual_match"
    | "declined";
  candidate_invite_token: string;
}

export interface Connection {
  id: string;
  introduction_id: string;
  single_id: string;
  match_name: string;
  match_phone: string;
  matchmaker_name: string;
}

export interface Gamification {
  user_id: string;
  points: number;
  badges: string[];
  intros_made: number;
  mutual_matches: number;
}

export interface MatchmakerData {
  assignment: MatchmakerAssignment;
  single: {
    first_name: string;
    age: number;
    gender: string;
    city: string;
  };
  profile: SingleProfile;
}

export interface CandidateData {
  introduction: Introduction;
  matchmaker_name: string;
}
