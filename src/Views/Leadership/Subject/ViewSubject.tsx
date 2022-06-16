import {
  DownloadOutlined,
  FileFilled,
  HeartFilled,
  MessageOutlined,
  PlayCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Col, Collapse, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { InputLabel } from "../../../Components/InputLabel";
import { SelectComp } from "../../../Components/Select";
import { ILesson } from "../../../redux/reducers/lesson.reducer";
import { getTopic, ITopic } from "../../../redux/reducers/topic.reducer";
import { AppDispatch } from "../../../redux/store";

const { Panel } = Collapse;
const { TabPane } = Tabs;

export const ViewSubject = () => {
  const params = useParams<{ idSub: string }>();
  const [question, setQuestion] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [data, setData] = useState<ITopic>();
  const [video, setVideo] = useState<any>();

  useEffect(() => {
    if (params.idSub) {
      dispatch(getTopic(params.idSub))
        .unwrap()
        .then((rs: ITopic) => {
          setData(rs);
          setVideo(rs.lesson[0].video);
        });
    }
  }, [params.idSub]);

  const subject = [
    {
      name: "Thương mại điện tử",
      value: "TMDT",
    },
    {
      name: "Nguyên lý kế toán",
      value: "NLKT",
    },
    {
      name: "Hệ thống thông tin",
      value: "HTTT",
    },
    {
      name: "Luật thương mại",
      value: "LTM",
    },
    {
      name: "Ngân hàng ",
      value: "NG",
    },
  ];

  const sorta = [
    { name: "Sắp xếp theo mới nhất", value: "Newest" },
    { name: "Sắp xếp theo cũ nhất", value: "Oldest" },
    { name: "Nhiều tương tác nhất", value: "Interactive" },
  ];

  const sortb = [
    { name: "Lọc những câu hỏi theo", value: "question" },
    { name: "Câu hỏi mới nhất", value: "NewestQues" },
    { name: "Câu hỏi cũ nhất", value: "OldestQues" },
    { name: "Câu hỏi được quan tâm nhất", value: "Carest" },
  ];

  return (
    <div className="viewSub">
      <BreadcrumbComp
        title="Xem bài giảng"
        prevPageTitle="Danh sách môn học"
        prevPage="subjects"
      />
      <Row>
        <Col span={16}>
          <video
            src={video}
            style={{ width: "100%", height: "50vh" }}
            controls
          ></video>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tổng quan" key="1">
              <Row>
                <Col span={3}>Giảng viên:</Col>
                <Col span={21}>{data?.subjectId.teacher.userName}</Col>
                <Col span={3}>Mô tả:</Col>
                <Col
                  span={21}
                  className={data?.description !== "" ? "scroll-box" : ""}
                >
                  {data?.description}
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Hỏi đáp" key="2">
              {question ? (
                <div>
                  <InputLabel label="Tiêu đề câu hỏi" />
                  <br />
                  <InputLabel labelTextarea="Nội dung" />
                  <div className="footer-btn">
                    <Button
                      className="default-btn"
                      onClick={() => setQuestion(false)}
                    >
                      Huỷ
                    </Button>
                    <Button style={{ marginLeft: "1rem" }} type="primary">
                      Gửi
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Row>
                    <Col span={20} className="flex-col">
                      <SelectComp
                        defaultValue="Tất cả môn học"
                        dataString={subject}
                      />
                      <SelectComp
                        defaultValue="Sắp xếp theo mới nhất"
                        dataString={sorta}
                      />
                      <SelectComp
                        defaultValue="Lọc những câu hỏi theo"
                        dataString={sortb}
                      />
                    </Col>
                    <Col span={4}>
                      <Button onClick={() => setQuestion(true)}>
                        Đặt câu hỏi
                      </Button>
                    </Col>
                  </Row>
                  <div className="scroll-box question">
                    <div className="sub-content">
                      <Row>
                        <Col span={2}>
                          <Avatar icon={<UserOutlined />} />
                        </Col>
                        <Col span={21} offset={1}>
                          <div className="flex-row">
                            <h4>Lor</h4>
                            <span
                              style={{
                                marginLeft: "1rem",
                                color: "gray",
                                fontSize: "12px",
                              }}
                            >
                              Bài 5
                            </span>
                            <span
                              style={{
                                marginLeft: "auto",
                                color: "gray",
                                fontStyle: "italic",
                                fontSize: "12px",
                              }}
                            >
                              6 ngày trước
                            </span>
                          </div>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                          <div className="flex-row">
                            <HeartFilled style={{ color: "red" }} />{" "}
                            <span className="gray">10</span>
                            <MessageOutlined style={{ marginLeft: "2rem" }} />
                            <span className="gray">10</span>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </>
              )}
            </TabPane>
            <TabPane tab="Thông báo môn học" key="3">
              <div className="scroll-box sub-noti">
                <Row className="noti-detail">
                  <Col span={7}>
                    <Row>
                      <Col span={3}>
                        <Avatar icon={<UserOutlined />} />
                      </Col>
                      <Col
                        span={20}
                        offset={1}
                        style={{ lineHeight: "normal" }}
                      >
                        <h4 style={{ marginBottom: "0" }}>
                          Trần Nguyễn Phú Phong
                        </h4>
                        <div className="flex-row">
                          <span className="time">Giáo viên</span>
                          <span style={{ marginLeft: "2rem" }} className="time">
                            6 giờ trước
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={17}>
                    <h3>LỊCH KIỂM TRA 1 TIẾT</h3>
                    <div style={{ lineHeight: "2rem" }}>
                      <b>Thời gian: </b> Thứ 5 ngày 20 tháng 01 năm 2021
                      <span style={{ marginLeft: "1rem" }}>
                        <b>Hình thức: </b> Tự luận
                      </span>
                      <br />
                      <b>Nội dung: </b> Nội dung kiểm tra tổng hợp từ bài đầu
                      tiên đến bài ở tiết sau cùng
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={8}>
          <h1>Nội dung môn học</h1>
          <hr />
          {data?.lesson.map((value: ILesson, index: number) => (
            <Collapse
              bordered={false}
              className="site-collapse-custom-collapse"
              key={value.id}
            >
              <Panel
                header={
                  <Row>
                    <Col span={18}>
                      Bài {index + 1}: {value.title}
                    </Col>
                    <Col span={6} className="time">
                      1/2|45 phút
                    </Col>
                  </Row>
                }
                key={value.id}
                className="site-collapse-custom-panel scrollbar"
              >
                <Row
                  className="sub-content"
                  onClick={() => setVideo(value.video)}
                >
                  <Col span={4}>
                    <PlayCircleFilled />
                  </Col>
                  <Col span={19} offset={1}>
                    <h4>{value.title}</h4>
                    <span>30 phút</span>
                  </Col>
                </Row>
                <br />
                {value.file.map((item: string, index: number) => {
                  const vid = item.split("/");
                  const fileType = vid[vid.length - 1].split("?")[0];
                  const fileName = fileType.split("%2F")[1];

                  return (
                    <a href={item} target="_blank">
                      <Row className="sub-content">
                        <Col span={4}>
                          <FileFilled />
                        </Col>
                        <Col span={19} offset={1}>
                          <h4>
                            {index + 1}. {fileName}
                          </h4>
                        </Col>
                      </Row>
                      <br />
                    </a>
                  );
                })}

                <Button>
                  <DownloadOutlined />
                  Tải xuống
                </Button>
              </Panel>
            </Collapse>
          ))}
        </Col>
      </Row>
    </div>
  );
};
