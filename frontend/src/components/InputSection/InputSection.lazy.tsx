import React, { lazy, Suspense } from 'react';

const LazyInputSection = lazy(() => import('./InputSection'));

const InputSection = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyInputSection {...props} />
  </Suspense>
);

export default InputSection;
