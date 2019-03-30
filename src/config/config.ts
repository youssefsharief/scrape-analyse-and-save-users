import { extractor } from '../services/env-variables-extractor';

export const config = {
    genderApi: {
        apiKey: process.env.genderApiKey,
    },
    database: {
        productionDatabaseURI: process.env.mongodbURI,
    },
    business: {
        lastPageNumber: 20,
    },
    ask: {
        cookie: process.env.askCookie,
    },
};
