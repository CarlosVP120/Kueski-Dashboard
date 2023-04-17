import React from "react";
import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFView from "./PDF";

const ShowInfoModal = ({
  setShowInfo,
  user,
  edit,
  setEdit,
  setUpdate,
}: {
  setShowInfo: (showInfo: boolean) => void;
  user: any;
  edit: boolean;
  setEdit: (edit: boolean) => void;
  setUpdate: (update: boolean) => void;
}) => {
  // Modal screen

  // Show bottom border on scroll of modal
  const [showBorder, setShowBorder] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  // Detect scrolling of modal
  useEffect(() => {
    const modal = document.querySelector(".modal");
    const handleScroll = () => {
      if (modal?.scrollTop! > 0) {
        setShowBorder(true);
      } else {
        setShowBorder(false);
      }
    };
    modal?.addEventListener("scroll", handleScroll);
    return () => {
      modal?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const saveChangesInDB = () => {
    // Save changes in DB (https://kueski-users-db.onrender.com/)
    // Update user in DB with PATCH
    fetch(`https://kueski-users-db.onrender.com/editUser/${user["User ID"]}`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // <Text>Name: {user["Name"]}</Text>
        // <Text>First Last Name: {user["First Last Name"]}</Text>
        // <Text>Second Last Name: {user["Second Last Name"]}</Text>
        // <Text>Born Date: {user["Born Date"]}</Text>
        // <Text>Nationality: {user["Nationality"]}</Text>
        // <Text>State of Birth: {user["State of Birth"]}</Text>
        // <Text>Economic Activity: {user["Economic Activity"]}</Text>
        // <Text>CURP: {user["CURP"]}</Text>
        // <Text>RFC: {user["RFC"]}</Text>
        // <Text>Gender: {user["Gender"]}</Text>
        // <Text>Phone Number: {user["Phone Number"]}</Text>
        // <Text>Email: {user["Email"]}</Text>
        // <Text>Country: {user["Country"]}</Text>
        // <Text>State: {user["State"]}</Text>
        // <Text>City: {user["City"]}</Text>
        // <Text>Neighborhood: {user["Neighborhood"]}</Text>
        // <Text>ZIP Code: {user["ZIP Code"]}</Text>
        // <Text>Street: {user["Street"]}</Text>
        // <Text>Ext Number: {user["Ext Number"]}</Text>
        // <Text>Int Number: {user["Int Number"]}</Text>
        // <Text>Additional Contact Name: {user["Additional Contact Name"]}</Text>
        // <Text>
        //   Additional Contact Number: {user["Additional Contact Number"]}
        // </Text>
        // <Text>
        //   Additional Contact Salary Range:{" "}
        //   {user["Additional Contact Salary Range"]}
        // </Text>
        // <Text>Identification Type: {user["Identification Type"]}</Text>
        // <Text>Identification Number: {user["Identification Number"]}</Text>

        "User ID": user["User ID"],
        Name: tempUser["Name"],
        "First Last Name": tempUser["First Last Name"],
        "Second Last Name": tempUser["Second Last Name"],
        "Born Date": tempUser["Born Date"],
        Nationality: tempUser["Nationality"],
        "State of Birth": tempUser["State of Birth"],
        "Economic Activity": tempUser["Economic Activity"],
        CURP: tempUser["CURP"],
        RFC: tempUser["RFC"],
        Gender: tempUser["Gender"],
        "Phone Number": tempUser["Phone Number"],
        Email: tempUser["Email"],
        Country: tempUser["Country"],
        State: tempUser["State"],
        City: tempUser["City"],
        Neighborhood: tempUser["Neighborhood"],
        "ZIP Code": tempUser["ZIP Code"],
        Street: tempUser["Street"],
        "Ext Number": tempUser["Ext Number"],
        "Int Number": tempUser["Int Number"],
        "Additional Contact Name": tempUser["Additional Contact Name"],
        "Additional Contact Number": tempUser["Additional Contact Number"],
        "Additional Contact Salary Range":
          tempUser["Additional Contact Salary Range"],
        "Identification Type": tempUser["Identification Type"],
        "Identification Number": tempUser["Identification Number"],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      });
    // Update user in state
    setEdit(false);
    setUpdate(true);
  };

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
          className="modal inline-block align-bottom overflow-hidden  pt-0 bg-white overflow-y-auto  rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle w-4/5 max-h-[90vh]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="w-full">
            <div className="sm:flex w-full">
              <div className="mt-3 text-center sm:mt-0 w-full ">
                <div
                  className={`w-full mb-6 px-5 py-2 bg-white pt-4 flex justify-between sticky top-0 items-center ${
                    showBorder ? "shadow-md" : ""
                  }`}
                >
                  <h1
                    className="text-2xl leading-6 font-bold text-gray-900 "
                    id="modal-headline"
                  >
                    Acceso - {""}
                    <span className="text-blue-600">
                      {tempUser["Name"]} {tempUser["Second Last Name"]}
                    </span>
                  </h1>
                  <div className="flex gap-3">
                    {edit ? (
                      <button
                        className="px-3 py-2 font-bold bg-gray-200 rounded-2xl shadow-md hover:bg-gray-300 transition duration-200"
                        onClick={() => {
                          saveChangesInDB();
                          setEdit(false);
                        }}
                      >
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
                            d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        className="px-3 py-2 font-bold bg-gray-200 rounded-2xl shadow-md hover:bg-gray-300 transition duration-200"
                        onClick={() => setEdit(true)}
                      >
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
                    )}
                    <PDFDownloadLink
                      className="flex px-3 py-2 font-bold bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition duration-200 items-center"
                      document={<PDFView user={user} />}
                      fileName="somename.pdf"
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? "Cargando..." : "Generar Reporte"
                      }
                    </PDFDownloadLink>
                    {/* Close button */}
                    <button
                      type="button"
                      onClick={() => {
                        setShowInfo(false);
                        setEdit(false);
                      }}
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
                <div className="mt-2 w-full p-5 pt-2">
                  <div className="flex justify-center w-full text-black">
                    {/* First Column */}
                    <div className="flex-column text-left w-full">
                      <div className="mb-3">
                        <p className="text-base">Name:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["Name"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                Name: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["Name"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">First Last Name:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["First Last Name"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                "First Last Name": e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["First Last Name"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Second Last Name:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["Second Last Name"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                "Second Last Name": e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["Second Last Name"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Born Date:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["Born Date"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                "Born Date": e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["Born Date"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Nationality:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["Nationality"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                Nationality: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["Nationality"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">State of Birth:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["State of Birth"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                "State of Birth": e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["State of Birth"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Economic Activity:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["Economic Activity"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                "Economic Activity": e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["Economic Activity"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">CURP:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["CURP"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                CURP: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["CURP"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">RFC:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["RFC"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                RFC: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["RFC"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Gender:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["Gender"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                Gender: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["Gender"]}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Second Column */}
                    <div className="flex-column text-left w-full">
                      <div className="mb-3">
                        <p className="text-base">Phone Number:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["Phone Number"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                "Phone Number": e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["Phone Number"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Email:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["Email"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                Email: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["Email"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base font-bold text-gray-500">
                          Address:{" "}
                        </p>
                        <div className="w-4/5 h-[3px] bg-gray-500"></div>
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Country:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["Country"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                Country: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["Country"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">State:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["State"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                State: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["State"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">City:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["City"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                City: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["City"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Neighborhood:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["Neighborhood"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                Neighborhood: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["Neighborhood"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">ZIP Code:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["ZIP Code"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                "ZIP Code": e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["ZIP Code"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Street:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["Street"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                Street: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["Street"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Ext Number:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["Ext Number"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                "Ext Number": e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["Ext Number"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Int Number:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["Int Number"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                "Int Number": e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["Int Number"]}
                          </p>
                        )}
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
                          {edit ? (
                            <input
                              type="text"
                              className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                              value={tempUser["Additional Contact Name"]}
                              onChange={(e) => {
                                setTempUser({
                                  ...tempUser,
                                  "Additional Contact Name": e.target.value,
                                });
                              }}
                            />
                          ) : (
                            <p className="text-base font-bold">
                              {tempUser["Additional Contact Name"]}
                            </p>
                          )}
                        </div>
                        <div className="mb-3">
                          <p className="text-base">Phone Number:</p>
                          {edit ? (
                            <input
                              type="text"
                              className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                              value={tempUser["Additional Contact Number"]}
                              onChange={(e) => {
                                setTempUser({
                                  ...tempUser,
                                  "Additional Contact Number": e.target.value,
                                });
                              }}
                            />
                          ) : (
                            <p className="text-base font-bold">
                              {tempUser["Additional Contact Number"]}
                            </p>
                          )}
                        </div>
                        <div className="mb-3">
                          <p className="text-base">Salary Range:</p>

                          {edit ? (
                            <input
                              type="text"
                              className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                              value={
                                tempUser["Additional Contact Salary Range"]
                              }
                              onChange={(e) => {
                                setTempUser({
                                  ...tempUser,
                                  "Additional Contact Salary Range":
                                    e.target.value,
                                });
                              }}
                            />
                          ) : (
                            <p className="text-base font-bold">
                              {tempUser["Additional Contact Salary Range"]}
                            </p>
                          )}
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
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["Identification Type"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                "Identification Type": e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["Identification Type"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Identification Number:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["Identification Number"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                "Identification Number": e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["Identification Number"]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" sm:px-6 sm:flex sm:flex-row-reverse pb-5">
            <button
              type="button"
              onClick={() => {
                setShowInfo(false);
                setEdit(false);
              }}
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
