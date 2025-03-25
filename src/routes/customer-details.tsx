import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { customer_status, customer_disease, Table_type } from "@/utils/types";
import { Button } from "@/components/ui/button";
import api from "../utils/post";
import { Link } from "react-router-dom";
import CustomerStatusDetails from "@/components/customer-status-details";
import CustomerDiseaseDetails from "@/components/customer-dieases-details";
import DeleteCustomer from "@/components/delete-customer";
import { useTranslation } from "react-i18next";
const CustomerDetails = () => {
  const [customer_profile, set_customer_profile] = useState<Table_type>();
  const [customer_status, set_customer_status] = useState<customer_status>();
  const [customer_disease, set_customer_diseases] =
    useState<customer_disease>();
  const [examination, setExamination] = useState<Date | any>();
  const [is_open, set_is_open] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    const get_profile = async () => {
      try {
        const response = await api.get(`customer_profile_id/${id}/`);

        set_customer_profile(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const get_status = async () => {
      try {
        const response = await api.get(`customer_status_id/${id}/`);
        set_customer_status(response.data);
        const epoch_date = new Date(response.data.last_examination);
        setExamination(epoch_date);
      } catch (error) {
        console.log(error);
      }
    };
    const get_diseases = async () => {
      try {
        const response = await api.get(`customer_diseases_id/${id}/`);
        set_customer_diseases(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    get_profile();
    get_status();
    get_diseases();
  }, []);
  const { t } = useTranslation("global");

  return (
    <div className="w-full px-10 mt-5">
      <div className="rounded-t-2xl border-t-2 border-x-2 border-main-400 p-5 ">
        <div className="">
          <div className="w-full flex items-center justify-between">
            <h1 className="mb-5 text-xl text-main-800 ">
              {t("customer_details.headers.customer_details")}
            </h1>
          </div>
          <div className="w-full ">
            <table className="w-full p-5">
              <thead className="w-full">
                <tr className="bg-main-500 w-full ">
                  <th className=" py-2 text-white text-sm">
                    {t("table.header.id")}
                  </th>
                  <th className=" py-2 text-white text-sm">
                    {t("table.header.name")}
                  </th>
                  <th className=" py-2 text-white text-sm">
                    {t("table.header.last_name")}
                  </th>
                  <th className=" py-2 text-white text-sm">
                    {t("table.header.age")}
                  </th>
                  <th className=" py-2 text-white text-sm">
                    {t("table.header.job")}
                  </th>
                  <th className=" py-2 text-white text-sm">
                    {t("table.header.education_degree")}
                  </th>
                  <th className=" py-2 text-white text-sm">
                    {t("table.header.economic_status")}
                  </th>
                  <th className=" py-2 text-white text-sm">
                    {t("table.header.phone")}
                  </th>
                  <th className=" py-2 text-white text-sm">
                    {t("table.header.address")}
                  </th>
                  <th className=" py-2 text-white text-sm">
                    {t("table.header.work_address")}
                  </th>
                  <th className=" py-2 text-white text-sm">
                    {t("table.header.action")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1 text-sm border px-2 text-center">
                    {customer_profile?.id}
                  </td>
                  <td className="py-1 text-sm border px-2 text-center">
                    {customer_profile?.user_name}
                  </td>
                  <td className="py-1 text-sm border px-2 text-center">
                    {customer_profile?.last_name}
                  </td>
                  <td className="py-1 text-sm border px-2 text-center">
                    {customer_profile?.age}
                  </td>
                  <td className="py-1 text-sm border px-2 text-center">
                    {customer_profile?.job}
                  </td>
                  <td className="py-1 text-sm border px-2 text-center">
                    {customer_profile?.education_degree}
                  </td>
                  <td className="py-1 text-sm border px-2 text-center">
                    {customer_profile?.economic_status == "G"
                      ? t("create_customer_table.select.0")
                      : customer_profile?.economic_status == "B"
                      ? t("create_customer_table.select.2")
                      : t("create_customer_table.select.1")}
                  </td>
                  <td className="py-1 text-sm border px-2 text-center">
                    0{customer_profile?.phone_number}
                  </td>
                  <td className="py-1 text-sm border px-2 text-center">
                    {customer_profile?.address}
                  </td>
                  <td className="py-1 text-sm border px-2 text-center">
                    {customer_profile?.work_address}
                  </td>
                  <td className="py-1 text-sm border px-2 text-center">
                    <Link
                      className="underline"
                      onClick={() => {
                        localStorage.setItem(
                          "user",
                          JSON.stringify(customer_profile)
                        );
                      }}
                      to={`/create_customer/${customer_profile?.id}/update/`}
                    >
                      {t("customer_details.buttons.edit")}
                    </Link>
                    <Button
                      variant={"outline"}
                      onClick={() => set_is_open(true)}
                      className="underline mx-2 border-none shadow-none p-0 hover:bg-white cursor-pointer"
                    >
                      {t("customer_details.buttons.delete")}
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className=" my-10">
          <h1 className="mb-5 text-xl text-main-800 ">
            {t("customer_details.headers.customer_status")}
          </h1>
          <CustomerStatusDetails data={customer_status} date={examination} />
        </div>
        <div className="">
          <h1 className="mb-5 text-xl text-main-800 ">
            {t("customer_details.headers.customer_disease")}
          </h1>
          <CustomerDiseaseDetails data={customer_disease} />
        </div>
        <hr className="mt-8" />
        <div className="mt-5 w-full">
          <Button className="float-end bg-main-500">
            <Link to={`/customer_factor/${id}/`}>
              {t("customer_details.link")}
            </Link>
          </Button>
        </div>
      </div>
      {is_open && <DeleteCustomer open={set_is_open} />}
    </div>
  );
};

export default CustomerDetails;
