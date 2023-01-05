import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDto } from 'src/user/dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService, private config: ConfigService) {}

  async sendNewPassword(user: UserDto, newPassword: string) {

    const response = await this.mailerService.sendMail({
      to: 'manuelmenesesdev@gmail.com', // user.email,
      from: this.config.get('MAIL_FROM'),
      subject: 'Solicitud de recuperación de Contraseña',
      text: `Hola ${user.first_name} ${user.last_name}\nTu nueva contraseña es: ${newPassword}\nTe recomendamos fuertemente que la actualices una vez hayas entrado al sistema.`,
    });

    return response;
  }
}
