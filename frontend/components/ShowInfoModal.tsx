import React from "react";
import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFView from "./PDF";
import { type } from "os";
import { isArray } from "util";

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

  // Convert the user_data string to an object and replace the user_data string with the object

  if (typeof user.user_data !== "object") {
    const userData = JSON.parse(user.user_data);
    user.user_data = userData;
    setTempUser(user);
  }

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
    fetch(`http://localhost:9000/editUser/${user["user_id"]}`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Get only the values that are different between the user and the tempUser
        ...Object.keys(user).reduce((acc, key) => {
          if (user[key] !== tempUser[key]) {
            // set type any to avoid error
            (acc as any)[key] = tempUser[key];
          }
          return acc;
        }, {}),

        // user_id: user["user_id"],
        // user_name: tempUser["user_name"],
        // first_last_name: tempUser["first_last_name"],
        // second_last_name: tempUser["second_last_name"],
        // born_date: tempUser["born_date"],
        // nationality: tempUser["nationality"],
        // state_of_birth: tempUser["state_of_birth"],
        // economic_activity: tempUser["economic_activity"],
        // curp: tempUser["curp"],
        // rfc: tempUser["rfc"],
        // gender: tempUser["gender"],
        // phone_number: tempUser["phone_number"],
        // email: tempUser["email"],
        // country: tempUser["country"],
        // State: tempUser["State"],
        // city: tempUser["city"],
        // neighborhood: tempUser["neighborhood"],
        // zip_code: tempUser["zip_code"],
        // street: tempUser["street"],
        // ext_number: tempUser["ext_number"],
        // int_number: tempUser["int_number"],
        // identification_type: tempUser["identification_type"],
        // identification_reference: tempUser["identification_reference"],
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
                    {edit ? "Rectificación - " : "Acceso - "}
                    <span className="text-blue-600">
                      {tempUser["user_name"]} {tempUser["first_last_name"]}{" "}
                      {tempUser["second_last_name"]}
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
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 self-center"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 self-center"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>
                    )}
                    <PDFDownloadLink
                      className="flex px-3 py-2 font-bold bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition duration-200 items-center"
                      document={<PDFView user={user} />}
                      fileName={`${user["user_name"]}_${user["second_last_name"]}.pdf`}
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
                            value={tempUser["user_name"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                user_name: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["user_name"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">First Last Name:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["first_last_name"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                first_last_name: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["first_last_name"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Second Last Name:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["second_last_name"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                second_last_name: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["second_last_name"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Born Date:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["born_date"].split("T")[0]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                born_date: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["born_date"].split("T")[0]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Nationality:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["nationality"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                nationality: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["nationality"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">State of Birth:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["state_of_birth"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                state_of_birth: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["state_of_birth"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Economic_Activity:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["economic_activity"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                economic_activity: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["economic_activity"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">CURP:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["curp"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                curp: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["curp"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">RFC:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["rfc"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                rfc: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["rfc"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Gender:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["gender"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                gender: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["gender"]}
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
                            value={tempUser["phone_number"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                phone_number: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["phone_number"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Email:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["email"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                email: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["email"]}
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
                            value={tempUser["country"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                country: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["country"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">State:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["state"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                state: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["state"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">City:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["city"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                city: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["city"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Neighborhood:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["neighborhood"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                neighborhood: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["neighborhood"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">ZIP Code:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["zip_code"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                zip_code: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["zip_code"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Street:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["street"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                street: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["street"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Ext Number:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["ext_number"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                ext_number: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["ext_number"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Int Number:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["int_number"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                int_number: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["int_number"]}
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
                        {Object.keys(tempUser["user_data"]).map(
                          (key, value) => {
                            return (
                              <>
                                <div className="mb-3">
                                  <p className="text-base">
                                    {key[0].toUpperCase() + key.slice(1)}:
                                  </p>

                                  <p className="text-base font-bold">
                                    {isArray(tempUser["user_data"][key])
                                      ? tempUser["user_data"][key].join(", ")
                                      : tempUser["user_data"][key]}
                                  </p>
                                </div>
                              </>
                            );
                          }
                        )}
                      </div>
                      {/* Show all the values inside the user[user_data] object */}

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
                            value={tempUser["identification_type"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                identification_type: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["identification_type"]}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <p className="text-base">Identification Reference:</p>
                        {edit ? (
                          <input
                            type="text"
                            className="w-2/4 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            value={tempUser["identification_reference"]}
                            onChange={(e) => {
                              setTempUser({
                                ...tempUser,
                                identification_reference: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          <p className="text-base font-bold">
                            {tempUser["identification_reference"]}
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
