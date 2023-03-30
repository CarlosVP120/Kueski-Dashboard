import React from "react";
import Row from "./Row";

const DashboardTable = ({
  search,
  data,
}: {
  search: string;
  data: Array<any>;
}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3">
              User ID
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              First Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Second Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              CURP
            </th>
            <th scope="col" className="px-6 py-3">
              RFC
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user: any) => {
            return (
              <Row
                key={user._id}
                id={user["User ID"]}
                email={user["Email"]}
                name={user["Name"]}
                firstLastName={user["First Last Name"]}
                secondLastName={user["Second Last Name"]}
                curp={user["CURP"]}
                rfc={user["RFC"]}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
