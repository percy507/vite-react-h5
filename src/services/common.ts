import request from '@/utils/request';

export function requestVerifyCodeUrl(cert: string) {
  console.log(request);
  // return request.get(`/api/verifycode?cert=${cert}`);
  console.log(cert);
  return Promise.resolve({
    data: 'https://raw.githubusercontent.com/produck/svg-captcha/1.x/media/example.png',
  });
}
