const express = require ('express')
const router = express.Router()
const control = require("./cliente_controller")

router.get("/cliente", control.index)
router.post("/ingresarUser", control.ingresarU)
router.post("/Login", control.login)
router.post("/habilitar",control.habilitar)
router.post("/reportarUsuario",control.reportarUsuario)
router.post("/eliminarUsuario",control.eliminarUsuario)
router.post("/convIngresar",control.convertirIngresar)
router.get("/obtenerCarpetas",control.obtenerCarpetas)
router.post("/obtenerUsuarios",control.obtenerUsuarios)
router.get("/obtenerUsuariosH",control.obtenerUsuariosH)
router.get("/formatearJSON",control.formatearJSON)
router.post("/getFile",control.getFile)
router.post("/cambiarProp",control.cambiarProp)
router.post("/obtenerDU",control.obtenerDU)
router.post("/datosUsuario",control.datosUsuario)
router.post("/modificarUsuario",control.modificarUsuario)
router.post("/nuevoArchCarp",control.nuevoArchCarp)
router.post("/eliminArchCarp",control.eliminArchCarp)
router.post("/modCarp",control.modCarp)
router.post("/modArch",control.modArch)
router.post("/compartirF",control.compartirF)
router.post("/obtenerColab",control.obtenerColab)
router.post("/terminarArchCarp",control.terminarArchCarp)


module.exports = router