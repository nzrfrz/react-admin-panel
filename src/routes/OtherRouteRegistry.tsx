import { 
    DemoProductDetailPage, 
    DemoProductEditPage
} from "../pages";

export const otherRoutesRegistry = [
    {
        key: "demoDetailPage",
        label: null,
        path: "/demo-page-2-b/demo-detail/:id", // must include the parent route to extract the path into breadcrumb
        isIndex: false,
        element: <DemoProductDetailPage />,
        icon: null,
    },
    {
        key: "demoEditPage",
        label: null,
        path: "/demo-page-2-b/demo-detail/edit/:id",  // must include the parent route to extract the path into breadcrumb
        isIndex: false,
        element: <DemoProductEditPage />,
        icon: null,
    },
];