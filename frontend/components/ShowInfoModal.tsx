import React from "react";

const ShowInfoModal = ({
  setShowInfo,
  user,
}: {
  setShowInfo: (showInfo: boolean) => void;
  user: any;
}) => {
  // Modal screen
  return (
    <div className="fixed z-10 inset-0 overflow-hidden animate-appearShort">
      <div className="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom overflow-hidden p-5 bg-white overflow-y-auto  rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle w-4/5 max-h-[90vh]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="w-full ">
            <div className="sm:flex w-full">
              <div className="mt-3 text-center sm:mt-0 w-full">
                <div className="w-full bg-white  mb-6 flex items-start justify-between sticky top-0">
                  <h1
                    className="text-2xl leading-6 font-bold text-gray-900 "
                    id="modal-headline"
                  >
                    Acceso - {""}
                    <span className="text-blue-600">
                      {user["Name"]} {user["First Last Name"]}{" "}
                      {user["Second Last Name"]}
                    </span>
                  </h1>
                  <div className="flex gap-3">
                    <button className="px-3 py-2 font-bold bg-gray-200 rounded-2xl shadow-md hover:bg-gray-300 transition duration-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 self-center"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    <button className="px-3 py-2 font-bold bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition duration-200">
                      Generar Reporte
                    </button>
                    {/* Close button */}
                    <button
                      type="button"
                      onClick={() => setShowInfo(false)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-2 w-full">
                  <div className="flex justify-center w-full text-black">
                    {/* First Column */}
                    <div className="flex-column text-left w-full">
                      <div className="mb-3">
                        <p className="text-base">Name:</p>
                        <p className="text-base font-bold">{user["Name"]}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">First Last Name:</p>
                        <p className="text-base font-bold">
                          {user["First Last Name"]}
                        </p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Second Last Name:</p>
                        <p className="text-base font-bold">
                          {user["Second Last Name"]}
                        </p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Born Date:</p>
                        <p className="text-base font-bold">
                          {user["Born Date"]}
                        </p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Nationality:</p>
                        <p className="text-base font-bold">
                          {user["Nationality"]}
                        </p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">State of Birth:</p>
                        <p className="text-base font-bold">
                          {user["State of Birth"]}
                        </p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Economic Activity:</p>
                        <p className="text-base font-bold">
                          {user["Economic Activity"]}
                        </p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">CURP:</p>
                        <p className="text-base font-bold">{user["CURP"]}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">RFC:</p>
                        <p className="text-base font-bold">{user["RFC"]}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Gender:</p>
                        <p className="text-base font-bold">{user["Gender"]}</p>
                      </div>
                    </div>
                    {/* Second Column */}
                    <div className="flex-column text-left w-full">
                      <div className="mb-3">
                        <p className="text-base">Phone Number:</p>
                        <p className="text-base font-bold">
                          {user["Phone Number"]}
                        </p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Email:</p>
                        <p className="text-base font-bold">{user["Email"]}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base font-bold text-gray-500">
                          Address:{" "}
                        </p>
                        <div className="w-4/5 h-[3px] bg-gray-500"></div>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Country:</p>
                        <p className="text-base font-bold">{user["Country"]}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">State:</p>
                        <p className="text-base font-bold">{user["State"]}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">City:</p>
                        <p className="text-base font-bold">{user["City"]}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Neighborhood:</p>
                        <p className="text-base font-bold">
                          {user["Neighborhood"]}
                        </p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">ZIP Code:</p>
                        <p className="text-base font-bold">
                          {user["ZIP Code"]}
                        </p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Street:</p>
                        <p className="text-base font-bold">{user["Street"]}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Ext Number:</p>
                        <p className="text-base font-bold">
                          {user["Ext Number"]}
                        </p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Int Number:</p>
                        <p className="text-base font-bold">
                          {user["Int Number"]}
                        </p>
                      </div>
                    </div>
                    {/* Third Column */}
                    <div className="flex-column text-left w-full">
                      <div className="bg-gray-200 p-4 mb-3 rounded-xl">
                        <div className="mb-3">
                          <p className="text-base font-bold text-gray-500">
                            Additional Contact Information:{" "}
                          </p>
                          <div className="w-4/5 h-[3px] bg-gray-500"></div>
                        </div>
                        <div className="mb-3">
                          <p className="text-base">Name:</p>
                          <p className="text-base font-bold">
                            {user["Additional Contact Name"]}
                          </p>
                        </div>
                        <div className="mb-3">
                          <p className="text-base">Phone Number:</p>
                          <p className="text-base font-bold">
                            {user["Additional Contact Number"]}
                          </p>
                        </div>
                        <div className="mb-3">
                          <p className="text-base">Salary Range:</p>
                          <p className="text-base font-bold">
                            {user["Additional Contact Salary Range"]}
                          </p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-base font-bold text-gray-500">
                          Identifications:{" "}
                        </p>
                        <div className="w-4/5 h-[3px] bg-gray-500"></div>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Identification Type:</p>
                        <p className="text-base font-bold">
                          {user["Identification Type"]}
                        </p>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Identification Number:</p>
                        <p className="text-base font-bold">
                          {user["Identification Number"]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" s sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => setShowInfo(false)}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowInfoModal;
