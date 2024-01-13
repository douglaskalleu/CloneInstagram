import * as ERROR from './custonErrorMessages.service';

export const getErrorMessages = (code: string) => {
    var message = null;

    console.log("HELLO: " + code);

    switch (code) {
        case "auth/user-not-found":
          message = ERROR.USER_NOT_FOUND;
          break;
        case "auth/email-already-exists":
          message = ERROR.EMAIL_ALREADY_EXIST;
          break;
        case "auth/email-already-exists":
            message = ERROR.EMAIL_ALREADY_EXIST;
            break;
        case "auth/internal-error":
          message = ERROR.INTERNAL_ERROR;
          break;
        case "auth/invalid-credential":
          message = ERROR.INVALID_CREDENTIAL;
          break;
        case "auth/invalid-email":
          message = ERROR.INVALID_EMAIL_FORMAT;
          break;
        case "auth/invalid-password":
          message = ERROR.INVALID_PASSWORD_FORMAT;
          break;
        case "auth/missing-email":
          message = ERROR.MISSING_EMAIL;
          break;
        case "auth/missing-password":
          message = ERROR.MISSING_PASSWORD;
          break;
        default:
          message = ERROR.DEFAULT_MESSAGE;
          break;
    }
    return message;
}