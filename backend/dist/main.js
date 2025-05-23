"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') || 3000;
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), { prefix: '/uploads/' });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('My API Docs')
        .setDescription('The API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    await app.listen(port);
    console.log(`HTTP Server running on http://localhost:${port}`);
    console.log(`Swagger Docs available at http://localhost:${port}/swagger`);
}
bootstrap();
//# sourceMappingURL=main.js.map