import { CSSProperties } from "react";
import { Outlet } from "react-router-dom";

import { useSidebarMenuHook } from "../../_hooks";

import { Layout, Menu } from "antd";
import brandLogo from "../../assets/brand-logo-RGB.png";
import styles from "../../_styles/AdminLayout.module.css";
import { MenuBurger } from "./MenuBurger";

const { Header, Sider, Content, Footer } = Layout;

export const AdminLayout = () => {

    const {
        collapsed, setCollapsed,
        setIsShrink,
        openKeys, setOpenKeys,
        collapsableWidth,
        layoutStyles,
        brandTextLogo,
        sidebarItems,
        currentRouteKeys,
        onOpenChangeMenu,
        handleClickedMenu,
        handleClickedMobileSiderMask
    } = useSidebarMenuHook();

    return (
        <Layout style={{ height: "100vh" }}>
            <MenuBurger 
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
            <Sider 
                width={230}
                collapsible
                trigger={null}
                breakpoint="lg"
                style={layoutStyles.sider as CSSProperties}
                collapsed={collapsed}
                collapsedWidth={collapsableWidth}
                onBreakpoint={(broken) => setIsShrink(broken)}
                onCollapse={(isCollapsed) => setCollapsed(isCollapsed)}
            >
                <div className={layoutStyles.siderHeader}>
                    <div className={styles.headerImgWrapper}>
                        <img src={brandLogo} />
                    </div>
                    <div className={layoutStyles.textBrandLogo}>
                        <img src={brandTextLogo} />
                    </div>
                </div>
                <Menu 
                    mode="inline"
                    inlineIndent={16}
                    openKeys={openKeys}
                    items={sidebarItems}
                    triggerSubMenuAction="click"
                    selectedKeys={currentRouteKeys}
                    onOpenChange={onOpenChangeMenu}
                    defaultSelectedKeys={currentRouteKeys}
                    defaultOpenKeys={currentRouteKeys as string[]}
                    onSelect={(event) => setOpenKeys(event.keyPath)}
                    style={layoutStyles.siderMenu as CSSProperties}
                    onClick={handleClickedMenu}
                />
            </Sider>
            <Layout>
                <Header style={layoutStyles.navbar as CSSProperties} >
                    Nav Bar
                </Header>
                <Content className={styles.contentContainer}>
                    <Outlet />
                </Content>
                <Footer className={styles.footerContainer}>
                    <span>Admin Panel ©2023 by nzrfrz</span>
                </Footer>
            </Layout>
            <div style={layoutStyles.mobileSiderMask as CSSProperties} onClick={handleClickedMobileSiderMask} />
        </Layout>
    );
};