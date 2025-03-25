import api from "@/utils/postFactor";
import { useEffect, useState } from "react";
import { factor_type } from "@/utils/types";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
interface props {
  contentRef: any;
}
const CustomerFactorTable = ({ contentRef }: props) => {
  const [factor_data, set_factor_Data] = useState<factor_type[]>([]);
  const { id } = useParams();
  const [total_number, set_total_number] = useState<number>(0);
  const [reminder_number, set_reminder_number] = useState<number>(0);
  useEffect(() => {
    const get_data = async () => {
      try {
        const response = await api.get(`customer-treatment/${id}/`);
        const addEditingMode = response.data.factor.map(
          (items: factor_type) => ({
            ...items,
            isEditing: false,
          })
        );
        set_factor_Data(addEditingMode);
      } catch (error) {}
    };
    get_data();
  }, []);

  const editItems = (row_id: number) => {
    set_factor_Data((prev) =>
      prev.map((items) =>
        items.id === row_id ? { ...items, isEditing: !items.isEditing } : items
      )
    );
  };
  const handleChange = (
    row_id: number,
    newValue: string | any,
    input: string
  ) => {
    if (input === "teeth_problem") {
      set_factor_Data((prev) =>
        prev.map((items) =>
          items.id === row_id ? { ...items, teeth_problem: newValue } : items
        )
      );
    } else if (input === "teeth_number") {
      set_factor_Data((prev) =>
        prev.map((items) =>
          items.id === row_id ? { ...items, teeth_number: newValue } : items
        )
      );
    } else if (input === "price") {
      set_factor_Data((prev) =>
        prev.map((items) =>
          items.id === row_id ? { ...items, price: newValue } : items
        )
      );
    } else if (input === "payment") {
      set_factor_Data((prev) =>
        prev.map((items) =>
          items.id === row_id ? { ...items, payment: newValue } : items
        )
      );
    }
  };
  const save_edit = async (
    row_id: number,
    teeth_number: string,
    teeth_problem: string,
    price: number,
    payment: number,
    remainder: number
  ) => {
    const values = {
      teeth_number: teeth_number,
      teeth_problem: teeth_problem,
      price: price,
      payment: payment,
      remainder: remainder,
    };
    try {
      await api.put(`customer-treatment/${id}/factor/${row_id}/`, values);
      set_factor_Data((prev) =>
        prev.map((items) =>
          items.id === row_id ? { ...items, values, isEditing: false } : items
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const total = factor_data.reduce((sum, item) => sum + item.price, 0);
    const reminder = factor_data.reduce(
      (sum, item) => sum + item.price - item.payment,
      0
    );
    set_reminder_number(reminder);
    set_total_number(total);
  }, [factor_data]);

  const addRow = async () => {
    const newRow: any | factor_type = {
      teeth_problem: "0",
      teeth_number: "0",
      price: 0,
      payment: 0,
      remainder: 0,
      related_to: id,
    };
    try {
      const response = await api.post(`create-items-treatment/factor/`, newRow);
      set_factor_Data([...factor_data, { ...response.data, isEditing: true }]);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteRow = async (row_id: number) => {
    try {
      await api.delete(`customer-treatment/${id}/factor/${row_id}/`);
      set_factor_Data(factor_data.filter((item) => item.id !== row_id));
    } catch (error) {
      console.log(error);
    }
  };
  const print_data = localStorage.getItem("print_data") as any;
  const data = JSON.parse(print_data);
  return (
    <div ref={contentRef}>
      <div className="print-only hidden w-full">
        <div className="flex gap-x-4 px-10 mt-10 items-center w-full justify-between">
          <h1>شماره تماس : 0{data?.phone_number}</h1>
          <h1>تخلص : {data?.last_name}</h1>
          <h1>نام : {data?.user_name}</h1>
        </div>
      </div>
      <table className="w-full p-5 mt-5">
        <thead className="w-full">
          <tr className="bg-main-500 w-full ">
            <th className=" py-2 text-sm border text-white">ID</th>
            <th className=" py-2 text-sm border text-white">Treatment</th>
            <th className=" py-2 text-sm border text-white">Tooth</th>
            <th className=" py-2 text-sm border text-white">Data</th>
            <th className=" py-2 text-sm border text-white">Price</th>
            <th className=" py-2 text-sm border text-white">Payment</th>
            <th className=" py-2 text-sm border text-white">Remainder</th>
            <th className=" py-2 text-sm border text-white no-print">Action</th>
          </tr>
        </thead>
        <tbody>
          {factor_data?.map((items: factor_type, index: number) => {
            const epoch_date = new Date(items.date);
            return (
              <tr key={index}>
                <td className="py-1 w-[50px] text-md border px-2 text-center">
                  {index + 1}
                </td>
                <td className="py-1 text-md border px-2 text-center">
                  {items.isEditing ? (
                    <input
                      type="text"
                      value={items.teeth_problem}
                      onChange={(e) =>
                        handleChange(items.id, e.target.value, "teeth_problem")
                      }
                      className="w-full px-1 py-1 rounded-sm border outline-none text-center"
                    />
                  ) : (
                    items.teeth_problem
                  )}
                </td>
                <td className="py-1 text-md border px-2 text-center">
                  {items.isEditing ? (
                    <input
                      type="text"
                      value={items.teeth_number}
                      onChange={(e) =>
                        handleChange(items.id, e.target.value, "teeth_number")
                      }
                      className="w-[100px] px-1 py-1 rounded-sm border outline-none text-center"
                    />
                  ) : (
                    items.teeth_number
                  )}
                </td>
                <td className="py-1 text-md border px-2 text-center">
                  {epoch_date.toLocaleDateString()}
                </td>
                <td className="py-1 text-md border px-2 text-center">
                  {items.isEditing ? (
                    <input
                      type="number"
                      value={items.price}
                      onChange={(e) =>
                        handleChange(
                          items.id,
                          parseFloat(e.target.value),
                          "price"
                        )
                      }
                      className="w-[300px] px-1 py-1 rounded-sm border outline-none text-center"
                    />
                  ) : (
                    items.price
                  )}
                </td>
                <td className="py-1 text-md border px-2 text-center">
                  {items.isEditing ? (
                    <input
                      type="number"
                      value={items.payment}
                      onChange={(e) =>
                        handleChange(
                          items.id,
                          parseFloat(e.target.value),
                          "payment"
                        )
                      }
                      className="w-[300px] px-1 py-1 rounded-sm border outline-none text-center"
                    />
                  ) : (
                    items.payment
                  )}
                </td>
                <td className="py-1 text-md border px-2 text-center">
                  {items.price - items.payment}
                </td>

                <td className="py-1 text-md border px-2 text-center no-print">
                  {items.isEditing ? (
                    <button
                      className="cursor-pointer text-sm"
                      onClick={() =>
                        save_edit(
                          items.id,
                          items.teeth_number,
                          items.teeth_problem,
                          items.price,
                          items.payment,
                          items.remainder
                        )
                      }
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="underline text-sm cursor-pointer "
                        onClick={() => editItems(items.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="underline text-sm mx-2 cursor-pointer"
                        onClick={() => deleteRow(items.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-md border text-center flex items-center justify-between">
        <h1 className="w-[350px] text-start bg-main-500 p-2 text-white">
          Total Reminder
        </h1>
        <h1 className="px-10 text-center">{reminder_number}</h1>
      </div>
      <div className="text-md border text-center flex items-center justify-between">
        <h1 className="w-[350px] text-start bg-main-500 p-2 text-white">
          Total Price
        </h1>
        <h1 className="px-10 text-center">{total_number}</h1>
      </div>

      <Button className="mt-5 bg-main-700 no-print" onClick={() => addRow()}>
        Add Factor
      </Button>
    </div>
  );
};

export default CustomerFactorTable;
