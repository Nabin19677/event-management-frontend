import React from 'react';

const PublicLayout = ({ children }:  React.PropsWithChildren) => {
  return (
    <div className="public-layout">
      {children}
    </div>
  );
};

export default PublicLayout;