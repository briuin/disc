import React, { lazy, Suspense } from 'react';

const LazyBasicInfo = lazy(() => import('./BasicInfo'));

const BasicInfo = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyBasicInfo {...props} />
  </Suspense>
);

export default BasicInfo;
