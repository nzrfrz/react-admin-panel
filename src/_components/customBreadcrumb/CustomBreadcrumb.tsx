import { useCustomBreadcrumb } from './useCustomBreadcrumb';

import { buttonShape, CustomButton } from '../CustomButton';

import { LeftOutlined } from '@ant-design/icons';
import styles from "../../_styles/CustomBreadcrumb.module.css";

export function CustomBreadcrumb () {
    const {
        navigateTo,
        renderBreadcrumb,
        renderBackButtonText,
        renderBackButtonShape,
        breadcrumbContainerRef,
    } = useCustomBreadcrumb();

    return (
        <div className={styles.container}>
            <div className={styles.backBtnWrapper}>
                <CustomButton
                    size="middle"
                    colorType="default"
                    icon={<LeftOutlined />}
                    onClick={() => navigateTo(-1)}
                    shape={renderBackButtonShape as buttonShape}
                >
                    {renderBackButtonText}
                </CustomButton>
            </div>
            <div ref={breadcrumbContainerRef} className={styles.breadcrumbContainer}>
                <div className={styles.breadcrumbLinkContainer}>
                    {renderBreadcrumb}
                </div>
            </div>
        </div>
    );
};