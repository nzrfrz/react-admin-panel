import { Link } from "react-router-dom";

import { 
    Dashboard,
    BasicFormsPage,
    DynamicFormPage,
    OtherEntriesPage,
    DemoPage1,
    DemoPage2A,
    DemoPage2B,
} from "../pages";

import { RxDot } from "react-icons/rx";
import { LuFormInput } from "react-icons/lu";
import { GiTargetDummy } from "react-icons/gi";
import { HomeOutlined } from "@ant-design/icons";

export const sidebarRouteRegistry = [
    {
        key: "dashboard",
        label: <Link to="/dashboard">Dashboard</Link>,
        path: "/dashboard",
        isIndex: true,
        element: <Dashboard />,
        icon: <HomeOutlined />,
        children: undefined,
    },
    {
        key: "components",
        label: "Components",
        path: "/components",
        isIndex: false,
        element: null,
        icon: <LuFormInput />,
        children: [
            {
                key: "formItems",
                label: <Link to="/components/form-items" >Form Items</Link>,
                path: "/components/form-items",
                element: <BasicFormsPage />,
                icon: <RxDot/>,
                children: undefined
            },
            {
                key: "otherComponents",
                label: <Link to="/components/other-entries" >Other Entries</Link>,
                path: "/components/other-entries",
                element: <OtherEntriesPage />,
                icon: <RxDot/>,
                children: undefined
            },
            {
                key: "bulkForm",
                label: <Link to="/components/bulk-form">Bulk Form</Link>,
                path: "/components/bulk-form",
                element: <DynamicFormPage />,
                icon: <RxDot/>,
                children: undefined
            },
        ],
    },
    {
        key: "breadcrumbSample",
        label: "Breadcrumb",
        path: "/breadcrumb",
        isIndex: false,
        element: null,
        icon: <GiTargetDummy />,
        children: [
            {
                key: "demoPage1",
                label: <Link to="/demo-page-1" >Demo Page 1</Link>,
                path: "/demo-page-1",
                element: <DemoPage1 />,
                icon: <RxDot/>,
                children: undefined
            },
            {
                key: "demoPage2",
                label: "Demo Page 2",
                path: "/demo-page-2",
                element: null,
                icon: <RxDot/>,
                children: [
                    {
                        key: "demoPage2A",
                        label: <Link to="/demo-page-2-a" >Demo Page 2A</Link>,
                        path: "/demo-page-2-a",
                        element: <DemoPage2A />,
                        icon: <RxDot/>,
                        children: undefined
                    },
                    {
                        key: "demoPage2B",
                        label: <Link to="/demo-page-2-b" >Demo Page 2B</Link>,
                        path: "/demo-page-2-b",
                        element: <DemoPage2B />,
                        icon: <RxDot/>,
                        children: undefined
                    },
                ]
            }
        ]
    }
];