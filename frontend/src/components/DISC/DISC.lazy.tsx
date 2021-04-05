import React, { lazy, Suspense } from 'react';

const LazyDISC = lazy(() => import('./DISC'));

const DISC = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDISC {...props} />
  </Suspense>
);

export default DISC;
