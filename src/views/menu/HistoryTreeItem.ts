import { RequestModel } from '../../request.model';
import { HistoryService } from '../../services/history.service';
import { RapTreeItem } from './RapTreeItem';
import { RequestTreeItem } from './RequestTreeItem';

export class HistoryTreeItem extends RapTreeItem {
  getChildren() {
    const history = HistoryService.getAll() || [];
    return history.map((requestData: any) => {
      const request = new RequestModel(
        requestData.name,
        requestData.url,
        requestData.type,
        requestData.headers,
        requestData.body,
        requestData.options
      );
      return new RequestTreeItem(request.name || request.url, request);
    });
  }
}
