import React from "react";
import { customer_disease } from "@/utils/types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
interface props {
  data: customer_disease | undefined;
}
const CustomerDiseaseDetails = ({ data }: props) => {
  const { t } = useTranslation("global");
  return (
    <table className="w-full p-5">
      <thead className="w-full">
        <tr className="bg-main-500 w-full ">
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.heart_attack")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.pacemaker")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.stroke")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.nervous_disorder")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.asthma")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.epilepsy")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.kidney_disorder")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.liver_disorder")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.addiction")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.tuberculosis")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.stomach_ulcer")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.allergy")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.aids")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.hepatitis")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.insomnia")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.cancer")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.radiotherapy")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("customer_dieses.table.pregnancy")}
          </th>
          <th className=" py-2 text-xs border text-white">
            {t("table.header.action")}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.heart_attack == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.pacemaker == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.stroke == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.nervous_disorder == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.asthma == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.epilepsy == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.kidney_disorder == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.liver_disorder == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.addiction == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.tuberculosis == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.stomach_ulcer == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.allergy == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.aids == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.hepatitis == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.insomnia == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.cancer == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.radiotherapy == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            {data?.women_pregnancy == "NO" ? "No" : "Yes"}
          </td>
          <td className="py-1 text-sm border px-2 text-center">
            <Link
              onClick={() =>
                localStorage.setItem("details_diseases", JSON.stringify(data))
              }
              className="underline"
              to={`/create_customer_diseases/${data?.related_to}/update/`}
            >
              {t("customer_details.buttons.edit")}
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CustomerDiseaseDetails;
