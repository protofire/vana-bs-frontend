import React from 'react';

import config from 'configs/app';
import PageTitle from 'ui/shared/Page/PageTitle';

const DCLDashboard = () => {
  const dclDashboard = config.features.dclDashboard;

  return (
    <div className="dcl-dashboard-wrapper">
      <PageTitle
        title={ config.meta.seo.enhancedDataEnabled ? `${ config.chain.name } — Data Capital Locked (DCL)` : 'DCL Dashboard' }
      />

      { dclDashboard.isEnabled && (
        <iframe src={ dclDashboard.url } className="dcl-dashboard"></iframe>
      ) }
    </div>
  );
};

export default DCLDashboard;
