import * as fs from 'fs';
import homedir from 'homedir';
import * as path from 'path';
import * as vscode from 'vscode';
import { RequestModel } from '../request.model';
import { StorageService } from './storage.service';

const historyPathFile = path.join(homedir(), 'SRC-history.json');

export class HistoryService {
  static getAll(): Array<any> {
    if (!fs.existsSync(historyPathFile)) {
      return [];
    }
    return StorageService.getData(historyPathFile);
  }

  static write(request: RequestModel) {
    const maxStored = vscode.workspace.getConfiguration('history').get('maxStored', 50);
    let history = this.getAll();

    let serializedRequest = request.serialize();

    if (
      history.some(
        (h) =>
          h.name === serializedRequest.name &&
          h.url === serializedRequest.url &&
          h.type === serializedRequest.type &&
          h.headers === serializedRequest.headers &&
          h.body === serializedRequest.body &&
          h.options === serializedRequest.options
      )
    ) {
      return;
    }

    history.unshift(request.serialize());

    if (history.length > maxStored) {
      history = history.slice(0, maxStored);
    }

    return StorageService.write(historyPathFile, history);
  }
}
