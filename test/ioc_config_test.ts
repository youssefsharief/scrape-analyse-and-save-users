import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';

import { Container, ContainerModule } from 'inversify';
import { concrete, commonConfigurableValues } from '../src/config/ioc-container-modules';
import TYPES from '../src/constants/types';


const testingValues = new ContainerModule(bind => {
    bind(TYPES.DatabaseURI).toConstantValue(process.env.mongodbMockURI);
    bind(TYPES.LastPageNumber).toConstantValue(1);
});


export const testingContainer = new Container({ autoBindInjectable: true });
testingContainer.load(concrete, commonConfigurableValues, testingValues);

// export  testingContainer;
