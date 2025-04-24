const nodemailer = require('nodemailer');
const logger = require('./logger');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  // Enviar email
  async sendEmail(options) {
    try {
      const mailOptions = {
        from: process.env.SMTP_USER,
        ...options
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.system('email', `Email sent: ${info.messageId}`);
      return info;
    } catch (error) {
      logger.error('Email error:', error);
      throw error;
    }
  }

  // Enviar email de notificação
  async sendNotification(to, subject, text) {
    return this.sendEmail({
      to,
      subject,
      text,
      html: `<div style="font-family: Arial, sans-serif;">
        <h2>${subject}</h2>
        <p>${text}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Esta é uma mensagem automática. Por favor, não responda.
        </p>
      </div>`
    });
  }

  // Enviar email de alerta
  async sendAlert(to, subject, text) {
    return this.sendEmail({
      to,
      subject: `[ALERTA] ${subject}`,
      text,
      html: `<div style="font-family: Arial, sans-serif; color: #721c24; background-color: #f8d7da; padding: 20px; border-radius: 5px;">
        <h2 style="color: #721c24;">${subject}</h2>
        <p>${text}</p>
        <hr>
        <p style="color: #721c24; font-size: 12px;">
          Este é um alerta importante. Por favor, verifique imediatamente.
        </p>
      </div>`
    });
  }

  // Enviar email de relatório
  async sendReport(to, subject, data) {
    const html = this.generateReportHtml(data);
    return this.sendEmail({
      to,
      subject,
      text: `Relatório: ${subject}`,
      html
    });
  }

  // Gerar HTML do relatório
  generateReportHtml(data) {
    return `<div style="font-family: Arial, sans-serif;">
      <h2>${data.title}</h2>
      <div style="margin: 20px 0;">
        ${data.content}
      </div>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          Gerado automaticamente em ${new Date().toLocaleString()}
        </p>
      </div>
    </div>`;
  }

  // Verificar conexão
  async verifyConnection() {
    try {
      await this.transporter.verify();
      logger.system('email', 'Email service connection verified');
      return true;
    } catch (error) {
      logger.error('Email verification error:', error);
      return false;
    }
  }
}

module.exports = new EmailService(); 