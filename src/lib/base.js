import 'dotenv/config';

const baseUrl = process.env.BASE_URL ? `https://${process.env.BASE_URL}` : 'http://localhost:3000';

export { baseUrl };
