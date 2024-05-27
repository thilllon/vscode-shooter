import * as vscode from 'vscode';
import { RapTreeItem } from './RapTreeItem';
import { RequestModel } from '../../request.model';

export class RequestTreeItem extends RapTreeItem {
  request: RequestModel;
  constructor(
    readonly label: string,
    request: RequestModel
  ) {
    super(
      label,
      vscode.TreeItemCollapsibleState.None,
      {
        command: 'Shooter.historyRequest',
        title: 'History Request',
        arguments: [request],
      },
      'history-request.png'
    );
    this.request = request;
  }
}
