class Logger {
  error(error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

export const logger = new Logger();
