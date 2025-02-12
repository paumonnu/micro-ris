import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Console } from 'console';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';

@Injectable()
export class MailService {
  transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('mail.host'),
      port: this.configService.get('mail.port'),
      secure: this.configService.get('mail.secure'),
    });
  }

  async sendMail(options: MailOptions) {
    const info = await this.transporter.sendMail(options);
  }
}
