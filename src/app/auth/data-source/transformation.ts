import { IOTPFormSchema } from "../../../common/validation/otp-code";
import { OTPFormDto } from "./dtos";

export const toVerifyRegistrationDto = (verificationData: IOTPFormSchema): OTPFormDto => ({
  username: verificationData.username,
  OTPCode: verificationData.OTPCode,
});
