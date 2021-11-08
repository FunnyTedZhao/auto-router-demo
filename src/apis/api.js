import axios from '@/plugins/axios';

export default class DemoAPI {
  static getRoutes() {
    const url = '/list';
    return axios.get(url).then((res) => res.data);
  }
}
