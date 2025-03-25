import { customer_status } from "@/utils/types";
interface props {
  data: customer_status | undefined;
  date: Date;
}
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CustomerStatusDetails = ({ data, date }: props) => {
  const { t } = useTranslation("global");
  return (
    <table className="w-full p-5">
      <thead className="w-full">
        <tr className="bg-main-500 w-full ">
          <th className=" py-2 text-xs border text-white">
            {t("customer_status.table.heath_now")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_status.table.examination")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_status.table.under_cera")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_status.table.surgery")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_status.table.blood")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_status.table.surgery")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_status.table.hospitalize")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_status.table.allargy")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_status.table.use_midicnt")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_status.table.description")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("table.header.action")}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-1 border text-xs px-2 text-center">
            {data?.health_now == "NH"
              ? t("create_customer_table.select.1")
              : data?.health_now == "BH"
              ? t("create_customer_table.select.2")
              : t("create_customer_table.select.0")}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {date?.toLocaleDateString() == "12/31/1969"
              ? null
              : date?.toLocaleDateString()}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.is_under_care_now == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.have_surgery == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.have_blood_pressure == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.have_surgery == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.bee_hospitalization == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.have_allergy == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.used_milicent == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.description}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            <Link
              className="underline"
              to={`/create_customer_status/${data?.related_to}/update`}
              onClick={() => {
                localStorage.setItem("details_status", JSON.stringify(data)),
                  localStorage.setItem(
                    "epoch_date",
                    date?.toLocaleDateString()
                  );
              }}
            >
              {t("customer_details.buttons.edit")}
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CustomerStatusDetails;
