const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const rewire = require("rewire");

const mysql = require("mysql2/promise");

const sandbox = sinon.createSandbox();

let userController = rewire("../controllers/userController");

describe("Testing /users endpoint", () => {
  let sampleUser;
  let queryStub;

  beforeEach(() => {
    sampleUser = {
      user_id: 4,
      user_name: "Cristina",
      first_last_name: "Sanchez",
      second_last_name: "Felix",
      born_date: "2000-10-05",
      nationality: "Mexicana",
      state_of_birth: "Sinaloa",
      economic_activity: "Estudiante",
      curp: "SAFK001005MSL",
      rfc: "RACJ901215GF0",
      gender: "F",
      phone_number: "6681832270",
      email: "cristina_sanc@hotmail.com",
      user_data: { edad: 22, nombre: "Cristina", apellido: "Sanchez" },
      is_client: 1,
      is_blocked: 0,
      country: "México",
      state: "Ciudad de México",
      city: "LMM",
      neighborhood: "Roma Norte",
      zip_code: "06700",
      street: "Calle Orizaba",
      ext_number: "10",
      int_number: "",
      identification_type: "INE",
      identification_reference: "SAFK001005MSLNLRA3",
      oposition_rules: {
        testimonions: true,
        id_solicitante: false,
        modelos_riesgo: true,
        oposition_rules: {
          id_solicitante: true,
          oposition_rules: {
            id_solicitante: true,
            oposition_rules: {
              oposition_rules: {
                modelos_riesgo: true,
                oposition_rules: {
                  id_solicitante: true,
                  oposition_rules: {
                    oposition_rules: {
                      oposition_rules: {
                        id_solicitante: true,
                        oposition_rules: {
                          encuestas: true,
                          testimonions: false,
                          mercadotecnia: true,
                          id_solicitante: true,
                          modelos_riesgo: false,
                          reconocimientos: true,
                          atencion_consultas: false,
                          registro_historico: false,
                          prestacion_servicios: false,
                          cumplimiento_contrato: false,
                          seguridad_informacion: false,
                          integracion_expediente: false,
                          cobranza_administrativa: false,
                          procesamiento_solicitudes: true,
                          proteccion_robo_identidad: false,
                          cambios_perfil_transaccional: false,
                          obligaciones_fiscal_comecial: false,
                        },
                        prestacion_servicios: true,
                        integracion_expediente: true,
                      },
                    },
                  },
                  prestacion_servicios: true,
                  integracion_expediente: true,
                },
                seguridad_informacion: true,
                proteccion_robo_identidad: true,
              },
              atencion_consultas: true,
              cobranza_administrativa: true,
              cambios_perfil_transaccional: true,
            },
            integracion_expediente: true,
          },
          prestacion_servicios: true,
          integracion_expediente: true,
        },
        reconocimientos: true,
        atencion_consultas: true,
        registro_historico: true,
        prestacion_servicios: false,
        cumplimiento_contrato: true,
        integracion_expediente: true,
        procesamiento_solicitudes: true,
        proteccion_robo_identidad: true,
        cambios_perfil_transaccional: false,
        obligaciones_fiscal_comecial: false,
      }
    };

    queryStub = sandbox.stub().resolves([[sampleUser]]);
    userController.__set__("userService.getOneUser", queryStub);
  });

  afterEach(() => {
    userController = rewire("../controllers/userController");
    sandbox.restore();
  });

  describe("GET /:user_id", () => {
    it("should succeed when called with id", async () => {
      userController
        .getOneUser("someRandomId")
        .then((item) => {
          expect(item).to.equal(sampleUser);
        })
        .catch((err) => {
          throw new Error("⚠️ Unexpected failure!");
        });
    });
  });
});