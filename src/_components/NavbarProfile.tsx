import { useState } from "react";

import { Dropdown, Divider } from "antd";
import {
    UserOutlined,
    SettingOutlined
} from '@ant-design/icons';
import offIcon from "../assets/off-icon.png";
import defaultProfilePic from "../assets/default-profile-pic.png";
import styles from "../_styles/CustomDropdown.module.css";

export function NavbarProfile() {
    const [openDD, setOpenDD] = useState(false);

    return (
        <Dropdown
            menu={{}}
            open={openDD}
            trigger={['click']}
            placement="bottomRight"
            onOpenChange={(flag) => setOpenDD(flag)}
            dropdownRender={() => (
                <div className={styles.customDDContainer}>
                    <div className={styles.dropdownItemListWrapper}>
                        <span>Profile</span>
                        <UserOutlined />
                    </div>
                    <div className={styles.dropdownItemListWrapper}>
                        <span>Setting</span>
                        <SettingOutlined />
                    </div>
                    <Divider style={{ margin: "8px 0px", padding: 0 }} />
                    <div className={styles.dropdownLogoutWrapper}>
                        <img src={offIcon} />
                        <span>Log Out</span>
                    </div>
                </div>
            )}
        >
            <div className={styles.triggerButtonContainer}>
                <img src={defaultProfilePic} />
            </div>
        </Dropdown>
    );
};