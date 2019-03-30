import container from './config/ioc_config';
import { MongoConnection } from './db/mongo-connection';
import { MainController } from './controllers/main-controller';
process.on('unhandledRejection', up => {
    throw up;
});

const controller = container.get(MainController);
const db = container.get(MongoConnection);

(async function main() {
    db.connect();
    await controller.scrape();
})();
