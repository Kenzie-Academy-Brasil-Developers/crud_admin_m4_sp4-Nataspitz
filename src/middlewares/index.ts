import { validatePermission } from "./authorizations/routersValidations.middleware";
import { verifyToken } from "./authorizations/validateToken.middleware";
import { verifyIdCoursForRegister } from "./courses/verifyCourseId.middleware";
import { verifyIdUserForRegister } from "./courses/verifyUserd.middleware";
import { verifyUserEmail } from "./users/verifyEmail.middleware";
import { verifyUserId } from "./users/verifyId.middleware";
import { verifyUserLogin } from "./users/verifyLogin.middleware";
import { validateBody } from "./validateBody.middleware";

export {
  validateBody,
  verifyUserId,
  verifyUserEmail,
  verifyToken,
  validatePermission,
  verifyUserLogin,
  verifyIdCoursForRegister,
  verifyIdUserForRegister
};
