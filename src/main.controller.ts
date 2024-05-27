import { performance } from 'perf_hooks';
import * as vscode from 'vscode';
import { RequestModel } from './request.model';
import { ClipboardService } from './services/clipboard.service';
import { HistoryService } from './services/history.service';
import { RequestService } from './services/request.service';
import { RapTreeDataProvider } from './views/menu/RapTreeDataProvider';
import { RequestPanel } from './views/requestPanel/RequestPannel';

export class MainController {
  private _menu: RapTreeDataProvider;

  constructor(menu: RapTreeDataProvider) {
    this._menu = menu;
  }

  makeRequest(name: string, url: string, type: string, headers: string, body: string, options: string) {
    const requestModel = new RequestModel(name, url, type, headers, body, options);
    HistoryService.write(requestModel);
    return RequestService.request(requestModel);
  }
  
  createRequestPanel(request: RequestModel) {
    const rapPanel = new RequestPanel(request);
    const panel = rapPanel.create();
    panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case 'request': {
          const { name, url, type, headers, body, options } = message;
          const t1 = performance.now();
          let newRequest: RequestModel;
          try {
            const result = await this.makeRequest(name, url, type, headers, body, options);
            newRequest = new RequestModel(name, url, type, headers, body, options);
            newRequest.result = result || 'No Content';
          } catch (error) {
            newRequest = new RequestModel(name, url, type, headers, body, options);
            newRequest.error = error.response ? error.response : error;
          } finally {
            newRequest.time = performance.now() - t1;
            rapPanel.reload(newRequest);
            this._menu.refresh();
          }
          break;
        }
        case 'copy': {
          ClipboardService.copy(message.text);
          vscode.window.showInformationMessage('Copied');
        }
      }
    });
  }
}
