export type User = {
    user_id: number | null;
    user_name: string | null;
    is_authenticated: boolean;
    is_admin: boolean;
    access_token: string | null;
  }
  


export type Employee = {
    user_id: number | null;
    user_name: string | null;
    xp: number;
    level_id: number;
  }

export type Achievement = {
  name: string;
  description: string;
  code: string;
  unlocked?: boolean;
}