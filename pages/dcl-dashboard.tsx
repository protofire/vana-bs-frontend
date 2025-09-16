import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

import PageNextJs from 'nextjs/PageNextJs';

const DCLDashboard = dynamic(() => import('ui/pages/DCLDashboard'), { ssr: false });

const Page: NextPage = () => {

  return (
    <PageNextJs pathname="/dcl-dashboard">
      <DCLDashboard/>
    </PageNextJs>
  );
};

export default Page;

export { base as getServerSideProps } from 'nextjs/getServerSideProps';
