const express = require("express")
const router = express.Router()
const controller = require("../controller/userController")
const { nameIsPresent, ageIsPresentAndPositive} = require("../middleware/userRequestForm")

router.get("/users", controller.index)
router.get("/users/search", controller.search)
router.get("/users/:id", controller.show)
router.post("/users", [nameIsPresent, ageIsPresentAndPositive], controller.create)
router.put("/users/:id", [nameIsPresent, ageIsPresentAndPositive], controller.update)
router.get("/users/edit/:id", controller.edit);
router.delete("/users/:id", controller.destroy)

module.exports = router

// react
// next

// vue 
// nuxt

// angular

// vanilla JS