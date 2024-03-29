import { Link } from "react-router-dom";
import BootPath from "../../BootPath";
import React, { useEffect, useState, useContext } from "react";
import RegistedImagePath from "../../registedImagePath";
import axios from "axios";
import "./MemberInfo.css";
import CommonImagePath from "../../commonImagePath";

function MemberInfo() {
  const { bootpath } = useContext(BootPath);
  const [data, setData] = useState(null);
  const member_no = sessionStorage.getItem("no");
  const { registedImagePath } = useContext(RegistedImagePath);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [postImg, setPostImg] = useState("edit");
  const { commonImagePath } = useContext(CommonImagePath);

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    if (event.target.files[0] == null) {
      return;
    }
    setSelectedFile(event.target.files[0]);
    setUploadedImageUrl(URL.createObjectURL(event.target.files[0])); // 업로드된 이미지 URL 설정
    setPostImg("posting");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        bootpath + `/member/changePhoto?member_no=${member_no}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("사진이 변경되었습니다.");
      } else {
        console.error("사진 변경이 실패했습니다. 나중에 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setPostImg("edit");
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        ` ${bootpath}/member/info?member_no=${member_no}`
      );
      if (response.data.length === 0) {
        setData(null);
      } else {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="space_container"></div>
      <div className="user_info_container">
        <div className="profile_image_zone">
          <div className="member_info_image_frame">
            {data && (
              <div className="info_image_frame">
                <img
                  className="member_info_image"
                  onClick={handleImageClick}
                  src={
                    data.photo
                      ? uploadedImageUrl || `${registedImagePath}${data.photo}`
                      : uploadedImageUrl ||
                        `${commonImagePath}header_Profile.png`
                  }
                  width="100"
                  alt=""
                />
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          {postImg === "edit" ? (
            <button className="changeImage" onClick={handleImageClick}>
              프로필 사진 변경
            </button>
          ) : (
            <button className="changeImage" onClick={handleSubmit}>
              프로필 사진 등록
            </button>
          )}
        </div>

        <div className="profile_text_zone">
          <div className="infoId">
            <p className="Id_color"> {data && data.email.split("@")[0]}</p>
          </div>
          <div className="infoName">{data && data.name}</div>
          <div className="infoPoint">
            보유 포인트:
            <p className="Id_color2">{data && data.point}원</p>
          </div>
        </div>
      </div>
      <div class="button_container">
        <button className="list_button">
          <Link to={"/point/pointlist"}>내역</Link>
        </button>
        <button className="withdrawal_button">
          <Link to={"/point/minus"}>인출</Link>
        </button>
        <button className="button_charge">
          <Link to={"/point/plus"}>충전</Link>
        </button>
      </div>
      <hr />
    </>
  );
}

export default MemberInfo;
