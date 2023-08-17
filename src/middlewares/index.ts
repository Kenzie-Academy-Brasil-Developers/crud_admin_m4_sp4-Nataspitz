import { validatePermission } from "./authorizations/routersValidations.middleware";
import { verifyToken } from "./authorizations/validateToken.middleware";
import { verifyIdsForRegister } from "./courses/verifyIds.middleware";
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
  verifyIdsForRegister,
};
