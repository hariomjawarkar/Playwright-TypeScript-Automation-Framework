export class Logger {
  private static timestamp() {
    return new Date().toISOString();
  }

  static info(message: string) {
    console.log(`[INFO][${this.timestamp()}]: ${message}`);
  }

  static warn(message: string) {
    console.log(`[WARN][${this.timestamp()}]: ${message}`);
  }

  static debug(message: string) {
    console.log(`[DEBUG][${this.timestamp()}]: ${message}`);
  }

  static error(message: string, error?: any) {
    console.log(`[ERROR][${this.timestamp()}]: ${message}`);
    if (error) console.error(error);
  }
}