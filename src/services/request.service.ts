import requestPromise from 'request-promise';
import { RequestModel } from '../request.model';
import { isBlank } from '../utils/index';

export class RequestService {
  static request(requestModel: RequestModel) {
    try {
      let options: any = {
        method: requestModel.type,
        uri: requestModel.url,
      };
      if (!isBlank(requestModel.options)) {
        const inputOptions = JSON.parse(requestModel.options);
        options = { ...options, ...inputOptions };
      }
      if (!isBlank(requestModel.body)) {
        options.body = JSON.stringify(JSON.parse(requestModel.body));
      }
      if (!isBlank(requestModel.headers)) {
        options.headers = JSON.parse(requestModel.headers);
      }
      return requestPromise(options);
    } catch (error) {
      console.log(error);
      return Promise.reject('Invalid JSON format');
    }
  }
}
