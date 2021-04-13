interface RegisterDto {}

export interface StudentRegisterDto extends RegisterDto {
  name?: string;
  date_of_birth?: string;
  email?: string;
  phone?: string;
  school_id?: number | "";
  start_type?: "DOWN" | "UP" | "";
  profile_img_tmp?: File | null;
  certification_tmp?: File | null;
  last_lesson_id?: string | undefined;
}

export interface TeacherRegisterDto extends RegisterDto {
  name?: string;
  date_of_birth?: string;
  email?: string;
  phone?: string;
  school_id?: number | "";
  profile_img_tmp?: File | null;
  certification_tmp?: File | null;
  eijazah_tmp?: File | null;
}

export interface SchoolManagerRegisterDto extends RegisterDto {
  // school information
  school_name?: string;
  longitude?: string;
  latitude?: string;
  address?: string;
  gender?: string;

  // manager information
  manager_name?: string;
  date_of_birth?: string;
  email?: string;
  phone?: string;
  profile_img_tmp?: File | null;
}
