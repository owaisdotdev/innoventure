"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const serveStatic = require("serve-static");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    });
    app.use('/uploads', serveStatic((0, path_1.join)(__dirname, '..', 'uploads')));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), { prefix: '/uploads/' });
    await app.listen(3000);
    console.log(`HTTP Server running on http://localhost:3000`);
}
bootstrap();
//# sourceMappingURL=main.js.map