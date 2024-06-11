import DefaultLayout from "../layout/DefaultLayout";
import Account from "../pages/Account";
import Blog from "../pages/Blog";
import Censor from "../pages/Censor";
import Edit from "../pages/Edit";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Person from "../pages/Person";
import Register from "../pages/Register";
import Write from "../pages/Write";

const publicRouter = [
  {
    path: '/',
    element: HomePage,
    layout: DefaultLayout
  },
  {
    path: '/topic/:name/:id',
    element: HomePage,
    layout: DefaultLayout
  },
  {
    path: '/write',
    element: Write,
    layout: DefaultLayout
  },
  {
    path: '/account/:id',
    element: Account,
    layout: DefaultLayout
  },
  {
    path: '/edit/:title/:id',
    element: Edit,
    layout: DefaultLayout
  },
  {
    path: '/p/:name',
    element: Person,
    layout: DefaultLayout
  },
  {
    path: '/:id/:title',
    element: Blog,
    layout: DefaultLayout
  },
  {
    path: '/censor',
    element: Censor,
    layout: DefaultLayout
  },
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/register',
    element: Register,
  },
]

export { publicRouter };