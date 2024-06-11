import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { publicRouter } from "./routers";

function App() {

  return (
    <div className="app">
      <Router>
        <Routes>
          {
            publicRouter.map((value, index) => {
              const Page = value.element;
              const Layout = value?.layout;
              return (
                <Route
                  key={index}
                  path={value.path}
                  element={
                    Layout ?
                      <Layout>
                        <Page />
                      </Layout>
                      : <Page />
                  }
                />
              )
            })
          }
        </Routes>
      </Router>
    </div>
  )
}

export default App
