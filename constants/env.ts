import packageJson from "../package.json";

export const ENV = {
  VERSION: packageJson.version || "",
  API_HOST: process.env.NEXT_PUBLIC_API_HOST || "",
};
