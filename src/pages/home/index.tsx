import { Swiper } from 'antd-mobile';
import { SoundOutline } from 'antd-mobile-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageWrapper } from '@/components/PageWrapper';
import { toAdaptedPx } from '@/utils';
import { css_ellipsis_line1 } from '@/utils/style';

import styles from './style.module.less';

export default function Home() {
  const nav = useNavigate();
  const [news, setNews] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    setNews([
      {
        id: 1,
        bg: 'https://cdn.pixabay.com/photo/2019/09/07/07/42/animal-4458133__480.jpg',
      },
      {
        id: 2,
        bg: 'https://cdn.pixabay.com/photo/2022/11/22/13/21/otter-7609666_640.jpg',
      },
      {
        id: 3,
        bg: 'https://cdn.pixabay.com/photo/2021/10/31/15/17/animal-6757789__480.jpg',
      },
    ]);
    setNotices([
      { id: 1, title: '公告111' },
      { id: 2, title: '公告122222222222222222222222222222' },
      { id: 3, title: '333333333333333' },
    ]);
  }, []);

  return (
    <PageWrapper navbar={{ children: '首页', backArrow: false }}>
      <div className={styles.home}>
        <h1>我是首页</h1>

        {news.length ? (
          <div className={styles.news}>
            <Swiper autoplay loop indicator={news.length === 1 ? () => null : undefined}>
              {news.map((el, index) => {
                return (
                  <Swiper.Item key={index}>
                    <div className={styles.newsCard} onClick={() => nav('/')}>
                      <div style={{ backgroundImage: `url(${el.bg})` }}></div>
                    </div>
                  </Swiper.Item>
                );
              })}
            </Swiper>
          </div>
        ) : null}
        {!!notices.length && (
          <div className={styles.noticeBar}>
            <div className={styles.closeBar}>
              <SoundOutline />
            </div>
            <Swiper
              autoplay
              loop={notices.length > 1}
              indicator={() => null}
              direction="vertical"
              style={{ '--height': `${toAdaptedPx(32)}px` }}>
              {notices.map((el, index) => {
                return (
                  <Swiper.Item key={index}>
                    <div style={css_ellipsis_line1}>{el.title}</div>
                  </Swiper.Item>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
