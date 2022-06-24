const express = require ('express')
const router = express.Router()
const control = require("./cliente_controller")

router.get("/cliente", control.index)
router.post("/ingresarUser", control.ingresarU)
router.post("/Login", control.login)
router.post("/habilitar",control.habilitar)
router.post("/reportar",control.reportar)
router.post("/eliminarU",control.eliminarU)

module.exports = router