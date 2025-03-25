export type Table_type = {
  [x: string]: any;
  id: number;
  user_name: string;
  last_name: string;
  age: number ;
  job: string ;
  education_degree: string ;
  economic_status: string;
  phone_number: number;
  address: string ;
  work_address: string ;
};

export type customer_status = {
  related_to: number;
  health_now: string | null;
  last_examination: string | null;
  is_under_care_now: string | null;
  have_surgery: string | null;
  have_blood_pressure: string | null;
  have_sugar: string | null;
  bee_hospitalization: string | null;
  have_allergy: string | null;
  used_milicent: string | null;
  description: string | null;
  export_date : string | undefined
};

export type customer_disease = {
  related_to: number;
  heart_attack: string | null;
  pacemaker: string | null;
  stroke: string | null;
  nervous_disorder: string | null;
  asthma: string | null;
  epilepsy: string | null;
  kidney_disorder: string | null;
  liver_disorder: string | null;
  addiction: string | null;
  tuberculosis: string | null;
  stomach_ulcer: string | null;
  allergy: string | null;
  aids: string | null;
  hepatitis: string | null;
  insomnia: string | null;
  cancer: string | null;
  radiotherapy: string | null;
  women_pregnancy: string | null;
};

export type update = {
  id: string;
  user_name: string;
  last_name: string;
  age: string | undefined;
  job: string | undefined;
  education_degree: string;
  economic_status: string;
  phone_number: string | undefined;
  address: string;
  work_address: string;
};



export type examination = {
  related_to : number,
  created_at : string
}

export type plane_type = {
  id : number,
  teeth_problem : string,
  teeth_number : string
  isEditing?: boolean
  related_to : number 
}

export type factor_type = {
  id: number
  teeth_problem : string,
  teeth_number : string,
  price : number | string | any,
  payment : number | string | any,
  related_to : number
  remainder : number,
  isEditing : boolean,
  date: string
}