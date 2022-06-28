const express = require ('express')
const router = express.Router()
const control = require("./cliente_controller")

router.get("/cliente", control.index)
router.post("/ingresarUser", control.ingresarU)
router.post("/Login", control.login)
router.post("/habilitar",control.habilitar)
router.post("/reportar",control.reportar)
router.post("/eliminarU",control.eliminarU)
router.post("/convIngresar",control.convertirIngresar)
router.get("/obtenerCarpetas",control.obtenerCarpetas)
router.post("/obtenerUsuarios",control.obtenerUsuarios)
router.get("/obtenerUsuariosH",control.obtenerUsuariosH)
router.get("/formatearJSON",control.formatearJSON)
router.post("/getFile",control.getFile)
router.post("/cambiarProp",control.cambiarProp)


module.exports = router