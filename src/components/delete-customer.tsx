import React from "react";
import { useParams } from "react-router-dom";
import { CgDanger } from "react-icons/cg";
import { Button } from "./ui/button";
import api from "../utils/post";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
interface props {
  open: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteCustomer = ({ open }: props) => {
  const navigate = useNavigate();
  const handelDelete = async () => {
    try {
      await api.delete(`customer_profile_id/${id}/`);
      toast.success(t('toasts.deleted'), {
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
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const { id } = useParams();
  const { t } = useTranslation("global");
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(1,1,1,0.8)] flex items-center justify-center ">
      <div className="bg-white rounded-2xl w-1/4">
        <div className="flex bg-red-700 p-5 rounded-t-2xl items-center justify-center">
          <CgDanger className="text-7xl text-white" />
        </div>
        <div className="w-full flex p-5 mt-4 items-center justify-center">
          <h1 className=" font-bold text-xl">{t('customer_details.delete_massage')}</h1>
        </div>
        <div className="flex justify-end p-5 gap-x-2 w-full">
          <Button
            variant="outline"
            className="float-end cursor-pointer"
            onClick={() => open(false)}
          >
            {t("customer_details.buttons.ignore")}
          </Button>
          <Button
            variant="destructive"
            className="float-end cursor-pointer "
            onClick={() => handelDelete()}
          >
            {t("customer_details.buttons.delete")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomer;
