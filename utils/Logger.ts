export class Logger {
  private static timestamp() {
    return new Date().toISOString();
  }

  static info(message: string) {
    console.log(`[INFO][${this.timestamp()}]: ${message}`);
  }

  static error(message: string, error?: any) {
    console.log(`[ERROR][${this.timestamp()}]: ${message}`);
    if (error) console.error(error);
  }
}