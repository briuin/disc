import React, { lazy, Suspense } from 'react';
import { TitleSectionProps } from './TitleSection';

const LazyTitleSection = lazy(() => import('./TitleSection'));

const TitleSection = (props: TitleSectionProps & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTitleSection {...props} />
  </Suspense>
);

export default TitleSection;
