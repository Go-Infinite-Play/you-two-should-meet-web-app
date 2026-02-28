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

export interface Broadcast {
  id: string;
  matchmaker_user_id: string;
  single_id: string;
  assignment_id: string;
  vibe_blurb: string;
  share_token: string;
  status: "active" | "closed";
  created_at: string;
}

export interface BroadcastLead {
  id: string;
  broadcast_id: string;
  suggester_name: string;
  suggester_phone: string | null;
  candidate_name: string;
  candidate_phone: string | null;
  relationship: string;
  pitch: string;
  status: "new" | "intro_made" | "passed";
  created_at: string;
}

export interface BroadcastData {
  broadcast: Broadcast;
  single: {
    first_name: string;
    age: number;
    city: string;
  };
  matchmaker_name: string;
}

// ─── Yenta Circle Types ───

export interface LookingPost {
  id: string;
  yenta_id: string;
  person_name: string;
  person_age: number | null;
  person_gender: string | null;
  interested_in: string | null;
  description: string;
  photo_url: string | null;
  status: 'active' | 'matched' | 'closed';
  created_at: string;
  updated_at: string;
  yenta_name?: string;
}

export interface MatchSuggestion {
  id: string;
  looking_post_id: string;
  suggesting_yenta_id: string;
  suggested_name: string;
  suggested_age: number | null;
  suggested_phone: string | null;
  why_great_match: string;
  status: 'pending' | 'approved' | 'declined';
  created_at: string;
  updated_at: string;
  suggesting_yenta_name?: string;
}

export interface Match {
  id: string;
  looking_post_id: string;
  suggestion_id: string;
  person_a_name: string;
  person_a_phone: string;
  person_a_token: string;
  person_a_status: 'pending' | 'accepted' | 'declined';
  person_b_name: string;
  person_b_phone: string;
  person_b_token: string;
  person_b_status: 'pending' | 'accepted' | 'declined';
  overall_status: 'pending' | 'matched' | 'declined';
  created_at: string;
  updated_at: string;
}
