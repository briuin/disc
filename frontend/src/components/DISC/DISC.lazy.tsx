import React, { lazy, Suspense } from 'react';
import { DISCProps } from './DISC';

const LazyDISC = lazy(() => import('./DISC'));

const DISC = (props: DISCProps & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDISC {...props} />
  </Suspense>
);

export default DISC;
