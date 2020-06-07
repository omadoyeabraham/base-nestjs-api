import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwtSecret'),
    });
  }

  /**
   * Validate method called after passport-jwt decodes the payload from the bearer token.
   *
   * @param payload
   */
  async validate(payload: any) {
    // @TODO add check here to ensure that the jwt token hasn't been logged out already
    return { id: payload.sub, user: payload.user };
  }
}
