import { CheckCircleOutlined } from "@ant-design/icons";
import { Checkbox, Col, Radio, Row, Space } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import { getBank, IBanks } from "../../../redux/reducers/banks.reducer";
import { AppDispatch } from "../../../redux/store";
import "./ExamBank.style.scss";

export const ExamDetails = () => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const [select, setSelect] = useState(0);
  const [data, setData] = useState<IBanks>();

  useEffect(() => {
    if (params.id) {
      dispatch(getBank(params.id))
        .unwrap()
        .then((rs: IBanks) => {
          setData(rs);
          setSelect(0);
        });
    }
  }, []);

  const handleSelect = (idx: number) => {
    setSelect(idx);
  };

  return (
    <div className="sub-exam-bank">
      <BreadcrumbComp
        title="Chi tiết đề thi"
        prevFirstPageTitle="Ngân hàng đề thi"
        prevFirstPage="exambank"
      />
      <div className="top-head">
        <div
          className="d-flex"
          style={{ width: "50vw", justifyContent: "space-between" }}
        >
          <div className="d-flex">
            <div className="label">
              <div>Môn học: </div>
              <div>Thời lượng: </div>
            </div>
            <div>
              <div>{data?.subject?.subName}</div>
              <div>{data?.time}</div>
            </div>
          </div>
          <div className="d-flex">
            <div className="label">
              <div>Tiêu đề thi: </div>
              <div>Hình thức: </div>
            </div>
            <div>
              <div>{data?.examName}</div>
              <div>Kiểm tra {data?.time} phút</div>
            </div>
          </div>
          <div className="d-flex">
            <div className="label">
              <div>Giáo viên đào tạo: </div>
              <div>Ngày tạo: </div>
            </div>
            <div>
              <div>{data?.user?.userName || "null"}</div>
              <div>{moment(data?.createdAt).format("DD/MM/YYYY")}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="body-bank">
        <Row>
          <Col span={6}>
            <div>Phần câu hỏi - đáp án:</div>
            {data?.question.length !== 0
              ? data?.question.map((vl, idx) => (
                  <div
                    className={select === idx ? "answer true" : "answer"}
                    key={vl.id}
                    onClick={() => handleSelect(idx)}
                  >
                    Câu {idx + 1}
                    <div hidden={!(select === idx)} className="icon-true">
                      <CheckCircleOutlined />
                    </div>
                  </div>
                ))
              : data?.questions.map((vl, idx) => (
                  <div
                    className={select === idx ? "answer true" : "answer"}
                    key={vl.id}
                    onClick={() => handleSelect(idx)}
                  >
                    Câu {idx + 1}
                    <div hidden={!(select === idx)} className="icon-true">
                      <CheckCircleOutlined />
                    </div>
                  </div>
                ))}
          </Col>
          <Col style={{ padding: "2rem" }} span={18}>
            <h3>
              Câu {select + 1}:{" "}
              {data?.question.length !== 0
                ? data?.question[select]?.quesName
                : data?.questions[select]?.quesName}
            </h3>
            {data?.question.length !== 0 ? (
              <div>{data?.question[select]?.correctEssay}</div>
            ) : (
              <div>{data?.questions[select]?.correctEssay}</div>
            )}
            {data?.questions[select]?.correct.length === 1 ||
            data?.question[select]?.correct.length === 1 ? (
              <Radio.Group
                value={
                  data?.question.length !== 0
                    ? data?.question[select]?.correct[0]
                    : data?.questions[select]?.correct[0]
                }
              >
                <Space direction="vertical">
                  {data?.question.length !== 0
                    ? data?.question[select]?.answers.map(
                        (vl: any, idx: any) => (
                          <Radio key={vl} value={idx}>
                            {vl}
                          </Radio>
                        )
                      )
                    : data?.questions[select]?.answers.map(
                        (vl: any, idx: any) => (
                          <Radio key={vl} value={idx}>
                            {vl}
                          </Radio>
                        )
                      )}
                </Space>
              </Radio.Group>
            ) : (
              <Checkbox.Group
                value={
                  data?.question.length !== 0
                    ? data?.question[select]?.correct
                    : data?.questions[select]?.correct
                }
              >
                {data?.question.length !== 0
                  ? data?.question[select]?.answers.map((vl: any, idx: any) => (
                      <>
                        <Checkbox key={vl} value={idx}>
                          {vl}
                        </Checkbox>
                        <br />
                      </>
                    ))
                  : data?.questions[select]?.answers.map(
                      (vl: any, idx: any) => (
                        <>
                          <Checkbox key={vl} value={idx}>
                            {vl}
                          </Checkbox>
                          <br />
                        </>
                      )
                    )}
              </Checkbox.Group>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};
