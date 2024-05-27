import * as vscode from 'vscode';
import { MainController } from './main.controller';
import { RequestModel } from './request.model';
import { RapTreeDataProvider } from './views/menu/RapTreeDataProvider';

export function activate(context: vscode.ExtensionContext) {
  const rapTreeDataProvider = new RapTreeDataProvider();
  const controller = new MainController(rapTreeDataProvider);
  context.subscriptions.push(vscode.window.registerTreeDataProvider('Menu', rapTreeDataProvider));
  context.subscriptions.push(
    vscode.commands.registerCommand('Shooter.newRequest', () => {
      const request = new RequestModel('', '', 'GET', '{}', '', '{"proxy":""}');
      controller.createRequestPanel(request);
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('Shooter.historyRequest', (request: RequestModel) => {
      controller.createRequestPanel(request);
    })
  );

  
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'Shooter.makeRequest',
      (name: string, url: string, type: string, headers: string, body: string, form: string) => {
        return controller.makeRequest(name, url, type, headers, body, form);
      }
    )
  );
}

export function deactivate() {}
