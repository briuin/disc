import React, { lazy, Suspense } from 'react';
import { PaginationProps } from './Pagination';

const LazyPagination = lazy(() => import('./Pagination'));

const Pagination = (props: PaginationProps & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPagination {...props} />
  </Suspense>
);

export default Pagination;
