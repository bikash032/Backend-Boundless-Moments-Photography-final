// schema.validateAsync(data) 
const bodyValidator = (schema) => {
    return async (req, res, next) => {
        try{
         let data=req.body
         console.log("dataaaaaa",data);
         
    
          if (req.file) {
            data.image = JSON.stringify(req.file)
          }
    
         
            console.log("datafff",data.image);
            
           
        let result = await schema.validateAsync(data, {
          abortEarly: false
        })
        console.log("Ressult",{result})
        next(); // next call 
        
      } catch(exception)  {
        let msgs = {};
        if(exception.details) {
          exception.details.map((errorObj) => {
            msgs[errorObj.context['label']] = errorObj.message;
          })
        }
  
        next({
          code: 400,
          detail: msgs,
          message: "Validation Failed",
          status: "BAD_REQUEST"
        })
      }
    }
  }
  
  module.exports = {
    bodyValidator
  }