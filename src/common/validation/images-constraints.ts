export const IMAGES_CONSTRAINTS = {
  SIZE: 5000000,
  TYPES: ["image/jpeg", "image/png"],
};

export const testImageSize = (imageFile: File) => (imageFile && imageFile.size <= IMAGES_CONSTRAINTS.SIZE);
export const testImageType = (imageFile: File) => (imageFile && IMAGES_CONSTRAINTS.TYPES.includes(imageFile.type));
