import { Form } from 'antd-mobile';
import { useAtomValue } from 'jotai';

import { PageWrapper } from '@/components/PageWrapper';
import { atomUserInfo } from '@/store/app';

export default function UserInfo() {
  const info = useAtomValue(atomUserInfo);

  return (
    <PageWrapper navbar={{ children: '用户信息' }}>
      <Form layout="horizontal">
        <Form.Item label="用户名称">{info.name}</Form.Item>
      </Form>
    </PageWrapper>
  );
}
