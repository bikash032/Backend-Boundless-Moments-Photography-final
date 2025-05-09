const { UserRole } = require("../../config/constant");
const {
    loginCheck,
    checkPermission,
} = require("../../middleware/auth.middleware");
const { bodyValidator } = require("../../middleware/request.validator");
const { uploader } = require("../../middleware/uploader.moddleware");
const galleryCtrl = require("./gallery.controller");
const {
    GalleryCreateDTO,
    GalleryUpdateDTO,
} = require("./gallery.validator");

const galleryRoutes = require("express").Router();
galleryRoutes.post(
    "/gallery",
    loginCheck,checkPermission([UserRole.ADMIN]),
    uploader().single("image"),
    bodyValidator(GalleryCreateDTO),
    galleryCtrl.createGallery
);



galleryRoutes.get('/gallery/', loginCheck, checkPermission([UserRole.ADMIN]), galleryCtrl.listAllData)

// find 
galleryRoutes.get('/gallery/:id', loginCheck, checkPermission([UserRole.ADMIN]), galleryCtrl.getById)
galleryRoutes.put('/gallery/:id', loginCheck, checkPermission([UserRole.ADMIN]), uploader().single('image'), bodyValidator(GalleryUpdateDTO), galleryCtrl.updateGallery)
galleryRoutes.delete('/gallery/:id', loginCheck, checkPermission([UserRole.ADMIN]), galleryCtrl.deleteById)

module.exports = galleryRoutes;
