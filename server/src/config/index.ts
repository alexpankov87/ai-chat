const config = {
  port: Number(process.env.PORT) || 3001,
  openrouter: {
    apiKey: process.env.OPENROUTER_API_KEY || '',
    baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'nvidia/nemotron-3-super-120b-a12b:free',
  },
} as const;

export default config;