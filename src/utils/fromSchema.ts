import { z } from "zod";

export const formSchema = z.object({
  user_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  age: z.string().min(1, { message: "Can Not Be Empty ..." }),
  job: z.string().optional(),
  education_degree: z.string(),
  economic_status: z.string(),
  phone_number: z
    .string()
    .min(10, { message: "Phone Number Should Be 10 Carecter" })
    .max(10),
  address: z.string().optional(),
  work_address: z.string().optional(),
});

export const statusFromSchema = z.object({
  related_to: z.string(),
  health_now: z.string(),
  last_examination: z.date().optional(),
  is_under_care_now: z.string().optional(),
  have_surgery: z.string().optional(),
  have_blood_pressure: z.string().optional(),
  have_sugar: z.string().optional(),
  bee_hospitalization: z.string().optional(),
  have_allergy: z.string().optional(),
  used_milicent: z.string().optional(),
  description: z.string().min(2),
});

export const diseasesFromSchema = z.object({
  related_to: z.string(),
  heart_attack: z.string().optional(),
  pacemaker: z.string().optional(),
  stroke: z.string().optional(),
  nervous_disorder: z.string().optional(),
  asthma: z.string().optional(),
  epilepsy: z.string().optional(),
  kidney_disorder: z.string().optional(),
  liver_disorder: z.string().optional(),
  addiction: z.string().optional(),
  tuberculosis: z.string().optional(),
  stomach_ulcer: z.string().optional(),
  allergy: z.string().optional(),
  aids: z.string().optional(),
  hepatitis: z.string().optional(),
  insomnia: z.string().optional(),
  cancer: z.string().optional(),
  radiotherapy: z.string().optional(),
  women_pregnancy: z.string(),
});
