import { Link } from "react-router-dom";

import { 
    Dashboard,
    BasicFormsPage,
    DummyPage1,
    DummyPage2A,
    DummyPage2B,
    DynamicFormPage,
    OtherEntriesPage,
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
                key: "dummyPage1",
                label: <Link to="/dummy-page-1" >Dummy Page 1</Link>,
                path: "/dummy-page-1",
                element: <DummyPage1 />,
                icon: <RxDot/>,
                children: undefined
            },
            {
                key: "dummyPage2",
                label: "Dummy Page 2",
                path: "/dummy-page-2",
                element: null,
                icon: <RxDot/>,
                children: [
                    {
                        key: "dummyPage2A",
                        label: <Link to="/dummy-page-2-a" >Dummy Page 2A</Link>,
                        path: "/dummy-page-2-a",
                        element: <DummyPage2A />,
                        icon: <RxDot/>,
                        children: undefined
                    },
                    {
                        key: "dummyPage2B",
                        label: <Link to="/dummy-page-2-b" >Dummy Page 2B</Link>,
                        path: "/dummy-page-2-b",
                        element: <DummyPage2B />,
                        icon: <RxDot/>,
                        children: undefined
                    },
                ]
            }
        ]
    }
];