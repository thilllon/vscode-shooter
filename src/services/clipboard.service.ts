import * as clipboardy from 'clipboardy';

export class ClipboardService {
  static copy(text) {
    return clipboardy.writeSync(text);
  }
}
