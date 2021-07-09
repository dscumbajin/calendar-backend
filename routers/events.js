/*
Rutas Events
hots: /api/events

*/

const { Router } = require("express");

const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");

const router = Router();

const { validarJWT } = require("../middlewares/validar-jwt.js");
const { isDate } = require("../helpers/isDate");

//Validar todos los end poind JWT
router.use(validarJWT);

//Obtener eventos
router.get("/", getEventos);
//Crear un evento
router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatorio").custom(isDate),
    check("end", "Fecha fin es obligatorio").custom(isDate),
    validarCampos,
  ],
  crearEvento
);
//Actualizar evento
router.put(
  "/:id",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatorio").custom(isDate),
    check("end", "Fecha fin es obligatorio").custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);
//Eliminar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
