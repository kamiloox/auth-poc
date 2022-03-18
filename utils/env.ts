interface EnvValues {
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
}

export const getEnv = (key: keyof EnvValues) => {
  const val = process.env[key];

  if (!val) {
    throw new Error(`Environmental variable ${key} is not defined`);
  }

  return val;
};
