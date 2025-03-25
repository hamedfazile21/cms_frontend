import  { useEffect, useState } from "react";
import api from "../utils/post";
import { Table_type } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Pagination from "@/components/pagination";
import { Bounce, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const Home = () => {
  const { t } = useTranslation("global");
  const [data, setData] = useState<Table_type[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState(14);

  useEffect(() => {
    const get_users = async () => {
      try {
        const response = await api.get("customer_profile/");
        setData(response.data);
      } catch (error) {
        toast.warn(t("toasts.error"), {
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
      }
    };
    get_users();
  }, []);
  const addToLocalStorage = (data:Table_type) =>{
    localStorage.setItem('print_data' , JSON.stringify(data))
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  return (
    <div className="flex flex-col px-10 mt-5 w-full">
      <div className="shadow-2xl rounded-xl w-full">
        <table className="w-full p-5">
          <thead className="w-full">
            <tr className="bg-main-500 w-full ">
              <th className=" py-3 text-white">{t("table.header.id")}</th>
              <th className=" py-3 text-white">{t("table.header.name")}</th>
              <th className=" py-3 text-white">
                {t("table.header.last_name")}
              </th>
              <th className=" py-3 text-white">{t("table.header.age")}</th>
              <th className=" py-3 text-white">{t("table.header.job")}</th>
              <th className=" py-3 text-white">
                {t("table.header.education_degree")}
              </th>
              <th className=" py-3 text-white">
                {t("table.header.economic_status")}
              </th>
              <th className=" py-3 text-white">{t("table.header.phone")}</th>
              <th className=" py-3 text-white">{t("table.header.address")}</th>
              <th className=" py-3 text-white">
                {t("table.header.work_address")}
              </th>
              <th className=" py-3 text-white">{t("table.header.action")}</th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((items: Table_type, index: number) => {
              return (
                <tr
                  key={index}
                  className={`${(index + 1) % 2 === 0 ? "bg-main-50" : ""}`}
                >
                  <td className="py-2 px-4 text-center">{items.id}</td>
                  <td className="py-2 px-4 text-center">{items.user_name}</td>
                  <td className="py-2 px-4 text-center">{items.last_name}</td>
                  <td className="py-2 px-4 text-center">{items.age}</td>
                  <td className="py-2 px-4 text-center">{items.job}</td>
                  <td className="py-2 px-4 text-center">
                    {items.education_degree}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {items.economic_status == "N"
                      ? t("create_customer_table.select.1")
                      : items.economic_status == "G"
                      ? t("create_customer_table.select.2")
                      : t("create_customer_table.select.0")}
                  </td>
                  <td className="py-2 px-4 text-center">
                    0{items.phone_number}
                  </td>
                  <td className="py-2 px-4 text-center">{items.address}</td>
                  <td className="py-2 px-4 text-center">
                    {items.work_address}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <Button onClick={() => addToLocalStorage(items)} variant="outline" className="bg-transparent">
                      <Link to={`customer_details/${items.id}/`}>
                        {t("table.details")}
                      </Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="w-full mt-5  px-3 ">
          <Button className="float-end bg-main-500 mb-5">
            <Link to={"create_customer/0/create/"}>{t("table.button")}</Link>
          </Button>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
