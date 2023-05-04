import React, { useEffect, useState } from "react";

const Historial = () => {
  const [data, setData] = useState<any[]>([]);

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
    console.log("loaded data", result);
    setData(result);
  }

  useEffect(() => {
    (async () => await Load())();
  }, []);

  return (
    <>
      <div className="w-full h-full p-6 gap-2">
        <div className="w-full flex animate-appear flex-col h-full overflow-y-hidden">
          <h1 className="text-3xl font-bold mb-6">Historial</h1>
          <div className="h-screen overflow-y-auto rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Right Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Register Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((registro: any) => (
                  <tr key={registro.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {registro.user_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {registro.right_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {registro.register_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {registro.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Historial;
