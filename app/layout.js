// my-next-app\app\layout.js

import "@styles/globals.css"
import Provider from "@components/Provider";
import Sidebar from "@components/Sidebar";

export const metadata = {
  title:"DiceFeed",
  description: "where creativity meets competition"
}

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient"/>
        </div>
        <main className="app">
          <Sidebar />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
