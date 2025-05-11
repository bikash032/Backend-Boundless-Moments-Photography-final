const { Op } = require("sequelize");
const gallerySvc = require("./gallery.service")

class GalleryController {
  createGallery = async (req, res, next) => {
    try {
      // console.log('controller',req);
      
      const payload = await gallerySvc.transformGalleryCreate(req);
      console.log(req,'controller');
      
      const gallery = await gallerySvc.storeGallery(payload);

      res.json({
        data: gallery,
        message: "Gallery Created",
        status: "GALLERY_CREATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  listAllData = async (req, res, next) => {
    try {
      let filter = {};
      if (req.query.search) {
        filter = {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        };
      }
      let { data, pagination } = await gallerySvc.getAllData(req.query, filter);
      res.json({
        data: data,
        message: "List all data",
        status: "OK",
        options: pagination,
      });
    } catch (exception) {
      next(exception);
    }
  };

  lisAllForHome = async (req, res, next) => {
    try {
      let filter = {
        status: "active"
      };
      if (req.query.search) {
        filter = {
          ...filter,
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        };
      }
      let { data, pagination } = await gallerySvc.getAllData(req.query, filter);
      res.json({
        data: data,
        message: "List all data",
        status: "OK",
        options: pagination,
      });
    } catch (exception) {
      next(exception);
    }
  };

  getById = async (req, res, next) => {
    try {
      let id = req.params.id;
      const data = await gallerySvc.getSingleRowById(id);
      if (!data) {
        throw {
          code: 422,
          message: "Gallery not found",
          status: "GALLERY_NOT_FOUND",
        };
      }
      res.json({
        data: data,
        message: "Gallery Detail",
        status: "GALLERY_DETAIL",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateGallery = async (req, res, next) => {
    try {
      let id = req.params.id;
      const data = await gallerySvc.getSingleRowById(id);
      if (!data) {
        throw {
          code: 422,
          message: "Gallery not found",
          status: "GALLERY_NOT_FOUND",
        };
      }
      //
      const payload = await gallerySvc.transformGalleryUpdate(req, data);
      const update = await gallerySvc.updateByFilter(
        {
          id: id,
        },
        payload
      );
      res.json({
        data: update,
        message: "Gallery Updated",
        status: "GALLERY_UPDATED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  deleteById = async (req, res, next) => {
    try {
      let id = req.params.id;
      const data = await gallerySvc.getSingleRowById(id);
      if (!data) {
        throw {
          code: 422,
          message: "Gallery not found",
          status: "GALLERY_NOT_FOUND",
        };
      }
      let response = await gallerySvc.deleteById(id);
      res.json({
        data: response,
        message: "Gallery Deleted",
        status: "GALLERY_DELETED",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
  listAllForhome=async(req, res,next)=>{
    try {
      let filter = {
        status: "active"
      };
      if (req.query.search) {
        filter = {
          ...filter,
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        };
      }
      let { data, pagination } = await gallerySvc.getAllData(req.query, filter);
      res.json({
        data: data,
        message: "List all data",
        status: "OK",
        options: pagination,
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const galleryCtrl = new GalleryController()
module.exports = galleryCtrl