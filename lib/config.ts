const config = {
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  resendApiKey: process.env.RESEND_API_KEY,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
  imageKit: {
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
    privateKey: process.env.PRIVATE_KEY!,
  },
  stripe:{
    secretKey: process.env.STRIPE_SECRET_KEY!,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY!,
  }
};
export default config;
