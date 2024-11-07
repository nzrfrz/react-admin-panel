import { useContext, useEffect, useMemo, useRef } from "react";
import { FnbContext } from "../fnbContext/fnbContextCreate";

import { CustomButton, MainContainer } from "../../../../_components";

import { Card, Col, Divider, Row, Spin, Tag } from "antd";
import { FiMoreVertical } from "react-icons/fi";
import { CheckCircleOutlined, StopOutlined } from '@ant-design/icons';
import { FnBProps } from "../../../../_utils";

export function FnbGridContentType() {
  const {
    infiniteFnbList,
    onClickActionMenu,
  } = useContext(FnbContext);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const infiniteFnbData = useMemo(() => {
    return infiniteFnbList?.data?.pages.map((item) => item.data.itemList).flat();
  }, [infiniteFnbList?.data?.pages]);
  console.log(infiniteFnbData?.map((item) => item.id));
  

  useEffect(() => {
    if (infiniteFnbData === undefined) return;

    const handleScroll = () => {
      if (
        containerRef.current &&
        infiniteFnbList?.hasNextPage &&
        !infiniteFnbList.isFetchingNextPage
      ) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
          infiniteFnbList.fetchNextPage();
        }
      }
    };

    const containerElement = containerRef.current;
    containerElement?.addEventListener('scroll', handleScroll);

    return () => {
      containerElement?.removeEventListener('scroll', handleScroll);
    };
  }, [infiniteFnbList?.hasNextPage, infiniteFnbList?.isFetchingNextPage, infiniteFnbList?.fetchNextPage]);

  const RenderProductStatus: React.FC<{ fnbItem: FnBProps }> = ({ fnbItem }) => {
    if (fnbItem?.status === "UNAVAILABLE") return (
      <Tag color={"red"}><StopOutlined /> Unavailable</Tag>
    );
    else return (
      <Tag color={"lime"}><CheckCircleOutlined /> Available</Tag>
    );
  };

  if (infiniteFnbList?.isFetching && infiniteFnbList.isFetchingNextPage === false) return (
    <MainContainer>
      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Spin size="large" />
          <span style={{ fontSize: 16, fontWeight: 400 }}>Processing data ...</span>
        </div>
      </div>
    </MainContainer>
  );

  return (
    <>
      <Row ref={containerRef} gutter={[12, 12]} style={{ position: "relative", overflowY: "scroll", paddingBottom: 16 }}>
        {
          infiniteFnbData?.map((item) => (
            <Col
              key={item.id}
              xs={{ flex: '100%' }}
              sm={{ flex: '50%' }}
              md={{ flex: '33.3%' }}
              lg={{ flex: '25%' }}
              xl={{ flex: '25%' }}
            >
              <Card
                hoverable
                cover={
                  <img
                    height={150}
                    alt={item.name}
                    src={item.image.url === "" ? import.meta.env.VITE_BROKEN_IMAGE_URL : item.image.url}
                    style={{ objectFit: item.image.url === "" ? "contain" : "cover", paddingTop: item.image.url === "" ? 8 : 0 }}
                  />
                }
                styles={{
                  body: { padding: 0 }
                }}
              >
                <div style={{ padding: "8px 8px" }}>
                  <span className="ellipsis-text" style={{ fontSize: 16, fontWeight: 500 }}>{item?.name}</span>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{item.category.title}</span>
                    <span style={{ fontSize: 16, fontWeight: 500 }}>$ {item?.price}</span>
                  </div>
                  <div style={{ marginTop: 8, minHeight: 50 }}>
                    <span className="two-line-ellipsis-text">{item?.description}</span>
                  </div>
                  <Divider style={{ margin: "4px 0px", }} />
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8 }}>
                    <RenderProductStatus
                      fnbItem={item}
                    />
                    <CustomButton
                      size="small"
                      shape="circle"
                      icon={<FiMoreVertical />}
                      onClick={() => onClickActionMenu(item)}
                    />
                  </div>
                </div>
              </Card>
            </Col>
          ))
        }
      </Row>
      <div
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: infiniteFnbList?.isFetchingNextPage === true && infiniteFnbList?.hasNextPage === true ? "flex" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "", gap: 8 }}>
          <Spin size="default" />
          <span>Loading more data ...</span>
        </div>
      </div>
    </>
  );
};