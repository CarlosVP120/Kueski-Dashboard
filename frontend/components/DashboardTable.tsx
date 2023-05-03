import React, { useEffect, useState } from "react";
import Row from "./Row";
import { PieChart } from "react-minimal-pie-chart";

const DashboardTable = ({
  data,
  setOption,
  setUpdate,
}: {
  data: Array<any>;
  setOption: (option: string) => void;
  setUpdate: (update: boolean) => void;
}) => {
  const defaultLabelStyle = {
    fontSize: "8px",
    fontFamily: "sans-serif",
    // color of the text gray-100
    fill: "#ffffff",
    fontWeight: "bold",
  };

  const [cancelaciones, setCancelaciones] = useState(0);
  const [clientes, setClientes] = useState(0);
  const [oposiciones, setOposiciones] = useState(0);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    // Get the total of cancelations
    const clientes_total = data?.filter((user: any) => {
      return user["is_client"] == 1;
    });
    setClientes(clientes_total?.length);
  });

  useEffect(() => {
    (async () => await Load())();
  }, []);

  // /api/v1/logs/getAllLogs
  async function Load() {
    const res = await fetch(
      "https://kueski-users-db.onrender.com/api/v1/logs/",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    setLogs(result);
    logs.map((log) => {
      if (log.right_type == "C") {
        setCancelaciones(cancelaciones + 1);
      } else if (log.right_type == "O") {
        setOposiciones(oposiciones + 1);
      }
    });
  }
  return (
    <>
      {data ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
          {/* Metrics div */}
          <div className="w-full bg-slate-100 flex mb-3 gap-1 animate-appear">
            {/* Column 1 */}
            <div className="flex flex-col justify-center items-center p-4 w-full">
              <h1 className="text-base mb-1 font-bold text-gray-700">
                Total de usuarios
              </h1>
              <PieChart
                data={[
                  // Dark Blue colors
                  { title: "Clientes", value: clientes, color: "#2B6CB0" },
                  {
                    title: "",
                    value: data?.length - clientes,
                    color: "#68A9E9",
                  },
                ]}
                label={({ dataEntry }) =>
                  Math.round(dataEntry.percentage) + "%" + " " + dataEntry.title
                }
                labelStyle={defaultLabelStyle}
                style={{ height: "150px" }}
                reveal={100}
              />
            </div>
            {/* Column 2 */}
            <div className="flex flex-col justify-center items-center py-4 w-full">
              <h1 className="text-lg font-bold text-gray-700">
                Cancelaciones realizadas
              </h1>
              <h1 className="text-6xl font-bold text-gray-700">
                {cancelaciones}
              </h1>
            </div>
            {/* Column 3 */}
            <div className="flex flex-col justify-center items-center py-4 w-full">
              <h1 className="text-lg font-bold text-gray-700">
                Oposiciones realizadas
              </h1>
              <h1 className="text-6xl font-bold text-gray-700">
                {oposiciones}
              </h1>
            </div>
          </div>

          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
              <tr>
                <th scope="col" className="px-4 py-3">
                  User ID
                </th>
                <th scope="col" className="px-4 py-3">
                  Email
                </th>
                <th scope="col" className="px-4 py-3">
                  Name
                </th>
                <th scope="col" className="px-4 py-3">
                  First Last Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Second Last Name
                </th>
                <th scope="col" className="px-4 py-3">
                  CURP
                </th>
                <th scope="col" className="px-4 py-3">
                  RFC
                </th>
                <th scope="col" className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((user: any) => {
                return (
                  <Row
                    key={user.user_id}
                    user={user}
                    setOption={setOption}
                    setUpdate={setUpdate}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <div className="self-center text-2xl inline-flex items-center">
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-black"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Loading...
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardTable;
