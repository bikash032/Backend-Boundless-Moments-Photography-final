const cloudinarySvc = require("../../services/caludinary.service");
const { generateRandomString } = require("../../utils/helpers");
const GalleryModel = require("./gallery");
const bcrypt = require("bcryptjs");
class GalleryService {
    transformGalleryCreate = async (req) => {
        try {
            let data = req.body;
            console.log("taransfer",data);
            
            data.image=await cloudinarySvc.uploadFile(req.file.path,"gallery")  
                  
            return data;
        } catch (exception) {
            throw exception;
        }
    };
    transformGalleryUpdate = async (req, oldData) => {
        try {
          let data = req.body;
    
          if (req.file) {
            data.image = await cloudinarySvc.uploadFile(req.file.path, "banner");
          } else {
            data.image = oldData.image;
          }
    
          return data;
        } catch (exception) {
          throw exception;
        }
      };
    
    storeGallery = async (data) => {
        try {
            const gallery = await GalleryModel.create(data);
            console.log("galley",data);
            
            return gallery;
        } catch (exception) {
            throw exception;
        }
    };
    
    getAllData = async (query, filter = {}) => {
        try {
          let page = +query.page || 1;
          let limit = +query.limit || 10;
          let skip = (page - 1) * limit;
    
          // SELECT id,title,status FROM TABLE WHERE clause ORDER BY SKIP 0 LIMIT10
          // SELECT * FROM Banners where title ilike '%one%'
          const { rows, count } = await GalleryModel.findAndCountAll({
            // attributes: ['id','title']
            where: filter,
            offset: skip,
            limit: limit,
            order: [["id", "desc"]],
          });
          return {
            data: rows,
            pagination: {
              limit: limit,
              page: page,
              total: count,
            },
          };
        } catch (exception) {
          throw exception;
        }
      };
      getSingleRowById = async (id) => {
        try {
          let data = await GalleryModel.findByPk(id);
          return data;
        } catch (exception) {
          throw exception;
        }
      };
      updateByFilter = async (filter, update) => {
        try {
          console.log(filter);
          const updateData = await GalleryModel.update(update, {
            where: filter,
            returning: [
              "id",
              "title",
              "url",
              "status",
              "image",
              "createdAt",
              "updatedAt",
            ],
          });
          return updateData[1][0];
        } catch (exception) {
          throw exception;
        }
      };
      deleteById = async(id) => {
        try {
          const data = await GalleryModel.destroy({
            where: {id: id}
          })
          return data;
        } catch(exception) {
          throw exception
        }
      }
  
}
const gallerySvc = new GalleryService();
module.exports = gallerySvc;
