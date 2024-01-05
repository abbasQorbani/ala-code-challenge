import { City, Info } from './info.dto';

export interface User {
  id: number;
  mobile: string;
  mobile_verified_at: string;
  first_name: string;
  last_name: string;
  national_code: string;
  photo: string;
  province: string;
  city: string;
  address: string;
  school: string;
  major: Info;
  grade: Info;
  gender: Info;
  shahr: City;
}
