const environments: any = {
  dev: {
    baseURL: "https://www.saucedemo.com",
    apiUrl: "https://dummyjson.com"
  },
  stage: {
    baseURL: "https://www.saucedemo.com",
    apiUrl: "https://dummyjson.com"
  },
  prod: {
    baseURL: "https://www.saucedemo.com",
    apiUrl: "https://dummyjson.com"
  }
};

// Selection logic: Usage 'npx cross-env ENV=stage playwright test'
const selectedEnv = process.env.ENV || 'dev';

export const ENV = {
  ...environments[selectedEnv],
  environmentName: selectedEnv
};