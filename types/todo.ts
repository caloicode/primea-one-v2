export type Todo = {
  id: string;
  task: string;
  notes: string | null;
  priority: string;
  is_checked: boolean;
  start_date: string | null;
  end_date: string | null;
  assigned_users: string[];
  created_at: string;
  user_id: string;
};

export type User = {
  id: string;
  full_name: string;
  avatar_url: string;
};
