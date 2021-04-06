import React, { lazy, Suspense } from 'react';
import { BasicInfoProps } from './BasicInfo';

const LazyBasicInfo = lazy(() => import('./BasicInfo'));

const BasicInfo = (props: BasicInfoProps & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyBasicInfo {...props} />
  </Suspense>
);

export default BasicInfo;
