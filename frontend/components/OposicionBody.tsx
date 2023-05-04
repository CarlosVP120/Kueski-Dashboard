import React, { useEffect, useState } from "react";
import Row from "./Row";
import styles from "../styles/Form.module.css";
import Searchbar from "./Searchbar";
import Swal from "sweetalert2";

const OposicionBody = ({}: {}) => {
  const [isHovered, setIsHovered] = useState(true);
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [typeOfOpposition, setTypeOfOpposition] = useState("Primarios");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [oposicion, setOposicion] = useState("");
  const [tempUser, setTempUser] = useState({});

  const handleSubmit = () => {
    // Update the opposition_rules field of the user
    fetch(
      `http://localhost:3001/api/v1/users/${
        (currentUser as any)["user_id"]
      }/oposition`,
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        // the api recieves the json object and a boolean value to know if the passed object is for a JSON value in sql
        body: JSON.stringify((tempUser as any)["oposition_rules"]),
      }
    )
      .then((res) => {
        if (res.status === 204) {
          Swal.fire("Completado!", "Oposición registrada", "success");
        }
      })
      .catch((error) => {
        alert("Error al registrar la oposición");
      });

    fetch("http://localhost:3001/api/v1/logs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: (currentUser as any)["user_id"],
        right_type: "O",
        message: oposicion,
      }),
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((error) => {
        alert("Error al registrar la oposición");
      });

    setCurrentUser(undefined);
  };

  async function Load() {
    // const res = await fetch("http://localhost:3001/getUsers", {
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

  if (currentUser !== null && currentUser !== undefined) {
    console.log(Object.keys(currentUser as any).length);
  }

  return (
    <>
      <div className="relative overflow-x-auto sm:rounded-lg mt-6 ml-6">
        <h1 className="font-bold pb-2 text-gray-600">Selecciona un usuario:</h1>
        {/* Search Bar */}
        <Searchbar
          data={data}
          search={search}
          setSearch={setSearch}
          setShowSuggestions={setShowSuggestions}
          setCurrentUser={setCurrentUser}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          showSuggestions={showSuggestions}
          currentUser={currentUser}
          tempUser={tempUser}
          setTempUser={setTempUser}
        />
        {/* Divider */}
        <div className="w-full border-b border-gray-300 mt-3"></div>
        {currentUser !== undefined &&
        currentUser["is_client"] == "1" &&
        Object.keys(currentUser as any).length > 15 ? (
          <>
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
                      // console.log(currentUser["oposition_rules"]);
                      return (
                        <div
                          className="flex justify-between font-bold pb-2 text-gray-600 "
                          key={key}
                        >
                          <h1 className=" flex max-w-3xl">
                            {(primariosTitles as any)[0][key]}
                          </h1>
                          <div className="flex items-center gap-2">
                            <input
                              checked={
                                (tempUser as any)["oposition_rules"][key]
                                  ? true
                                  : false
                              }
                              type="checkbox"
                              className="form-checkbox h-6 w-6 rounded-full text-blue-600"
                              onChange={() => {
                                setTempUser({
                                  ...tempUser,
                                  ["oposition_rules"]: {
                                    ...(tempUser as any)["oposition_rules"],
                                    [key]: true,
                                  },
                                });
                              }}
                            />
                            <h1 className="font-normal">Show</h1>
                            <input
                              checked={
                                (tempUser as any)["oposition_rules"][key]
                                  ? false
                                  : true
                              }
                              type="checkbox"
                              className="form-checkbox h-6 w-6 rounded-full text-blue-600 accent-red-500"
                              onChange={() => {
                                setTempUser({
                                  ...tempUser,
                                  ["oposition_rules"]: {
                                    ...(tempUser as any)["oposition_rules"],
                                    [key]: false,
                                  },
                                });
                              }}
                            />
                            <h1 className="font-normal">Hide</h1>
                          </div>
                        </div>
                      );
                    })
                  : // -----------------------------------------------
                    Object.keys(secundarios).map((key) => {
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
                              checked={
                                (tempUser as any)["oposition_rules"][key]
                                  ? true
                                  : false
                              }
                              type="checkbox"
                              className="form-checkbox h-6 w-6 rounded-full text-blue-600"
                              onChange={() => {
                                setTempUser({
                                  ...tempUser,
                                  ["oposition_rules"]: {
                                    ...(tempUser as any)["oposition_rules"],
                                    [key]: true,
                                  },
                                });
                              }}
                            />
                            <h1 className="font-normal">Show</h1>
                            <input
                              checked={
                                (tempUser as any)["oposition_rules"][key]
                                  ? false
                                  : true
                              }
                              type="checkbox"
                              className="form-checkbox h-6 w-6 rounded-full text-blue-600 accent-red-500"
                              onChange={() => {
                                setTempUser({
                                  ...tempUser,
                                  ["oposition_rules"]: {
                                    ...(tempUser as any)["oposition_rules"],
                                    [key]: false,
                                  },
                                });
                              }}
                            />
                            <h1 className="font-normal">Hide</h1>
                          </div>
                        </div>
                      );
                    })}
              </div>
              {/* Textarea */}
            </div>

            {/* Divider */}
            <div className="w-full border-b border-gray-300 mt-3"></div>

            <>
              <div>
                <p className="text-gray-600 text-sm w-9/12 mt-6">
                  Por medio del presente y atendiendo a los derechos ARCO con
                  los que cuenta el usuario &quot;NombreUsuario&quot; está
                  solicitando la cancelación en el uso de su personal datos.
                </p>

                <p className="text-gray-600 text-sm mt-2 font-bold">
                  Motivo por el que el usuario solicita la cancelación:
                </p>
              </div>

              <div className="w-full flex flex-col pt-4 ml-2 mb-6">
                <textarea
                  className="w-[97%] h-48 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-gray-100 resize-none"
                  placeholder="Escribe aquí..."
                  value={oposicion}
                  onChange={(e) => {
                    setOposicion(e.target.value);
                  }}
                ></textarea>

                <button
                  className="w-1/4 bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4"
                  onClick={() => {
                    if (oposicion !== "" || oposicion.length > 0) {
                      handleSubmit();
                    } else {
                      alert("No se puede enviar una oposición vacía.");
                    }
                  }}
                >
                  Enviar
                </button>
              </div>
            </>
          </>
        ) : currentUser !== undefined && currentUser["is_client"] == "0" ? (
          <>
            <div className="flex justify-center items-center animate-appearShort">
              <h1 className="font-bold text-lg pb-2 text-red-600 mt-20">
                El usuario seleccionado no es un cliente
              </h1>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center animate-appearShort">
            <h1 className="font-bold text-xl pb-2 text-gray-600 mt-20">
              Seleccione un usuario para poder realizar la oposición.
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default OposicionBody;
