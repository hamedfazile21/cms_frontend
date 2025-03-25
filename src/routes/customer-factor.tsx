import { useRef } from "react";
import CustomerTreatmentPlane from "@/components/customer-treatment-plane";
import SvgIcon from "../../public/assets/image/teeth";
import CustomerFactorTable from "@/components/customer-factor-table";
import { HiOutlinePrinter } from "react-icons/hi";
import { useReactToPrint } from "react-to-print";
const CustomerFactor = () => {
  const contentRef = useRef<HTMLTableElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div className="w-full px-10 mt-5 dir">
      <div className="rounded-t-2xl border-t-2 border-x-2 border-main-400 p-5 ">
        <div>
          <div className="w-full items-center justify-center">
            <SvgIcon />
          </div>
          <h1 className="text-2xl mb-5">Treatment Plane</h1>
          <CustomerTreatmentPlane />
        </div>
        <div className="mt-10">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl">Treatment Factor</h1>
            <HiOutlinePrinter onClick={() =>reactToPrintFn() } className="text-[40px] p-2 border rounded-lg cursor-pointer" />
          </div>
          <CustomerFactorTable contentRef={contentRef} />
        </div>
      </div>
    </div>
  );
};

export default CustomerFactor;
