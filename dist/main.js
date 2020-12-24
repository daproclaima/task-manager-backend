"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config = require("config");
async function bootstrap() {
    const serverConfig = config.get('server');
    const logger = new common_1.Logger('bootsrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    if (process.env.NODE_ENV === 'development') {
        app.enableCors();
    }
    else {
        app.enableCors({ origin: serverConfig.origin });
        logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
    }
    console.log(serverConfig);
    const port = process.env.PORT || serverConfig.port;
    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map