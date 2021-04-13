export type UserStatus = "ACTIVE" | "NONACTIVE" | "VERIFIED" | "UNVERIFIED" | "DELETED" | null;

export type OrderType = "MOVE_STUDENT" | "REMOVE_STUDENT" | "ADD_STUDENT" | "ADD_TEACHER" | "ADD_MANAGER" | null;
export type OrderState = "NEW" | "IN_PROGRESS" | "ACCEPTED" | "REFUSED" | "CANCELED" | null;
export type OrderStatus = "ACTIVE" | "NONACTIVE" | "DELETED" | null;