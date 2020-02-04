import React from 'react';
import Layout from "./core/components/NavigationBar/index"

const App = () => {



  return (
<Layout>
  <div className="search-side-menu">
  <div className="container">
      <input type="text" placeholder="Search for lesson..." />
      <div className="search"></div>
  </div>
  </div>
</Layout>
  )
}

export default App;
