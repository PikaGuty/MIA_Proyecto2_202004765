const express = require ('express')
const router = express.Router()
const control = require("./cliente_controller")

router.get("/cliente", control.index)
router.post("/ingresarUser", control.ingresarU)

module.exports = router