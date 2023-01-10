import { Button } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

import { PageWrapper } from '@/components/PageWrapper';
import { Demo as TinyMCEPreviewDemo } from '@/components/TinyMCEPreview/demo';

import styles from './style.module.less';

export default function Message() {
  const nav = useNavigate();

  return (
    <PageWrapper>
      <div className={styles.message}>
        <h1>我是 message 页</h1>
        <div className={styles.btns}>
          <Button
            onClick={() =>
              nav(
                `/iframe?title=菜鸟教程&url=${encodeURIComponent(
                  'https://www.runoob.com/',
                )}`,
              )
            }>
            测试 iframe 嵌套
          </Button>
          <Button>TinyMCEPreview组件</Button>
        </div>

        <div className={styles.part}>
          <h3>TinyMCEPreview 组件</h3>
          <TinyMCEPreviewDemo />
        </div>
      </div>
    </PageWrapper>
  );
}
