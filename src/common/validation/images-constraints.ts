import * as Yup from "yup";
import { toMB } from "../utils/file-size";

export const IMAGES_CONSTRAINTS = {
  SIZE: 5000000,
  TYPES: ["image/jpeg", "image/png"],
};

export const testImageSize = (imageFile: File) => (imageFile && imageFile.size <= IMAGES_CONSTRAINTS.SIZE);
export const testImageType = (imageFile: File) => (imageFile && IMAGES_CONSTRAINTS.TYPES.includes(imageFile.type));

export const imageYupValidator = Yup.mixed()
.test("supported-type", `نوع الصورة غير مدعوم، يرجى اختيار صورة بصيغة أخرى`, testImageType)
.test(
  "supported-size",
  `يرجى تحميل ملف أصغر حجمًا (الحجم الأقصى ${toMB(IMAGES_CONSTRAINTS.SIZE)} ميجابايت`,
  testImageSize
);
