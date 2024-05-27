import * as vscode from 'vscode';
import { HistoryTreeItem } from './HistoryTreeItem';
import { RapTreeItem } from './RapTreeItem';

export class RapTreeDataProvider implements vscode.TreeDataProvider<RapTreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<RapTreeItem | undefined> = new vscode.EventEmitter<
    RapTreeItem | undefined
  >();

  readonly onDidChangeTreeData: vscode.Event<RapTreeItem | undefined> = this._onDidChangeTreeData.event;

  getChildren(element?: RapTreeItem): Thenable<RapTreeItem[]> {
    if (!element) {
      return Promise.resolve(this.getMenuItems());
    }
    return Promise.resolve(element.getChildren());
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: RapTreeItem): vscode.TreeItem {
    return element;
  }

  private getMenuItems() {
    return [
      new RapTreeItem(
        'New Request',
        vscode.TreeItemCollapsibleState.None,
        {
          command: 'Shooter.newRequest',
          title: 'New Request',
        },
        'new-request.png'
      ),
      new HistoryTreeItem(
        'History',
        vscode.TreeItemCollapsibleState.Collapsed,
        {
          command: '',
          title: 'History',
        },
        'history.png'
      ),
    ];
  }
}
