export const toFormData = (object: any) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    if (object[key] instanceof File) {
      formData.append(key, object[key], object[key].fileName);
    } else {
      formData.append(key, object[key]);
    }
  });
  return formData;
};
