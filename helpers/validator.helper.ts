export const isValidDate = (d: any) => {
  return d instanceof Date && !Number.isNaN(d);
};

export const dateValidator = async (_: any, value: string) => {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/g;

  if (
    value &&
    value.length > 0 &&
    (!regex.test(value) || !isValidDate(value))
  ) {
    return Promise.reject(new Error("Date error"));
  }

  return Promise.resolve();
};

export const timeValidator = async (_: any, value: string) => {
  const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/g;

  if (value && value.length > 0 && !regex.test(value)) {
    return Promise.reject(new Error("Time error"));
  }
  return Promise.resolve();
};

export const phoneValidator = async (_: any, value: string) => {
  const regex = /^[0\\+][0-9\\-]+$/;
  if (value && value.length > 0 && !regex.test(value)) {
    return Promise.reject(new Error("Phone error"));
  }
  return Promise.resolve();
};

export const integerNumberValidator = async (rule: any, value: any) => {
  const regex = /^[-0-9]*$/;
  if (!value || regex.test(value.toString())) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Number error"));
};

export const specialCharactersValidator = async (_: any, value: any) => {
  const regex = /^[0-9０-９a-zA-Z]*$/;
  if (value && value.length > 0 && !regex.test(value.toString())) {
    return Promise.reject(new Error("Character error"));
  }
  return Promise.resolve();
};

export const positiveNumberValidator = async (rule: any, value: any) => {
  const regex = /^[0-9.]*$/;
  if (!value || regex.test(value.toString())) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Number error"));
};

export const maxValueNumberValidator =
  (maxValue: number) => (rule: any, value: any) => {
    if (value && value > maxValue) {
      return Promise.reject(new Error("Number error"));
    }
    return Promise.resolve();
  };

export const fileTypeValidator = (
  file?: File | null,
  acceptedTypes?: string[]
) => {
  if (!file || acceptedTypes?.includes(file?.type)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("File type error"));
};

export const isValidHalfWith = (value: any) => {
  const regex = /[u3400-u9FBF]/;
  if (regex.test(value.toString())) {
    return true;
  }
  return false;
};

export const showFileDataValidationMessage = (status: boolean) => {
  if (status) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Invalid file type error"));
};

export const excelFilePhoneValidator = (value?: string) => {
  const regex = /^[0\\+][0-9\\-]+$/;
  if (value && value.length > 0 && regex.test(value)) {
    return true;
  }
  return false;
};

export const urlValidator = async (_: any, value: string) => {
  const regex = new RegExp(
    "^(https?:\\/\\/)" +
      "[a-z\\-A-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
      "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)" +
      "(\\:(80|443))" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$"
  );
  if (value && value.length > 0 && regex.test(value)) {
    return Promise.resolve();
  }

  return Promise.reject(new Error("URL error"));
};

export const emojiValidator = async (_: any, value: any) => {
  const regex =
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
  if (value && value.length > 0 && regex.test(value.toString())) {
    return Promise.reject(new Error("Emoji error"));
  }
  return Promise.resolve();
};
