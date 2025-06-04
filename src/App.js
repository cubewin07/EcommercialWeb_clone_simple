import {  RouterProvider } from "react-router-dom";

import {routes} from "./Routes/routes.js";

function App() {
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
