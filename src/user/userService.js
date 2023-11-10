var userModel = require('./userModel');
var key = '123456789trytrytry';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = async (userDetails) => {
  try {
    var userModelData = new userModel();
    userModelData.firstname = userDetails.firstname;
    userModelData.lastname = userDetails.lastname;
    userModelData.email = userDetails.email;

    // Use the encryptor to encrypt the password
    var encryptedPassword = encryptor.encrypt(userDetails.password);
    userModelData.password = encryptedPassword;

    // Use await with the save method instead of a callback
    await userModelData.save();

    return true; // User created successfully
  } catch (error) {
    console.error(error);
    return false; // Error creating user
  }
};

module.exports.loginUserDBService = async (userDetails) => {
  try {
    const result = await userModel.findOne({ email: userDetails.email });

    if (result !== undefined && result !== null) {
      var decrypted = encryptor.decrypt(result.password);

      if (decrypted === userDetails.password) {
        return { status: true, msg: "User Validated Successfully" };
      } else {
        return { status: false, msg: "User Validation failed" };
      }
    } else {
      return { status: false, msg: "User error Details" };
    }
  } catch (error) {
    console.error(error);
    throw { status: false, msg: "Error during login validation" };
  }
};
