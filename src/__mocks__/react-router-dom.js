import React from 'react';

// Minimal mocks for react-router-dom used in the app during Jest tests.
export const BrowserRouter = ({ children }) => <div>{children}</div>;
export const HashRouter = ({ children }) => <div>{children}</div>;
export const MemoryRouter = ({ children }) => <div>{children}</div>;
export const Link = ({ to, children, ...rest }) => (
  <a href={to} {...rest}>
    {children}
  </a>
);
export const NavLink = ({ to, children }) => (
  <a href={to}>{children}</a>
);
export const useNavigate = () => () => {};
export const useLocation = () => ({ pathname: '/' });
export const useParams = () => ({});
export const RouterProvider = ({ router }) => <div>{/* mock router */}</div>;
export const createHashRouter = () => ({});
export const createRoutesFromElements = () => [];
export const Route = ({ children }) => <>{children}</>;
export const Routes = ({ children }) => <>{children}</>;
