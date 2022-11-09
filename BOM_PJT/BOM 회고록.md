# BOM PJT 회고록

[TOC]

## 안된점들😅

### FE🎈

#### Javascript

##### setTimeout() 사용하기🎇

- 문제 상황
  - 10초마다 서버로 요청을 보내야 한다
  - 최초 useEffect 선언하고 setInterval(func , time)을 사용했더니 필터링이나 다른 것들을 주었을 때 중첩되는 현상이 발생했다.
- 해결 방법
  - 요청속에 setTimeout()으로 재귀형태로 선언해 매 10초마다 요청을 보낸 뒤
    - 해당 변수를 useState를 통해 저장
  - 인자가 바뀔 때  최상단에 clearTimeout()으로 useState 변수를 킬해준 뒤 바뀐 값으로 다시 요청
- 포인트
  - 재귀구조 이해
  - setTimeout()과 clearTimeout()의 적절한 배치

```js
function PatientDetail({ isPC }) {
  const [patientDetailTimerID, setPatientDetailTimerID] = useState("");

  // useEffect를 통해 최초 요청 보냄
  useEffect(() => {
    const userType = ls.get("userType");
    if (userType === "ward") {
      ...
      );
      if (component !== 1) {
        // request 보내는 코드
        requestPatientDetailHealthInfo(
          params.id,
          filter,
          requestPatientDetailHealthInfoSuccess,
          (err) => console.log(err)
        );
      }
      if (component === 1) {
        ...
      }
  }, [params, filter]);
        
  const requestPatientDetailHealthInfoSuccess = (res) => {
    ...
    // 응답 저장
    setLiveTemperature(res.data.실시간.체온);
    ...
    const userType = ls.get("userType");
    if (userType === "ward") {
      // 타이머 걸기
      const timerID = setTimeout(
        requestPatientDetailHealthInfo,
        10000,
        params.id,
        filter,
        requestPatientDetailHealthInfoSuccess,
        (err) => console.log(err)
      );
      // 타이머를 useState에 저장
      setPatientDetailTimerID(timerID);
    }
    if (userType === "patient") {
      ...
    }
  };

  // select 태그가 변경될 때 실행되는 함수 (filter 값을 변경시켜주는데 이로 인해 useEffect 재실행)
  const selectPeriod = (event) => {
    // 이전 타이머 죽여주기
    clearTimeout(patientDetailTimerID);
    const period = { period: event.target.value };
    setFilter(period);
  };
```



---

#### React.js

##### innerWidth 값 바꿔주기🎆

```javascript
import { useState, React } from "react";

// components
import SideBar from "components/molecules/common/SideBar";
import HeadBar from "components/molecules/common/Headbar";
import PatientDetailInfo from "components/molecules/PatientDetail/PatientDetailInfo";
import DownloadBtn from "components/atoms/DownloadBtn";
import DeviceSummary from "components/molecules/PatientDetail/DeviceSummary";
import BodyInfo from "components/molecules/PatientDetail/BodyInfo";
import LiveDeviceStatus from "components/molecules/PatientDetail/LiveDeviceStatus";
import DeviceDetailInfo from "components/molecules/PatientDetail/DeviceDetailInfo";
import { useEffect } from "react";
import Logo from "components/atoms/Logo";

function PatientDetail() {
  const [component, setComponent] = useState(0);
  const [isPC, setIsPC] = useState(true);

  useEffect(() => {
    window.innerWidth > 1180 ? setIsPC(true) : setIsPC(false);
  }, []);

  setInterval(() => {
    window.innerWidth > 1180 ? setIsPC(true) : setIsPC(false);
  }, 1000);

  return (
    <>
      {isPC && ...}
      {!isPC && ...}
    </>
  );
}

export default PatientDetail;
```

- `isPC`라는 값을 `useState`로 할당
- 처음 시작될 때 `useEffect`를 사용해서 초기에 값 isPC값 채워주기
- `setInterval`을 사용해서 1초마다 isPC 초기화해주기