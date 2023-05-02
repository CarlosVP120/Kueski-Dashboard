import React, { useEffect, useState } from "react";
import Row from "./Row";
import styles from "../styles/Form.module.css";

const OposicionBody = ({}: {}) => {
  const [isHovered, setIsHovered] = useState(true);
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [typeOfOpposition, setTypeOfOpposition] = useState("Primarios");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  async function Load() {
    // const res = await fetch("https://kueski-users-db.onrender.com/getUsers", {
    const res = await fetch("http://localhost:3001/api/v1/users", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    // console.log("loaded data", result);
    setData(result);
  }

  useEffect(() => {
    (async () => await Load())();
  }, []);

  const [primarios, setPrimarios] = useState({
    id_solicitante: true,
    integracion_expediente: true,
    prestacion_servicios: true,
    procesamiento_solicitudes: true,
    cumplimiento_contrato: true,
    cobranza_administrativa: true,
    cambios_perfil_transaccional: true,
    obligaciones_fiscal_comecial: true,
    atencion_consultas: true,
    registro_historico: true,
    modelos_riesgo: true,
    seguridad_informacion: true,
    proteccion_robo_identidad: true,
  });
  const primariosTitles = useState({
    id_solicitante:
      "Identificación del solicitante y/o cliente, según sea el caso.",
    integracion_expediente:
      "Integración del expediente de información de nuestro cliente.",
    prestacion_servicios:
      "Prestación de los servicios y/o comercialización de los bienes de que se trate.",
    procesamiento_solicitudes:
      "Gestión, control, administración y procesamiento de las solicitudes del solicitante y/o cliente.",
    cumplimiento_contrato:
      "Gestión, control, administración, ejecución y cumplimiento del contrato celebrado con el cliente conforme a la solicitud correspondiente.",
    cobranza_administrativa:
      "Gestión, control y administración de la cobranza administrativa (a través de cualquier medio de contacto otorgado en la solicitud), extrajudicial y, en su caso, judicial derivada de los servicios proporcionados por Kueski.",
    cambios_perfil_transaccional:
      "Investigación de cambios en el perfil transaccional del cliente.",
    obligaciones_fiscal_comecial:
      "Cumplimiento a obligaciones de carácter fiscal o comercial.",
    atencion_consultas:
      "Atención de consultas, dudas, aclaraciones o quejas del cliente.",
    registro_historico:
      "Estadística y registro histórico de usuarios y clientes.",
    modelos_riesgo:
      "Creación, mantenimiento y entrenamiento de los modelos de riesgo predictivos de Kueski.",
    seguridad_informacion:
      "Mantener la seguridad de la información y de la operación.",
    proteccion_robo_identidad: "Protección ante casos de robo de identidad.",
  });

  const [secundarios, setSecundarios] = useState({
    mercadotecnia: true,
    reconocimientos: true,
    testimonions: true,
    encuestas: true,
  });

  const secundariosTitles = useState({
    mercadotecnia:
      "Fines mercadotécnicos, publicitarios y/o de prospección comercial.",
    reconocimientos:
      "Otorgamiento de estímulos o reconocimientos a clientes, cuando participen en nuestras campañas publicitarias, mercadológicas o comerciales.",
    testimonions:
      "Uso de imágenes y testimonios de clientes y/o usuarios para fines publicitarios y de ofertas comerciales referentes a productos y/o servicios ofrecidos o relacionados con productos y/o servicios contratados.",
    encuestas: "Mejoras en el servicio de atención y trato con el cliente.",
  });

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg mt-6 ml-6">
        <h1 className="font-bold pb-2 text-gray-600">Selecciona un usuario:</h1>
        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <div className={`${styles.input_group} self-center !max-w-[380px]`}>
            <input
              placeholder="Search"
              className={styles.input_text}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onFocus={() => setShowSuggestions(true)}
            />
            <span className="icon flex items-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 !cursor-default"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className={`w-6 h-6 ${
              isHovered ? "text-blue-600" : "text-gray-600"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
          <div className="flex">
            <h1
              className={`${
                isHovered ? "block" : "hidden"
              } bg-gray-200 px-3 py-1 rounded-xl animate-appearShort`}
            >
              Enter name, email, CURP or RFC
            </h1>
          </div>
        </div>

        {/* Suggestions */}
        <div className="flex flex-col mt-1 absolute bg-slate-100 rounded-md w-1/3 ">
          {showSuggestions &&
            Object.keys(data)
              .filter((key) => {
                let completeName = `${(data as any)[key]["user_name"]} ${
                  (data as any)[key]["first_last_name"]
                } ${(data as any)[key]["second_last_name"]}`;

                return (
                  // The value cant contain null or undefined
                  (data as any)[key]["user_name"]
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                  (data as any)[key]["email"]
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                  (data as any)[key]["curp"]
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                  (data as any)[key]["rfc"]
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                  // If the complete name includes the search excluding spaces and empty strings
                  completeName
                    .split(" ")
                    .filter((val) => val !== "")
                    .join(" ")
                    .toLowerCase()
                    .includes(search.toLowerCase())
                );
              })
              .map((val, key) => {
                return (
                  <>
                    {search.length > 0 && (
                      <button
                        className="flex items-center justify-between rounded-xl px-4 py-2 mx-2 mt-2 cursor-pointer hover:bg-slate-200"
                        key={key}
                        onClick={() => {
                          setCurrentUser((data as any)[val]);
                          setSearch("");
                          setShowSuggestions(false);
                        }}
                      >
                        <h1>
                          {(data as any)[val]["user_name"]}{" "}
                          {(data as any)[val]["first_last_name"]}{" "}
                          {(data as any)[val]["second_last_name"]}{" "}
                        </h1>
                      </button>
                    )}
                  </>
                );
              })}
        </div>

        {/* Selected User */}
        {currentUser && (
          <h1 className="font-bold text-2xl pb-2 text-blue-600 mt-4">
            {(currentUser as any).user_name}{" "}
            {(currentUser as any).first_last_name}{" "}
            {(currentUser as any).second_last_name}
          </h1>
        )}

        {/* Dropwon select */}
        <div className="flex items-center gap-2 mt-6 ">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-gray-600">Tipo de datos:</h1>
            <select
              className={`bg-slate-200 form-select text-gray-500 block px-2 py-2 font-bold text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
              onChange={(e) => {
                setTypeOfOpposition(e.target.value);
              }}
            >
              <option value="Primarios">Primarios</option>
              <option value="Secundarios">Secundarios</option>
            </select>
          </div>
        </div>

        {/* Columns */}
        <div className="flex w-full mt-6">
          <div className="flex flex-col w-full pr-6">
            {/* Map the object  */}
            {typeOfOpposition === "Primarios"
              ? Object.keys(primarios).map((key) => {
                  return (
                    <div
                      className="flex justify-between font-bold pb-2 text-gray-600 "
                      key={key}
                    >
                      <h1 className="text-black flex max-w-3xl">
                        {(primariosTitles as any)[0][key]}
                      </h1>
                      <div className="flex items-center gap-2">
                        <input
                          checked={(primarios as any)[key] ? true : false}
                          type="checkbox"
                          className="form-checkbox h-6 w-6 rounded-full text-blue-600"
                          onChange={() => {
                            setPrimarios({
                              ...primarios,
                              [key]: true,
                            });
                          }}
                        />
                        <h1 className="font-normal">Show</h1>
                        <input
                          checked={(primarios as any)[key] ? false : true}
                          type="checkbox"
                          className="form-checkbox h-6 w-6 rounded-full text-blue-600 accent-red-500"
                          onChange={() => {
                            setPrimarios({
                              ...primarios,
                              [key]: false,
                            });
                          }}
                        />
                        <h1 className="font-normal">Hide</h1>
                      </div>
                    </div>
                  );
                })
              : Object.keys(secundarios).map((key) => {
                  return (
                    <div
                      className="flex justify-between font-bold pb-2 text-gray-600"
                      key={key}
                    >
                      <h1 className=" flex max-w-3xl">
                        {(secundariosTitles as any)[0][key]}
                      </h1>
                      <div className="flex items-center gap-2">
                        <input
                          checked={(secundarios as any)[key] ? true : false}
                          type="checkbox"
                          className="form-checkbox h-6 w-6 rounded-full text-blue-600"
                          onChange={() => {
                            setSecundarios({
                              ...secundarios,
                              [key]: true,
                            });
                          }}
                        />
                        <h1 className="font-normal">Show</h1>
                        <input
                          checked={(secundarios as any)[key] ? false : true}
                          type="checkbox"
                          className="form-checkbox h-6 w-6 rounded-full text-blue-600 accent-red-500"
                          onChange={() => {
                            setSecundarios({
                              ...secundarios,
                              [key]: false,
                            });
                          }}
                        />
                        <h1 className="font-normal">Hide</h1>
                      </div>
                    </div>
                  );
                })}
          </div>
          {/* Second column */}
        </div>
      </div>
    </>
  );
};

export default OposicionBody;
