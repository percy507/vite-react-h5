import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import { lr, navigateTo } from '@/components/RouteUtils';
import { Page404 } from '@/pages/exception';

export const routeList: RouteObject[] = [
  { index: true, element: navigateTo('/home') },
  {
    path: '/home',
    element: lr(lazy(() => import('@/pages/home'))),
  },
  {
    path: '/message',
    children: [{ index: true, element: lr(lazy(() => import('@/pages/message'))) }],
  },
  {
    path: '/me',
    children: [
      { index: true, element: lr(lazy(() => import('@/pages/me'))) },
      { path: 'info', element: lr(lazy(() => import('@/pages/me/userinfo'))) },
    ],
  },
  { path: '/iframe', element: lr(lazy(() => import('@/pages/iframe'))) },
  { path: '404', element: Page404() },
  { path: '*', element: navigateTo('/404') },
];
