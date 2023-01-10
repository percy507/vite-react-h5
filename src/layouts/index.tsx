import { Dialog } from 'antd-mobile';
import { lazy, useCallback, useEffect, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';

import { lr, navigateTo, RouteListener } from '@/components/RouteUtils';
import { debounce } from '@/utils';
import { getAuthToken, ls } from '@/utils/storage';

import uiConfig from '../ui.config.json';

// 设置 html 元素的 fontSize
const setupFontSize = () => {
  const htmlEle = document.documentElement;
  htmlEle.style.fontSize = `${(htmlEle.clientWidth / uiConfig.base_num).toFixed(3)}px`;
  window.__adaptorWidth = htmlEle.clientWidth;
};

window.addEventListener('DOMContentLoaded', () => setupFontSize());

export function AppLayout() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const isLogin = !!getAuthToken();

  // 异常上报
  const reportFrontendErr = () => {};

  useEffect(() => {
    reportFrontendErr();

    const resizeHandler = debounce(() => (setupFontSize(), forceUpdate()), 200);
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  const onRouteChange = useCallback(() => {
    if (VITE_MODE === 'local') return;
    fetch(`/build.json?t=${Date.now()}`)
      .then((res) => res.json())
      .then((res) => {
        try {
          let data = res || {},
            lastVersion = ls.get('build_version');
          if (lastVersion == null) return ls.set('build_version', data.version);
          if (data.version === lastVersion) return;
          ls.set('build_version', data.version);
          Dialog.alert({
            content: '系统已升级，请刷新页面后继续访问！',
            confirmText: '确定',
            onConfirm: () => location.reload(),
          });
        } catch (e) {
          console.error(e);
        }
      });
  }, []);

  return (
    <>
      <RouteListener onChange={onRouteChange} />
      <Routes>
        <Route
          path="/*"
          element={
            isLogin ? lr(lazy(() => import('./MainLayout'))) : navigateTo('/login')
          }
        />
        <Route path="/login" element={lr(lazy(() => import('@/pages/login')))} />
      </Routes>
    </>
  );
}
