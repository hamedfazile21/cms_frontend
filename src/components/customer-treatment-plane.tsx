import { useEffect, useState } from "react";
import { plane_type } from "@/utils/types";
import api_factor from "@/utils/postFactor";
import { useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
const CustomerTreatmentPlane = () => {
  const [plane, setPlane] = useState<plane_type[]>([]);
  const { id } = useParams();
  const [t] = useTranslation('global')

  useEffect(() => {
    const get_data = async () => {
      try {
        const response = await api_factor.get(`customer-treatment/${id}/`);
        const dataWithEditing = response.data.plans.map((row: plane_type) => ({
          ...row,
          isEditing: false, // Default to false
        }));
        setPlane(dataWithEditing);
      } catch (error) {
        toast.warn(t('toasts.error'), {
          position: "top-right",
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
    get_data();
  }, []);

  const handelChange = async (id: number, value: string, input: string) => {
    if (input === "teeth_problem") {
      setPlane((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, teeth_problem: value } : row
        )
      );
    } else {
      setPlane((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, teeth_number: value } : row
        )
      );
    }
  };
  const addRow = async () => {
    const newRow: any | plane_type = {
      teeth_problem: "0",
      teeth_number: "0",
      related_to: id,
    };
    try {
      const response = await api_factor.post(
        `create-items-treatment/plane/`,
        newRow
      );
      setPlane([...plane, { ...response.data, isEditing: true }]);
    } catch (error) {
      console.error("Error adding row:", error);
    }
  };

  const server_edit = async (
    row_id: number,
    teeth_number: string,
    teeth_problem: string
  ) => {
    const value = { teeth_number: teeth_number, teeth_problem: teeth_problem };
    try {
      await api_factor.put(`customer-treatment/${id}/plane/${row_id}/`, value);
      setPlane((prevRows) =>
        prevRows.map((row) =>
          row.id === row_id ? { ...row, value, isEditing: false } : row
        )
      );
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };
  const toggleEdit = async (id: number) => {
    setPlane((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, isEditing: !row.isEditing } : row
      )
    );
  };
  const deleteRow = async (rowId: number) => {
    try {
      await api_factor.delete(`customer-treatment/${id}/plane/${rowId}/`);
      setPlane(plane.filter((row) => row.id !== rowId));
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };
  return (
    <>
      <table className="w-full p-5 mt-5">
        <thead className="w-full">
          <tr className="bg-main-500 w-full ">
            <th className=" py-2 text-sm border text-white">ID</th>
            <th className=" py-2 text-sm border text-white">Treatment</th>
            <th className=" py-2 text-sm border text-white">Tooth</th>
            <th className=" py-2 text-sm border text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {plane?.map((items: plane_type, index: number) => {
            return (
              <tr key={index}>
                <td className="py-1 w-[50px] text-md border px-2 text-center">
                  {index + 1}
                </td>
                <td className="py-1 text-md border px-2 text-center w-1/3">
                  {items.isEditing ? (
                    <input
                      type="text"
                      value={items.teeth_problem}
                      onChange={(e) =>
                        handelChange(items.id, e.target.value, "teeth_problem")
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
                        handelChange(items.id, e.target.value, "teeth_number")
                      }
                      className="w-full px-1 py-1 rounded-sm border outline-none text-center"
                    />
                  ) : (
                    items.teeth_number
                  )}
                </td>
                <td className="py-1 text-md border px-2 text-center w-1/5">
                  {items.isEditing ? (
                    <button
                      className="cursor-pointer text-sm"
                      onClick={() =>
                        server_edit(
                          items.id,
                          items.teeth_number,
                          items.teeth_problem
                        )
                      }
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleEdit(items.id)}
                        className="underline text-sm cursor-pointer "
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
        <Button onClick={() => addRow()} className="mt-5 bg-main-700">
          Add Plane
        </Button>
    </>
  );
};

export default CustomerTreatmentPlane;
