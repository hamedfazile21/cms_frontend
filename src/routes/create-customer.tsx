import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { formSchema } from "@/utils/fromSchema";
import api from "../utils/post";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { update } from "@/utils/types";
import { useTranslation } from "react-i18next";
const CreateCustomer = () => {
  const { t, i18n } = useTranslation("global");

  const { method, id } = useParams();
  const storedUserString = localStorage.getItem("user");
  const data = JSON.parse(storedUserString) as any | update;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: method == "update" ? data.user_name : "",
      last_name: method == "update" ? data.last_name : "",
      phone_number: method == "update" ? String("0" + data.phone_number) : "",
      age: method == "update" ? String(data.age) : "",
      job: method == "update" ? data.job : "",
      address: method == "update" ? data.address : "",
      economic_status: method == "update" ? data.economic_status : "",
      work_address: method == "update" ? data.work_address : "",
      education_degree: method == "update" ? data.education_degree : "",
    },
  });
  let navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (method == "create") {
        const response = api.post("customer_profile/", values);
        navigate(`/create_customer_status/${(await response).data.id}/create/`);
      } else {
        await api.put(`customer_profile_id/${id}/`, values);
        navigate(`/customer_details/${id}/`);
        localStorage.removeItem("user");
        toast.success(t('toasts.updated'), {
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
    } catch (error) {
      toast.warn(t('toasts.error'), {
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
    <div className="w-full flex flex-col items-center px-10 mt-5">
      <div className="w-[98%] p-4 border-t-2 border-x-2 border-main-200 rounded-t-2xl">
        <h1 className="mb-5 text-3xl text-main-900 border-b pb-1">
          {t("create_customer_table.header")}
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-full flex items-center gap-x-4">
              <FormField
                control={form.control}
                name="user_name"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("table.header.name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("table.header.name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("table.header.last_name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("table.header.last_name")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center gap-x-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("table.header.age")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("table.header.age")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="job"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("table.header.job")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("table.header.job")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center gap-x-4">
              <FormField
                control={form.control}
                name="education_degree"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("table.header.education_degree")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("table.header.education_degree")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="economic_status"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("table.header.economic_status")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("table.header.economic_status")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="G">
                          {t("create_customer_table.select.0")}
                        </SelectItem>
                        <SelectItem value="N">
                          {t("create_customer_table.select.1")}
                        </SelectItem>
                        <SelectItem value="B">
                          {t("create_customer_table.select.2")}
                        </SelectItem>
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
                name="phone_number"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("table.header.phone")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("table.header.phone")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("table.header.address")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("table.header.address")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center gap-x-4">
              <FormField
                control={form.control}
                name="work_address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t("table.header.work_address")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("table.header.work_address")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="bg-main-700 text-white" type="submit">
              {t('create_customer_table.button')}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCustomer;
