import { ContainerModule } from 'inversify';
import { GenderApiService } from '../services/gender-api-service';
import { UserGenderApiController } from '../controllers/user-gender-api-controller';
import TYPES from '../constants/types';
import { config } from './config';
import { UserDb } from '../db/data-layer/user-db';
import { DOMParserService } from '../services/dom-parser';
import { AskApiService } from '../services/ask-api-service';
import { MainController } from '../controllers/main-controller';
import { HashtagDb } from '../db/data-layer/hashtag-db';
// import { UserController } from '../controllers/user-controller';

export const concrete = new ContainerModule(bind => {
    bind(GenderApiService).to(GenderApiService);
    bind(UserGenderApiController).toSelf();
    bind(DOMParserService).to(DOMParserService);
    bind(AskApiService).toSelf();
    bind(UserDb).toSelf();
    bind(HashtagDb).toSelf();
    bind(MainController).toSelf();
    // bind<UserController>(UserController).toSelf();
});

export const commonConfigurableValues = new ContainerModule(bind => {
    bind(TYPES.GENDER_API_KEY).toConstantValue(config.genderApi.apiKey);
});

export const productionValues = new ContainerModule(bind => {
    bind(TYPES.DatabaseURI).toConstantValue(config.database.productionDatabaseURI);
    bind(TYPES.LastPageNumber).toConstantValue(config.business.lastPageNumber);
});
