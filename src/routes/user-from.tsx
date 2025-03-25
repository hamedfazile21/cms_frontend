import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/utils/fromSchema";

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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import api from "../utils/post";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
const UserFrom = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = api.post("customer_profile/", values);
      console.log((await response).data);
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  }
  // const languages = [
  //   {
  //     label: "City Languages",
  //     options: [
  //       { label: "New York English", value: "ny_english" },
  //       { label: "Paris French", value: "paris_french" },
  //       { label: "English", value: "en" },
  //       { label: "French", value: "fr" },
  //       { label: "German", value: "de" },
  //       { label: "Spanish", value: "es" },
  //     ],
  //   },
  //   {
  //     label: "Country Languages",
  //     options: [
  //       {
  //         label: "USA English",
  //         options: [{ label: "France French", value: "france_french" }],
  //       },

  //       { label: "Japanese", value: "ja" },
  //       { label: "Korean", value: "ko" },
  //       { label: "Chinese", value: "zh" },
  //     ],
  //   },
  // ] as const;
  const language = [
    {
      label: "English",
      options: [
        {
          label: "American English",
          value: "american_english",
          subOptions: [
            {
              label: "New York Accent",
              value: "ny_accent",
              subSubOptions: [
                {
                  label: "New York City",
                  value: "ny_city",
                  subSubSubOptions: [
                    { label: "Japanese", value: "ja" },
                    { label: "Korean", value: "ko" },
                    { label: "Chinese", value: "zh" },
                  ],
                },
                { label: "Brooklyn", value: "brooklyn" },
              ], // Sub-sub accents
            },
            {
              label: "Texas Accent",
              value: "texas_accent",
              subSubOptions: [
                { label: "detal", value: "dela" },
                { label: "do", value: "as" },
              ], // Sub-sub accents
            },
          ],
        },
        {
          label: "British English",
          value: "british_english",
          subOptions: [
            {
              label: "London Accent",
              value: "london_accent",
              subSubOptions: [
                { label: "Houston", value: "ho" },
                { label: "Dallas", value: "da" },
              ],
            },
            {
              label: "Liverpool Accent",
              value: "liverpool_accent",
              subSubOptions: [
                { label: "Mamad", value: "ama" },
                { label: "lasana", value: "las" },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "French",
      options: [
        {
          label: "Parisian French",
          value: "parisian_french",
          subOptions: [
            {
              label: "Northern French",
              value: "northern_french",
              subSubOptions: [
                { label: "Lille", value: "lille" },
                { label: "Op", value: "le" },
              ],
            },
            {
              label: "Southern French",
              value: "southern_french",
              subSubOptions: [
                { label: "Toulouse", value: "toulouse" },
                { label: "Opal", value: "lile" },
              ],
            },
          ],
        },
      ],
    },
  ] as const;
  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh] font-display">
      <div className="w-1/3 border border-gray-200 px-5 py-8 rounded-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-full flex items-center gap-x-4">
              <FormField
                control={form.control}
                name="user_name"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
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
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
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
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="Age" {...field} />
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
                    <FormLabel>Job</FormLabel>
                    <FormControl>
                      <Input placeholder="Job" {...field} />
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
                    <FormLabel>Education Degree</FormLabel>
                    <FormControl>
                      <Input placeholder="Education Degree" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="economic_status"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-1/2">
                    <FormLabel>Language</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? language
                                  .flatMap((group) =>
                                    group.options.flatMap((accent) =>
                                      accent.subOptions.flatMap(
                                        (subAccent: any) =>
                                          subAccent.subSubOptions
                                      )
                                    )
                                  )
                                  .find(
                                    (option: any) =>
                                      option.value === field.value
                                  )?.label
                              : "Select language"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search language..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No language found.</CommandEmpty>

                            {/* Loop through Categories (Languages) */}
                            {language.map((category) => (
                              <CommandGroup
                                key={category.label}
                                heading={category.label}
                                className=""
                              >
                                {/* Loop through Accents inside a Category */}
                                {category.options.map((accent) => (
                                  <CommandGroup
                                    key={accent.value}
                                    heading={accent.label}
                                    className="pl-4"
                                  >
                                    {/* Loop through Sub-Accents inside an Accent */}
                                    {accent.subOptions.map((subAccent) => (
                                      <CommandGroup
                                        key={subAccent.value}
                                        heading={subAccent.label}
                                        className="pl-6"
                                      >
                                        {/* Loop through Sub-Sub-Accents (Cities) inside a Sub-Accent */}
                                        {subAccent.subSubOptions.map(
                                          (subSubAccent) => (
                                            <CommandItem
                                              key={subSubAccent.value}
                                              value={subSubAccent.label}
                                              onSelect={() =>
                                                field.onChange(
                                                  subSubAccent.value
                                                )
                                              } // Update form state with the selected value
                                            >
                                              {subSubAccent.label}
                                              <Check
                                                className={cn(
                                                  "ml-auto",
                                                  subSubAccent.value ===
                                                    field.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                                )}
                                              />
                                            </CommandItem>
                                          )
                                        )}
                                      </CommandGroup>
                                    ))}
                                  </CommandGroup>
                                ))}
                              </CommandGroup>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} />
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
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
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
                    <FormLabel>Work Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Work Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="bg-main-700 text-white" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserFrom;
