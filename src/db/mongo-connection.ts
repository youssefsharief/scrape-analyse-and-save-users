import * as mongoose from 'mongoose';
import { injectable, inject } from 'inversify';
import TYPES from '../constants/types';
import { logger } from '../infrastructure/logger';

@injectable()
export class MongoConnection {
    constructor(@inject(TYPES.DatabaseURI) private databaseURI: string) {
        mongoose.connection.on('open', () => logger.log('info', 'Db connected'));
        mongoose.connection.on('error', error => {
            throw new Error(error);
        });
    }

    connect() {
        return mongoose.connect(this.databaseURI, { useNewUrlParser: true });
    }
}
