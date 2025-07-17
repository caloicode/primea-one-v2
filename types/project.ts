export type Project = {
  id: string;
  project_code: string;
  project_name: string;
  project_title?: string;
  location?: string;
  client?: string;
  status?: string;
  pct: number;
  drive_link?: string;
  timeline_link?: string;
  notes?: string;
  assigned_to?: string[]; // UUIDs
  created_at?: string;
};
