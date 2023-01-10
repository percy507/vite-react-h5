import { Toast } from 'antd-mobile';
import * as qs from 'qss';

import config from './config';
import { getAuthToken } from './storage';

export function redirectToLogin() {
  localStorage.clear();
  // window.location.href = `/login?${qs.encode({
  //   from_page: encodeURIComponent(location.href),
  // })}`;
  window.location.href = '/login';
}

// 标准后端响应数据格式
export interface STD_RESPONSE_FORMAT {
  code: BUSINESS_CODE;
  data: any;
  message: string;
}

// 业务code
export enum BUSINESS_CODE {
  SUCCESS_CODE = 20000, // 请求成功
  TOKEN_INCORRECT = 40007, // token错误
  TOKEN_EXPIRED = 40008,
  TOKEN_INVALID = 40009,
  TOKEN_DECODE = 40010,

  RE_LOGIN = 40015, // 其它设备已登录
  TOKEN_ISEMPTY = 40016, // 未登陆
  TOKEN_OVERDUE = 40017, // 登陆过期
}

class Request {
  serverUrl = config.BASE_API;

  fetch = (url: string, options: RequestInit = {}) => {
    let realUrl = url.match(/^(http)|(\/\/)/) ? url : `${this.serverUrl}${url}`;
    let headers = { ...(options.headers ? options.headers : {}) };
    if (getAuthToken()) headers['Authorization'] = getAuthToken();

    const promiseList = [
      window.fetch(realUrl, { ...options, headers }),
      // fetch 请求60秒超时判断
      new Promise((_resolve, reject) => {
        setTimeout(() => reject(new Error('请求超时')), 60000);
      }),
    ];

    return Promise.race(promiseList)
      .then((response) => response as Response)
      .then(this.checkHttpStatus)
      .then(this.parseResponseResult)
      .then(this.checkBusinessCode)
      .catch((error) => {
        return Promise.reject(error);
      });
  };

  checkHttpStatus = (response: Response) => {
    const { status: statusCode, statusText, url } = response;
    if (statusCode >= 200 && statusCode < 300) return response;

    const message = `请求错误: ${statusCode}[${statusText}]`;
    Toast.show({ icon: 'fail', content: message });

    return Promise.reject(JSON.stringify({ message, url }));
  };

  parseResponseResult = (response: Response) => {
    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.indexOf('json') > -1) {
      return response.json();
    } else if (contentType && contentType.indexOf('octet-stream') > -1) {
      return response.blob();
    } else if (contentType && contentType.indexOf('image') > -1) {
      return response.blob();
    }

    return response.text();
  };

  checkBusinessCode = (response: any) => {
    if (typeof response === 'object' && response.code !== undefined) {
      const stdResponse = response as STD_RESPONSE_FORMAT;
      const code = stdResponse.code;
      const msg = stdResponse.message;

      switch (code) {
        case BUSINESS_CODE.SUCCESS_CODE:
          return stdResponse;
        case BUSINESS_CODE.TOKEN_INCORRECT:
        case BUSINESS_CODE.TOKEN_EXPIRED:
        case BUSINESS_CODE.TOKEN_INVALID:
        case BUSINESS_CODE.TOKEN_DECODE:
        case BUSINESS_CODE.RE_LOGIN:
        case BUSINESS_CODE.TOKEN_ISEMPTY:
        case BUSINESS_CODE.TOKEN_OVERDUE:
          setTimeout(() => redirectToLogin(), 2000);
          break;
        default:
          break;
      }

      Toast.show({ icon: 'fail', content: msg });
      return Promise.reject(response);
    }

    return response;
  };

  get = (url: string) => {
    return this.fetch(url, { method: 'GET' });
  };

  post = (url: string, data?: Record<string, any>) => {
    return this.fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      method: 'POST',
      body: data ? qs.encode(data) : undefined,
    });
  };

  postJson = (url: string, data?: Record<string, any>) => {
    return this.fetch(url, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  };

  // post large binary data, eg: file
  postFormData = (url: string, data?: Record<string, any>) => {
    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    return this.fetch(url, { method: 'POST', body: formData });
  };

  putJson = (url: string, data?: Record<string, any>) => {
    return this.fetch(url, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  };

  delete = (url: string) => {
    return this.fetch(url, { method: 'DELETE' });
  };
}

export default new Request();
