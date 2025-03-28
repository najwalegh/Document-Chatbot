"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const shared_module_1 = require("./shared/shared.module");
const app_resolver_1 = require("./app.resolver");
const chat_module_1 = require("./chat/chat.module");
const message_module_1 = require("./shared/message/message.module");
const chatTraitement_module_1 = require("./chatTraitement/chatTraitement.module");
const ingestion_module_1 = require("./ingestion/ingestion.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [chatTraitement_module_1.chatTraitementModule, shared_module_1.SharedModule, ingestion_module_1.IngestionModule, chat_module_1.ChatModule, message_module_1.MessageModule],
        providers: [app_resolver_1.AppResolver],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map