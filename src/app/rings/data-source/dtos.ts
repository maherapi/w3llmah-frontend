export interface NewRingDto {
    max_student: number;
    name: string;
    period: string;
    manager_id: number;
    school_id: number;
}

export type RingStatus = "ACTIVE" | "NONACTIVE" | null;