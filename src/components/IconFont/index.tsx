import { clsx } from 'clsx';

import styles from './style.module.less';

interface IconFontProps {
  style?: React.CSSProperties;
  className?: string;
  type: string;
}

export function IconFont(props: IconFontProps) {
  const { style, className, type } = props;
  return (
    <span className={clsx(styles.iconfont, className)} style={style} data-icontype={type}>
      <svg
        width="1em"
        height="1em"
        fill="currentColor"
        focusable="false"
        aria-hidden="true">
        <use xlinkHref={`#${type}`} />
      </svg>
    </span>
  );
}
