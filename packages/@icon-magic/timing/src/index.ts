let start: [number, number];
const prettyHrtime = require('pretty-hrtime');

export function timer() {
  return {
    start: function(): void {
      start = process.hrtime();
    },
    end: function(): string {
      const end = process.hrtime(start);
      return prettyHrtime(end, { verbose: true });
    }
  };
}