import { Tag } from 'antd-mobile';

/** 基于枚举的自定义颜色Tag */
export function enumTag(
  v: any,
  /** 枚举 */
  enumObj: object,
  /** 关联当前枚举的颜色枚举 */
  enumColorObj: object,
  fallback?: string,
) {
  if (v === null || v === undefined) return fallback;
  return <Tag color={enumColorObj[enumObj[v]]}>{enumObj[v]}</Tag>;
}

/** 审批状态 */
export enum PROCESS_STATUS {
  审核中 = 1,
  审批通过 = 2,
  审批拒绝 = 3,
}

/** 审批状态颜色 */
export enum PROCESS_STATUS_COLOR {
  审核中 = 'rgba(250, 140, 22, 1)',
  审批通过 = 'rgba(82, 196, 26, 1)',
  审批拒绝 = 'rgba(245, 34, 45, 1)',
}
