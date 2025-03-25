import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {  z } from "zod";
import { statusFromSchema } from "@/utils/fromSchema";
import api from "../utils/post";
import { Button } from "@/components/ui/button";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Bounce, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
// import { format } from "util";
const CreateCustomerStatus = () => {
  const { id, method } = useParams();

  const getFromStorage = (localStorage.getItem("details_status") as string) ?? "";
  // const getFromStorage = localStorage.getItem("details_status");
  const data = JSON.parse(getFromStorage) as any;
  const date = localStorage.getItem("epoch_date") as any;
  const dateObject = new Date(date);
  const { t } = useTranslation("global");

  const form = useForm<z.infer<typeof statusFromSchema>>({
    resolver: zodResolver(statusFromSchema),
    defaultValues: {
      related_to: id,
      bee_hospitalization: data == undefined ? "NO" : data.bee_hospitalization,
      description: data == undefined ? "NO" : data.description,
      have_allergy: data == undefined ? "NO" : data.have_allergy,
      have_blood_pressure: data == undefined ? "NO" : data.have_blood_pressure,
      have_sugar: data == undefined ? "NO" : data.have_sugar,
      have_surgery: data == undefined ? "NO" : data.have_surgery,
      health_now: data == undefined ? "NH" : data.health_now,
      is_under_care_now: data == undefined ? "NO" : data.is_under_care_now,
      last_examination: data == undefined ? undefined : dateObject,
      used_milicent: data == undefined ? "NO" : data.used_milicent,
    },
  });

  let navigate = useNavigate();
  async function onSubmit(values: z.infer<typeof statusFromSchema>) {
    try {
      if (method == "create") {
        const response = api.post("customer_status/", values);
        navigate(
          `/create_customer_diseases/${
            (await response).data.related_to
          }/create/`
        );
      } else {
        await api.put(`customer_status_id/${id}/`, values);
        localStorage.removeItem("details_status");
        toast.success(t("toasts.success_create"), {
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
          {t("customer_status.header")}
        </h1>
        <Form {...form}>
          <FormField
            control={form.control}
            name="related_to"
            render={({ field }) => (
              <Input hidden placeholder="Username" {...field} />
            )}
          />
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-full flex items-center gap-x-4">
              <FormField
                control={form.control}
                name="health_now"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>
                      {t("customer_status.inputs.heath_now")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_status.inputs.heath_now")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GH">
                          {t("create_customer_table.select.0")}
                        </SelectItem>
                        <SelectItem value="NH">
                          {t("create_customer_table.select.1")}
                        </SelectItem>
                        <SelectItem value="BH">
                          {t("create_customer_table.select.2")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="have_surgery"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>{t("customer_status.inputs.surgery")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_status.inputs.surgery")}
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
                name="have_blood_pressure"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>{t("customer_status.inputs.blood")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_status.inputs.blood")}
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
                name="last_examination"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-1/3">
                    <FormLabel>
                      {t("customer_status.inputs.examination")}
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="w-full">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{t("customer_status.date")}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className=" p-0 w-full" align="start">
                        <Calendar
                          mode="single"
                          // selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_under_care_now"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>
                      {t("customer_status.inputs.under_cera")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_status.inputs.under_cera")}
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
                name="have_sugar"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>{t("customer_status.inputs.sugar")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_status.inputs.sugar")}
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
                name="bee_hospitalization"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>
                      {t("customer_status.inputs.hospitalize")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t(
                              "customer_status.inputs.hospitalize"
                            )}
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
                name="have_allergy"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>{t("customer_status.inputs.allargy")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("customer_status.inputs.allargy")}
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
                name="used_milicent"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>
                      {t("customer_status.inputs.use_midicnt")}
                    </FormLabel>
                    <FormControl className="w-full">
                      <Textarea
                        placeholder={t("customer_status.inputs.use_midicnt")}
                        className="resize-none w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>
                      {t("customer_status.inputs.description")}
                    </FormLabel>
                    <FormControl className="w-full">
                      <Textarea
                        placeholder={t("customer_status.inputs.description")}
                        className="resize-none w-full"
                        {...field}
                      />
                    </FormControl>
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

export default CreateCustomerStatus;
