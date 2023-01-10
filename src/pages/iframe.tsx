import { useSearchParams } from 'react-router-dom';

import { PageWrapper } from '@/components/PageWrapper';

export default function IframePage() {
  const [query] = useSearchParams();
  const title = query.get('title') || '子网页';
  const url = query.get('url') || '';

  return (
    <PageWrapper navbar={{ children: title }} iframe={{ url: decodeURIComponent(url) }} />
  );
}
