declare global {
   namespace NodeJS {
      interface ProcessEnv {
       PROJECT_ID: string;
       PROJECT_URL: string;    
       }
   }
}

