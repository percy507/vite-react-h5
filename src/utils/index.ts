import { createNanoEvents } from 'nanoevents';

import uiConfig from '../ui.config.json';

export const eventbus = createNanoEvents();

/**
 *  基于设计稿比例以及实际页面的宽度，转换像素
 *
 * @export
 * @param {number} value  设计稿像素值
 * @return {string}
 */
export function toAdaptedPx(value: number): number {
  return value / (uiConfig.width / window.__adaptorWidth);
}

export function copyText(str: string) {
  let success = false;
  let textarea = document.createElement('textarea');
  textarea.style.cssText = `position:fixed; opacity:0;`;
  document.body.appendChild(textarea);
  textarea.value = str;
  textarea.focus();
  // ios not support textarea.select() method
  if (/(iPad|iPhone|iPod)/i.test(navigator.userAgent)) {
    textarea.setSelectionRange(0, str.length);
  } else textarea.select();
  try {
    success = document.execCommand('copy');
  } catch (err) {
    console.error('[copyText]:', err);
  }
  console.log(`[copyText]: ${success ? 'success' : 'failed'}`);
  document.body.removeChild(textarea);
  return success;
}

export function debounce<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  /** Default is 0. */
  wait = 0,
) {
  let timer = -1;
  return function (this: unknown, ...args: T): Promise<U> {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = window.setTimeout(() => {
        resolve(callback.call(this, ...args));
      }, wait);
    });
  };
}

export function throttle<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  /** Default is 0. */
  wait = 0,
) {
  let canRun = true;
  return function (this: unknown, ...args: T): Promise<U> | void {
    if (!canRun) return;
    canRun = false;
    return new Promise((resolve) => {
      window.setTimeout(() => {
        canRun = true;
        resolve(callback.call(this, ...args));
      }, wait);
    });
  };
}

/** 用千位分隔符格式化数字，不会格式化小数位，且仅支持三位小数 */
export function formatNumber(
  val: number | string,
  /** 有效数字的位数，默认2位 */
  decimal = 2,
  autoPadZero = true,
): string {
  let num = Number.parseFloat(`${val}`);
  if (Number.isNaN(num)) return '-';
  let str = num.toLocaleString('en-US');
  if (autoPadZero) str = str.includes('.') ? str : `${str}.000`;
  return decimal === 0
    ? str.replace(/\.\d*$/, '')
    : str.replace(/\.\d*$/, (v) => v.slice(0, decimal + 1));
}
