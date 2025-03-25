import { Table_type } from "@/utils/types";
import { CgClose } from "react-icons/cg";
interface props {
  close: any;
  data: Table_type | undefined;
  setData: any;
  status : boolean
}
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Search = ({ close, data, setData , status }: props) => {
  const { t } = useTranslation("global");
  const closeSearch = () => {
    close(false);
  setData([]);
  };

  return (
    <div className="fixed top-20 border w-[50%] bg-white right-[22.5%] px-5 py-3 rounded-xl">
      <div className="flex items-center w-full justify-between border-b pb-5">
        <h1>{t("search.result")}</h1>
        <button onClick={() => closeSearch()} className="cursor-pointer">
          <CgClose />
        </button>
      </div>
      {status ? (
        <h1 className="text-center my-5 text-xl">{t("search.no_data")}</h1>
      ) : (
        <table className="w-full p-5 pt-2">
          <thead className="w-full">
            <tr className="bg-main-500 w-full ">
              <th className=" py-2 text-xs px-1 text-white">
                {t("table.header.id")}
              </th>
              <th className=" py-2 text-xs px-1 text-white">
                {t("table.header.name")}
              </th>
              <th className=" py-2 text-xs px-1 text-white">
                {t("table.header.last_name")}
              </th>
              <th className=" py-2 text-xs px-1 text-white">
                {t("table.header.age")}
              </th>
              <th className=" py-2 text-xs px-1 text-white">
                {t("table.header.education_degree")}
              </th>
              <th className=" py-2 text-xs px-1 text-white">
                {t("table.header.economic_status")}
              </th>
              <th className=" py-2 text-xs px-1 text-white">
                {t("table.header.phone")}
              </th>
              <th className=" py-2 text-xs px-1 text-white">
                {t("table.header.action")}
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.map((items:Table_type, index:number) => {
              return (
                <tr key={index}>
                  <td className="py-2 px-2 text-sm text-center">{items?.id}</td>
                  <td className="py-2 px-2 text-sm text-center">
                    {items.user_name}
                  </td>
                  <td className="py-2 px-2 text-sm text-center">
                    {items.last_name}
                  </td>
                  <td className="py-2 px-2 text-sm text-center">{items.age}</td>
                  <td className="py-2 px-2 text-sm text-center">
                    {items.education_degree}
                  </td>
                  <td className="py-2 px-2 text-sm text-center">
                    {items.economic_status == "N"
                      ? t("create_customer_table.select.1")
                      : items?.economic_status == "G"
                      ? t("create_customer_table.select.2")
                      : t("create_customer_table.select.0")}
                  </td>
                  <td className="py-2 px-2 text-sm text-center">
                    0{items.phone_number}
                  </td>
                  <td className="py-2 px-2 text-sm text-center">
                    <Button
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => {
                        close(false), setData([]);
                      }}
                    >
                      <Link to={`/customer_details/${items.id}/`}>
                        {t("table.details")}
                      </Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Search;
