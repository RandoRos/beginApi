import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TimeModule } from "src/time/time.module";
import { UserModule } from "src/user/user.module";
import config from '../../config/config.json';
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
    imports: [
        TimeModule,
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: config.jwt.tokenSecret,
            signOptions: { expiresIn: config.jwt.expirationTime },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}