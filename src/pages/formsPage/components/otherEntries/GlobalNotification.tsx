import { useContext } from "react";
import { GlobalContext } from "../../../../context/contextCreate";

import { Card } from "antd";
import { CustomButton } from "../../../../_components";

export function GlobalNotification() {
    const { openNotification } = useContext(GlobalContext);

    return (
        <Card title="Notification">
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                <CustomButton
                    colorType="info"
                    onClick={() => openNotification("info", "notif", "Title", "Sed ut perspiciatis unde omnis iste natus error si")}
                >
                    Info
                </CustomButton>
                <CustomButton
                    colorType="success"
                    onClick={() => openNotification("success", "notif", "Title", "Sed ut perspiciatis unde omnis iste natus error si")}
                >
                    Success
                </CustomButton>
                <CustomButton
                    colorType="warning"
                    onClick={() => openNotification("warning", "notif", "Title", "Sed ut perspiciatis unde omnis iste natus error si")}
                >
                    Warning
                </CustomButton>
                <CustomButton
                    colorType="error"
                    onClick={() => openNotification("error", "notif", "Title", "Sed ut perspiciatis unde omnis iste natus error si")}
                >
                    Error
                </CustomButton>
            </div>
        </Card>
    );
};