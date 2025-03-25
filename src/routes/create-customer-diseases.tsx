import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { diseasesFromSchema } from "../utils/fromSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { customer_disease } from "@/utils/types";
import api_factor from "@/utils/postFactor";
import { Bounce, toast } from "react-toastify";
import api from "../utils/post";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
const CreateCustomerDiseases = () => {
  const { id, method } = useParams();
  const getFromLocalStorage = localStorage.getItem("details_diseases");
  let data = undefined;
  if (method == "create") {
    data = JSON.parse<customer_disease | any>(getFromLocalStorage);
  }

  const form = useForm<z.infer<typeof diseasesFromSchema>>({
    resolver: zodResolver(diseasesFromSchema),
    defaultValues: {
      related_to: id,
      heart_attack: data == undefined ? "NO" : data.heart_attack,
      pacemaker: data == undefined ? "NO" : data.pacemaker,
      stroke: data == undefined ? "NO" : data.stroke,
      nervous_disorder: data == undefined ? "NO" : data.nervous_disorder,
      asthma: data == undefined ? "NO" : data.asthma,
      epilepsy: data == undefined ? "NO" : data.epilepsy,
      kidney_disorder: data == undefined ? "NO" : data.kidney_disorder,
      liver_disorder: data == undefined ? "NO" : data.liver_disorder,
      addiction: data == undefined ? "NO" : data.addiction,
      tuberculosis: data == undefined ? "NO" : data.tuberculosis,
      stomach_ulcer: data == undefined ? "NO" : data.stomach_ulcer,
      allergy: data == undefined ? "NO" : data.allergy,
      aids: data == undefined ? "NO" : data.aids,
      hepatitis: data == undefined ? "NO" : data.hepatitis,
      insomnia: data == undefined ? "NO" : data.insomnia,
      cancer: data == undefined ? "NO" : data.cancer,
      radiotherapy: data == undefined ? "NO" : data.radiotherapy,
      women_pregnancy: data == undefined ? "NO" : data.women_pregnancy,
    },
  });
  const navigate = useNavigate();
  const date = new Date().toISOString();
  const { t, i18n } = useTranslation("global");

  async function onSubmit(values: z.infer<typeof diseasesFromSchema>) {
    try {
      if (method == "create") {
        await api.post("customer_diseases/", values);
        await api_factor.post("create-treatment/plane/", { related_to: id });
        await api_factor.post("create-treatment/factor/", { related_to: id });
        toast.success(t("toasts.success_create"), {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate(`/customer_details/${id}/`);
      } else {
        await api.put(`customer_diseases_id/${id}/`, values);
        toast.success(t("toasts.update"), {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        localStorage.removeItem("details_diseases");
        navigate(`/customer_details/${id}/`);
      }
    } catch (error) {
      toast.warn(t("toasts.error"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }
  return (
    <div className="w-full px-10 mt-5 flex items-center justify-center">
      <div className="w-[98%] p-4 border-t-2 border-x-2 border-main-200 rounded-t-2xl">
        <h1 className="mb-5 text-3xl text-main-900 border-b pb-1">
          Fill out the box
        </h1>
        <Form {...form}>
          <FormField
            control={form.control}
            name="related_to"
            render={({ field }) => <Input hidden {...field} />}
          />
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-full flex items-center gap-x-4">
              <FormField
                control={form.control}
                name="heart_attack"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>{t("customer_dieses.heart_attack")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.heart_attack")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pacemaker"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>{t("customer_dieses.pacemaker")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.pacemaker")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stroke"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>{t("customer_dieses.stroke")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.stroke")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center gap-x-4">
              <FormField
                control={form.control}
                name="nervous_disorder"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>
                      {t("customer_dieses.nervous_disorder")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.nervous_disorder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="asthma"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>{t("customer_dieses.asthma")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.asthma")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="epilepsy"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>{t("customer_dieses.epilepsy")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.epilepsy")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center gap-x-4">
              <FormField
                control={form.control}
                name="kidney_disorder"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>
                      {t("customer_dieses.kidney_disorder")}{" "}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.kidney_disorder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="liver_disorder"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>
                      {t("customer_dieses.liver_disorder")}{" "}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.liver_disorder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addiction"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("customer_dieses.addiction")} </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.addiction")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center gap-x-4">
              <FormField
                control={form.control}
                name="tuberculosis"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("customer_dieses.tuberculosis")} </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.tuberculosis")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stomach_ulcer"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("customer_dieses.stomach_ulcer")} </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.stomach_ulcer")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allergy"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("customer_dieses.allergy")} </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.allergy")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center gap-x-4">
              <FormField
                control={form.control}
                name="aids"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("customer_dieses.aids")} </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.aids")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hepatitis"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("customer_dieses.hepatitis")} </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.hepatitis")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="insomnia"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("customer_dieses.insomnia")} </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.insomnia")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center gap-x-4">
              <FormField
                control={form.control}
                name="cancer"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("customer_dieses.cancer")} </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.cancer")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="radiotherapy"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("customer_dieses.radiotherapy")} </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.radiotherapy")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="women_pregnancy"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("customer_dieses.pregnancy")} </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_dieses.pregnancy")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO">No</SelectItem>
                        <SelectItem value="YE">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="bg-main-700 text-white" type="submit">
              {t("create_customer_table.button")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCustomerDiseases;
