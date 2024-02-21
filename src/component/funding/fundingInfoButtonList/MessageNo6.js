import BootPath from "./../../../BootPath";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MessageNo6 = ({ obj }) => {
  const { bootpath } = useContext(BootPath);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    //post 전송할 데이터 필드. giveup 필드값을 바꾸기 위해 펀딩의 no와 현재 로그인한 member_no를 담음
    fundingNo: obj.fundingNo,
    memberNo: obj.fundingMemberNo,
  });
  const doSettlement = async () => {
    try {
      const response = await axios.post(
        bootpath + "/fund/doSettlement",
        formData
      );

      console.log("서버 응답:" + response.data.result);
      console.log(response.data);
      if (response.data.result === "settlememt_success") {
        console.log("정산 완료" + response.data.giveUp);
        alert("정산이 완료되었습니다.");
        window.location.href = "/funding/info?no=" + obj.fundingNo;
      } else if (response.data.result === "settlement_success_end") {
        alert("정산이 완료되었습니다. 모든 인원이 정산을 끝냈습니다.");
        window.location.href = "/funding/info?no=" + obj.fundingNo;
      } else {
        alert("정산 안됨");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  return (
    <>
      <button className="btn" onClick={doSettlement}>
        정산받기 : 금액 : 얼마
      </button>
    </>
  );
};

export default MessageNo6;
