import { ActionSheet, Badge } from 'antd-mobile';
import type { Action } from 'antd-mobile/es/components/action-sheet';
import { RightOutline } from 'antd-mobile-icons';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageWrapper } from '@/components/PageWrapper';
import { requestLogout } from '@/services/user';
import { atomNoticeCount, atomUserInfo } from '@/store/app';
import { redirectToLogin } from '@/utils/request';
import { css_flex_v_center } from '@/utils/style';

import styles from './style.module.less';

export default function Me() {
  const nav = useNavigate();
  const userInfo = useAtomValue(atomUserInfo);
  const noticeCount = useAtomValue(atomNoticeCount);
  const [visible, setVisible] = useState(false);

  const menuList: [React.ReactNode, () => any][] = [
    ['用户信息', () => nav('/me/info')],
    [
      <div key="1" style={css_flex_v_center}>
        <span style={{ marginRight: 10 }}>消息通知</span>
        {!!noticeCount && <Badge content={noticeCount} />}
      </div>,
      () => nav('/me/noticeCenter'),
    ],
    ['退出登录', () => setVisible(true)],
  ];

  const actions: Action[] = [
    {
      text: '退出登录',
      key: 'logout',
      danger: true,
      onClick: () => {
        requestLogout().then(() => redirectToLogin());
      },
    },
  ];

  return (
    <PageWrapper navbar={{ children: '个人中心', backArrow: false }}>
      <div className={styles.me}>
        <div className={styles.info}>
          <div className={styles.avatar}>
            <img src={userInfo.avatar} alt="" />
          </div>
          <div>{userInfo.name}</div>
        </div>
        <div className={styles.menus}>
          {menuList.map((el, index) => menuItem(index, el[0], el[1]))}
        </div>
      </div>
      <ActionSheet
        cancelText="取消"
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
      />
    </PageWrapper>
  );
}

function menuItem(key: number, title: React.ReactNode, onClick: () => any) {
  return (
    <div key={key} className={styles.menuItem} onClick={onClick}>
      <div className={styles.menuItemLeft}>
        <div>{title}</div>
      </div>
      <div className={styles.menuItemRight}>
        <RightOutline />
      </div>
    </div>
  );
}
