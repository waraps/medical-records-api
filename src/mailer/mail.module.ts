import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
            host: config.get('MAIL_SMTP'),
            auth: {
              user: config.get('MAIL_USER'),
              pass: config.get('MAIL_PASSWORD'),
            },
        },
        defaults: {
            from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        }
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
