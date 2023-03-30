import React from "react";

const Row = ({
  id,
  email,
  name,
  firstLastName,
  secondLastName,
  curp,
  rfc,
}: {
  id: string;
  email: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  curp: string;
  rfc: string;
}) => {
  return (
    <>
      <tr className="bg-white border-b hover:bg-gray-50 ">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
        >
          {id}
        </th>
        <td className="px-6 py-4">{email}</td>
        <td className="px-6 py-4">{name}</td>
        <td className="px-6 py-4">{firstLastName}</td>
        <td className="px-6 py-4">{secondLastName}</td>
        <td className="px-6 py-4">{curp}</td>
        <td className="px-6 py-4">{rfc}</td>
        <td className="px-6 py-4 text-right">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
              />
            </svg>
          </a>
        </td>
      </tr>
    </>
  );
};

export default Row;
