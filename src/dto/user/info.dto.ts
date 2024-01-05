export interface GlobalDataModel {
  id: number;
  title: string;
}

export interface City extends GlobalDataModel {
  province: GlobalDataModel;
}

export interface Info extends GlobalDataModel {
  name: GlobalDataModel[];
}

export interface UserInfo {
  data: {
    provinces: GlobalDataModel[];
    cities: City[];
    majors: Info[];
    grades: Info[];
    genders: Info[];
  };
}

export interface UpdateUserInfoBody {
  first_name: string;
  last_name: string;
  address: string;
  school: string;
  major_id: number;
  grade_id: number;
  gender_id: number;
  shahr_id: number;
}
