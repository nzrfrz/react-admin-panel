# React Admin Panel

Admin panel with react typescript, antd and antd-mobile as UI library.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Routing

This project using `react-router-dom` to routing between pages.  And the route file is in `src/routes/`.  The detail explanation about every file inside the routes folder is below:

File Name | Description
---- | ----
MainRoutes.tsx | Use to pool all routes from route registry by using a javascript `.map` function to list all path and pages label in route registry, and call it inside `App.tsx`.
PrivateRoute.tsx | Use to wrap route registry except `PublicRouteRegistry.tsx`, and apply the user auth logic.
PublicRoute.tsx | Wrap `PublicRouteRegistry.tsx` and also apply auth logic.
SidebarRouteRegistry.tsx | Register the route page with javascript array of object format.  It will be called in antd layout component as a [sidebar menu](https://ant.design/components/menu?theme=dark) in the admin panel page (Private Route).
OtherRouteRegistry.tsx | Page that does not need to be shown inside `sidebar menu` as long as it is part of the `private route`.
PublicRouteRegistry.tsx | This registry will be outside the `private route`, like landing page route pages, login, register.

### Route Registry Props
key | value
---- | ----
key | string (recommended using lower and snakeCase)
label | LinkProps or string or null (set this to string if `children` is not empty)
path | path string ("/dashboard")
isIndex | boolean
element | React.FC or JSX.Element or null (set this to `null` if `children` is not empty)
icon | React.FC or JSX.Element (antd icons, react icons)
children | `[this object props]` (set to `undefined` if does not need a children)