import img403 from './403.svg';
import img404 from './404.svg';
import img500 from './500.svg';
import styles from './style.module.less';

const typeMap = {
  403: {
    img: img403,
    title: '403',
    desc: '抱歉，你无权访问该页面',
  },
  404: {
    img: img404,
    title: '404',
    desc: '很抱歉! 您访问的页面不存在，\n请稍后再试',
  },
  500: {
    img: img500,
    title: '500',
    desc: '很抱歉! 您查找的页面渲染错误，\n请稍后再试',
  },
};

interface ExceptionProps {
  type: keyof typeof typeMap;
  style?: React.CSSProperties;
}

export function Exception(props: ExceptionProps) {
  const { type, style } = props;
  const pageType = type in typeMap ? type : '404';
  const configObj = typeMap[pageType];

  return (
    <div className={styles.exception} style={style}>
      <img className={styles.imgEle} src={configObj.img} alt="" />
      <div className={styles.content}>
        <div className={styles.desc}>{configObj.desc}</div>
        <div className={styles.actions}></div>
      </div>
    </div>
  );
}
