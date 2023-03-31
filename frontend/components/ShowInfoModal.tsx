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
    <div className="fixed z-10 inset-0 overflow-y-auto animate-appearShort">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
          className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-4/5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="w-full px-4 pt-5 pb-4 ">
            <div className="sm:flex w-full">
              <div className="mt-3 text-center sm:mt-0 w-full">
                <div className="w-full mb-6 flex items-center justify-between">
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
                <div className="mt-2">
                  {/* First Column */}
                  <p className="text-sm text-gray-500">{user["Name"]}: Name</p>
                  <p className="text-sm text-gray-500">
                    {user["First Last Name"]}: First Last Name
                  </p>
                  <p className="text-sm text-gray-500">
                    {user["Second Last Name"]}: Second Last Name
                  </p>
                  <p className="text-sm text-gray-500">
                    {user["Born Date"]}: Born Date
                  </p>
                  <p className="text-sm text-gray-500">
                    {user["Nationality"]}: Nationality
                  </p>
                  <p className="text-sm text-gray-500">
                    {user["State of Birth"]}: State of Birth
                  </p>
                  <p className="text-sm text-gray-500">
                    {user["Economic Activity"]}: Economic Activity
                  </p>
                  <p className="text-sm text-gray-500">{user["CURP"]}: CURP</p>
                  <p className="text-sm text-gray-500">{user["RFC"]}: RFC</p>
                  <p className="text-sm text-gray-500">
                    {user["Gender"]}: Gender
                  </p>
                  {/* Second Column */}
                  <p className="text-sm text-gray-500">
                    {user["Phone Number"]}: Phone Number
                  </p>
                  <p className="text-sm text-gray-500">
                    {user["Email"]}: Email
                  </p>
                  <p className="text-sm text-gray-500">
                    {user["Country"]}: Country
                  </p>
                  <p className="text-sm text-gray-500">
                    {user["State"]}: State
                  </p>
                  <p className="text-sm text-gray-500">{user["City"]}: City</p>
                  <p className="text-sm text-gray-500">
                    {user["Neighborhood"]}: Neighborhood
                  </p>
                  <p className="text-sm text-gray-500">
                    {user["ZIP Code"]}: ZIP Code
                  </p>
                  <p className="text-sm text-gray-500">
                    {user["Street"]}: Street
                  </p>
                  <p className="text-sm text-gray-500">
                    {user["Ext Number"]}: Ext Number
                  </p>
                  <p className="text-sm text-gray-500">
                    {user["Int Number"]}: Int Number
                  </p>
                  {/* Third Column */}
                  <p className="text-sm text-gray-500">
                    {user["Additional Contact Name"]}: Additional Contact Name
                  </p>

                  <p className="text-sm text-gray-500">
                    {user["Additional Contact Number"]}: Additional Contact
                    Phone Number
                  </p>
                  <p className="text-sm text-gray-500">
                    {user["Additional Contact Salary Range"]}: Additional
                    Contact Salary Range
                  </p>
                  <p className="text-sm text-gray-500">
                    {user["Identification Type"]}: Identification Type
                  </p>
                  <p className="text-sm text-gray-500">
                    {user["Identification Number"]}: Identification Number
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
