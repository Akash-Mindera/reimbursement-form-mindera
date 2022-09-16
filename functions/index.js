const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add custom claims to the user //

  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, { admin: true });
    })
    .then(() => {
      return {
        message: `Sucess! ${data.email} has been made an Admin.`,
      };
    })
    .catch((err) => {
      return err;
    });
});
