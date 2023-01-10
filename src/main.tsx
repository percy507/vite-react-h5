import 'normalize.css';
import './styles/global.less';

import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import dayjs from 'dayjs';
import dayjsZhCN from 'dayjs/locale/zh-cn';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import { Provider } from 'jotai';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import VConsole from 'vconsole';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Page500 } from '@/pages/exception';

import { AppLayout } from './layouts';

dayjs.extend(dayjsRelativeTime);
dayjs.locale(dayjsZhCN);

// 在开发环境和测试环境下打开控制台工具;
if (['local', 'dev', 'test'].includes(VITE_MODE)) {
  new VConsole();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <ErrorBoundary fallback={<Page500 />}>
      <Provider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </ConfigProvider>,
);
