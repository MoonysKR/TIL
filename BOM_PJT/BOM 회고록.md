# BOM PJT 회고록

[TOC]

## 안된점들😅

### FE🎈

#### Javascript

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