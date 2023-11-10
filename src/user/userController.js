// userController.js
const userService = require('./userService');

const loginUserControllerFn = async (req, res) => {
  // Implementation for login
  var result = null;
  try{
    result = await userService.loginUserDBService(req.body);
    if(result.status){
        res.send({"status":true,"message":result.msg});
    }else{
        res.send({"status":false,"message":result.msg});
    }
  }catch(error){
    console.log(error);
    res.send({"status":false,"message":error.msg});
  }
};

const createUserControllerFn = async (req, res) => {
  // Implementation for create user
  try {
    console.log(req.body);
    const status = await userService.createUserDBService(req.body);
    console.log(status);
    if (status) {
      res.send({ status: true, message: 'User created successfully' });
    } else {
      res.send({ status: false, message: 'Error creating user' });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { loginUserControllerFn, createUserControllerFn };
