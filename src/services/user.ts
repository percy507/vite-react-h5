import request from '@/utils/request';

export function requestSendSMS(params) {
  // return request.postJson('/xxx/sms-login', params);
  return Promise.resolve(params);
}

export function requestSMSLogin(params) {
  // return request.postJson('/xxx/sms-login', params);
  console.log(params);
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({ data: { token: 'jwt__token' } });
    }, 2000);
  });
}

export function requestLogout() {
  console.log(request);
  return Promise.resolve();
}

export function requestUserInfo() {
  // return request.get('/xxx/userinfo');
  return Promise.resolve<any>({
    data: {
      name: 'Will Smith',
      age: 56,
      unread: 16,
      avatar: 'https://vite-react-admin.vercel.app/imgs/avatar.jpg',
    },
  });
}
