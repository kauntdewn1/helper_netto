const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

class BackupSystem {
  constructor() {
    this.backupPath = process.env.BACKUP_PATH || path.join(__dirname, 'backups');
    this.retentionDays = parseInt(process.env.BACKUP_RETENTION_DAYS || '30');
  }

  // Criar diretório de backup se não existir
  ensureBackupDir() {
    if (!fs.existsSync(this.backupPath)) {
      fs.mkdirSync(this.backupPath, { recursive: true });
    }
  }

  // Gerar nome do arquivo de backup
  generateBackupFileName() {
    const date = new Date();
    return `backup_${date.toISOString().replace(/[:.]/g, '-')}.tar.gz`;
  }

  // Executar backup do MongoDB
  async backupMongoDB() {
    try {
      this.ensureBackupDir();
      const fileName = this.generateBackupFileName();
      const filePath = path.join(this.backupPath, fileName);

      const command = `mongodump --uri="${process.env.MONGODB_URI}" --archive="${filePath}" --gzip`;

      return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            logger.error('MongoDB backup error:', error);
            reject(error);
            return;
          }
          logger.system('backup', `MongoDB backup created: ${fileName}`);
          resolve(filePath);
        });
      });
    } catch (error) {
      logger.error('Backup error:', error);
      throw error;
    }
  }

  // Executar backup dos arquivos
  async backupFiles() {
    try {
      this.ensureBackupDir();
      const fileName = `files_${this.generateBackupFileName()}`;
      const filePath = path.join(this.backupPath, fileName);

      const command = `tar -czf "${filePath}" . --exclude="node_modules" --exclude=".git" --exclude="backups"`;

      return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            logger.error('Files backup error:', error);
            reject(error);
            return;
          }
          logger.system('backup', `Files backup created: ${fileName}`);
          resolve(filePath);
        });
      });
    } catch (error) {
      logger.error('Backup error:', error);
      throw error;
    }
  }

  // Limpar backups antigos
  async cleanOldBackups() {
    try {
      const files = fs.readdirSync(this.backupPath);
      const now = new Date();

      for (const file of files) {
        const filePath = path.join(this.backupPath, file);
        const stats = fs.statSync(filePath);
        const daysOld = (now - stats.mtime) / (1000 * 60 * 60 * 24);

        if (daysOld > this.retentionDays) {
          fs.unlinkSync(filePath);
          logger.system('backup', `Deleted old backup: ${file}`);
        }
      }
    } catch (error) {
      logger.error('Cleanup error:', error);
      throw error;
    }
  }

  // Executar backup completo
  async runFullBackup() {
    try {
      logger.system('backup', 'Starting full backup');
      
      // Backup do MongoDB
      await this.backupMongoDB();
      
      // Backup dos arquivos
      await this.backupFiles();
      
      // Limpar backups antigos
      await this.cleanOldBackups();
      
      logger.system('backup', 'Full backup completed successfully');
    } catch (error) {
      logger.error('Full backup error:', error);
      throw error;
    }
  }
}

module.exports = new BackupSystem(); 