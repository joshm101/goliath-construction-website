import React, { FunctionComponent } from "react";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div>
      {children}

      <style jsx global>
        {`
          body {
            background: #ddd;
            color: #111;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
