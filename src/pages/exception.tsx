import { Exception } from '@/components/Exception';
import { PageWrapper } from '@/components/PageWrapper';

export function Page403() {
  return (
    <PageWrapper navbar={{ children: '无权限' }}>
      <Exception type={403} />
    </PageWrapper>
  );
}

export function Page404() {
  return (
    <PageWrapper navbar={{ children: '页面不存在' }}>
      <Exception type={404} />
    </PageWrapper>
  );
}

export function Page500() {
  return (
    <PageWrapper navbar={{ children: '页面渲染错误' }}>
      <Exception type={500} />
    </PageWrapper>
  );
}
