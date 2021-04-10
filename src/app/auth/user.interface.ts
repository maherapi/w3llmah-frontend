export type UserRole = "Admin" | "Manager" | "Teacher" | "Student" | null;

export interface IUser {
    name: string;
    username: string;
    role: UserRole;
}