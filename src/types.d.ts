declare namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
      ACCESS_TOKEN_SECRET: string;
      JWT_SECRET: string;
    }
  }
  