import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, RecoveryPasswordDto, SignInDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

type Tokens = {
    access_token: string;
    refresh_token: string;
    rol: number;
}

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

    async signUp(user: AuthDto): Promise<Tokens> {
        try {
            const hash = await argon.hash(user.password);

            const newUser = await this.prisma.user.create({
                data: {
                    email: user.email,
                    password: hash,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    dni: user.dni,
                    rol_id: user.rol_id,
                },
            });

            const tokens = await this.signToken(newUser.id, newUser.email, newUser.rol_id);
            await this.updateRefreshToken(newUser.id, tokens.refresh_token);

            return tokens;

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }

    async signIn(credentials: SignInDto): Promise<Tokens> {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: credentials.email,
                },
            });
            if (!user) throw new ForbiddenException('Credentials incorrect');

            const pwMatches = await argon.verify(user.password, credentials.password);
            if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

            const tokens = await this.signToken(user.id, user.email, user.rol_id);
            await this.updateRefreshToken(user.id, tokens.refresh_token);

            return tokens;

        } catch (error) {
            throw error;
        }
    }

    async logout(user_id: number): Promise<void> {
        try {
            await this.prisma.user.updateMany({
                where: {
                    id: user_id,
                    refresh_token: {
                        not: null,
                    }
                },
                data: {
                    refresh_token: null,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async refreshToken(user_id: number, refresh_token: string): Promise<Tokens> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: user_id,
            },
        });
        if(!user || !user.refresh_token) throw new ForbiddenException('Access Denied');

        const rtMatches = await argon.verify(user.refresh_token, refresh_token);
        if(!rtMatches) throw new ForbiddenException('Access Denied');

        const tokens = await this.signToken(user.id,  user.email, user.rol_id);
        await this.updateRefreshToken(user.id, tokens.refresh_token);

        return tokens;
    }

    async recoveryPassword(recovery: RecoveryPasswordDto): Promise<string> {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: recovery.email,
                },
            });
            if (!user) throw new ForbiddenException('Credentials incorrect');

            return 'Galenostest123@';

        } catch (error) {
            throw error;
        }
    }

    //helpers
    async signToken(user_id: number, email: string, rol: number): Promise<Tokens> {
        try {
            const payload = {
                sub: user_id,
                email,
            };

            const [access_token, refresh_token] = await Promise.all([
                this.jwt.signAsync(payload, {
                    expiresIn: 60 * 60 * 3,
                    secret: this.config.get('JWT_SECRET'),
                }),
                this.jwt.signAsync(payload, {
                    expiresIn: 60 * 60 * 24 * 7,
                    secret: this.config.get('REFRESH_JWT_SECRET'),
                })
            ]);

            return { access_token, refresh_token, rol }
        } catch (error) {
            throw error;
        }
    }

    async updateRefreshToken(user_id: number, refresh_token: string): Promise<void> {
        try {
            const hash = await argon.hash(refresh_token);
            await this.prisma.user.update({
                where: {
                    id: user_id,
                },
                data: {
                    refresh_token: hash,
                },
            });
        } catch (error) {
            throw error;
        }
    }
}
