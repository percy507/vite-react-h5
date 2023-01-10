import { Badge, TabBar } from 'antd-mobile';
import { AppOutline, MessageOutline, UserOutline } from 'antd-mobile-icons';
import clsx from 'clsx';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { RouteTree } from '@/components/RouteUtils';
import { requestUserInfo } from '@/services/user';
import { atomNoticeCount, atomUserInfo } from '@/store/app';

import { routeList } from './config';
import styles from './style.module.less';

export default function MainLayout() {
  const nav = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const setUserInfo = useSetAtom(atomUserInfo);
  const noticeCount = useAtomValue(atomNoticeCount);

  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />,
    },

    {
      key: '/message',
      title: '消息',
      icon: <MessageOutline />,
    },
    {
      key: '/me',
      title: '我的',
      icon: <UserOutline />,
      badge: noticeCount ? Badge.dot : null,
    },
  ];
  const showTabbar = !!tabs.find((el) => pathname.startsWith(el.key));

  useEffect(() => {
    requestUserInfo().then(({ data }) => {
      setUserInfo(data);
    });
  }, [setUserInfo]);

  return (
    <div className={styles.mainLayout}>
      <div className={clsx(styles.content, showTabbar ? styles.hasTabbar : false)}>
        <RouteTree data={routeList} />
      </div>
      {showTabbar && (
        <div className={styles.tabbarWrapper}>
          <TabBar activeKey={pathname} onChange={(key) => nav(key)}>
            {tabs.map((item) => (
              <TabBar.Item
                key={item.key}
                icon={item.icon}
                badge={item.badge}
                title={item.title}
              />
            ))}
          </TabBar>
        </div>
      )}
    </div>
  );
}
