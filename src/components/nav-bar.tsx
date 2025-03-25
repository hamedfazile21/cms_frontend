import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import logo from "../../public/assets/image/logo.jpg";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "@/utils/post";
import Search from "./search";
import { Table_type } from "@/utils/types";
import { Bounce, toast } from "react-toastify";
const NavBar = () => {
  const { t, i18n } = useTranslation("global");
  const [searchValue, setSearchValue] = useState<string>("");
  const [data, setData] = useState<Table_type>();
  const [search_open, set_search_open] = useState<boolean>(false);
  const [status, set_status] = useState<boolean>(true);

  const searchValueF = (e: any) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    if (i18n.language === "per") {
      document.body.style.direction = "rtl";
      document.body.style.fontFamily = "Estedad";
    } else {
      document.body.style.direction = "ltr";
      document.body.style.fontFamily = "Poppins";
    }
  }, [i18n.language]);
  const changeLang = (value: string) => {
    localStorage.setItem("lag", value);
    i18n.changeLanguage(value);
  };

  const search = () => {
    if (searchValue == "") {
      toast.warn(t("toasts.no_phone"), {
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
    } else if (searchValue.length > 10) {
      toast.warn(t("toasts.invalid_phone"), {
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
    } else if (searchValue.length < 10) {
      toast.warn(t("toasts.invalid_phone"), {
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
    } else {
      set_search_open(true);
      const get_data = async () => {
        try {
          const response = await api.get(`customer_profile/`);
          const filter = response.data.filter(
            (item: any) => item.phone_number === Number(searchValue)
          );
          if (filter.length !== 0) {
            set_status(false);
          } else {
            set_status(true);
          }

          setData(filter);
        } catch (error) {
          console.log("error");
        }
      };
      get_data();
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-between mt-3  px-10 py-2 border-b">
        <Link to={"/"} className="w-1/5">
          <img src={logo} className="w-[100px]" />
        </Link>
        <div className="w-1/2 border flex items-center gap-x-2 rounded-lg px-2">
          <IoSearchOutline className="text-gray-700 text-lg" />
          <input
            placeholder={t("navbar.search")}
            className="border-none shadow-none py-2 w-full outline-none text-sm"
            type="number"
            onChange={(e) => searchValueF(e)}
          />
          <Button onClick={() => search()} className="bg-main-500">
            {t("navbar.search")}
          </Button>
        </div>
        <div className="w-1/4 flex items-center justify-end gap-x-2">
          <Select onValueChange={changeLang}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("navbar.select")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="en">{t("navbar.lang.en")}</SelectItem>
                <SelectItem value="per">{t("navbar.lang.per")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button className="float-end bg-main-500">
            <Link to={"create_customer/0/create/"}>{t("table.button")}</Link>
          </Button>
        </div>
      </div>
      {search_open && (
        <Search
          close={set_search_open}
          data={data}
          setData={setData}
          status={status}
        />
      )}
    </>
  );
};

export default NavBar;
