# 꽃마리 PJT 회고록

[toc]

## 안된점들 😥

### FE

#### Javascript

##### 삼항연산자에서 리스트가 비었는지 안비었는지 확인하기

- 문제점 
  - 자바스크립트의 경우 === [] 못알아먹음

---

#### React js

##### react의 props와 emit

- vue와 비교했을 때 

  - 뷰의 경우에는 부모 컴포넌트의 정보를 불러오고 이를 수정하려면
    - props와 emit을 사용해야했다.

  - `리액트는 부모 state(data)를 수정하는 함수를 props해서 자식 컴포넌트에서 실행하면 부모 컴포넌트를 조작할 수 있다.`

- 문제 상황

  - 부모에서 온클릭하면 바뀌는 형태로 코드를 짰으나 작동하지 않음
  - 컴포넌트의 온클릭을 걸면 props로 인식
    - props할때는 함수 실행하지 않게 조심!

- 해결

  1. 부모에서 state 와 state를 변환시킬 함수 작성

  2. 자식에게 props하고 실행

  3. 부모의 값이 자동으로 바뀜

- 코드

  ```jsx
  // 부모 컴포넌트
  
  import { useState } from "react";
  import CollectionBtn from "../../atoms/profile/CollectionBtn";
  
  function ProfileCollection() {
    const [tabs, setTabs] = useState([
      { category: "전체", isActive: true },
      { category: "가족", isActive: false },
      { category: "연인", isActive: false },
      { category: "친구", isActive: false },
      { category: "선생님", isActive: false },
      { category: "직장동료", isActive: false },
      { category: "기타", isActive: false },
    ]);
    // console.log(tabs);
    const btnClick = (category) => {
      // console.log("clicked", tabs);
      for (let i = 0; i < tabs.length; i++) {
        // console.log(tabs[i]);
        if (tabs[i].category === category && tabs[i].isActive === true) {
          return;
        } else if (tabs[i].category === category && tabs[i].isActive === false) {
          const tmp = [
            { category: "전체", isActive: false },
            { category: "가족", isActive: false },
            { category: "연인", isActive: false },
            { category: "친구", isActive: false },
            { category: "선생님", isActive: false },
            { category: "직장동료", isActive: false },
            { category: "기타", isActive: false },
          ];
          tmp[i].isActive = true;
          // console.log(tmp);
          setTabs(tmp);
        }
      }
    };
    return (
      <>
        {/* 탭들 */}
        <div className="tabs grid grid-cols-4 mx-3">
          {tabs.map((tab) => {
            // console.log(tab);
            return (
              <div key={tab.category} className="col-span-1 p-1">
                <CollectionBtn
                  category={tab.category}
                  isActive={tab.isActive}
                  onClick={() => {
                    // console.log("clicked");
                    btnClick(tab.category);
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* 사진 및 내용들 */}
      </>
    );
  }
  
  export default ProfileCollection;
  ```

  ```jsx
  // 자식 컴포넌트
  
  function CollectionBtn({ category, isActive, onClick }) {
    return (
      <button
        className={`${
          isActive ? "bg-main" : "bg-font2 hover:cursor-pointer hover:bg-sub1"
        } w-full rounded-md h-full py-1 font-sans`}
        onClick={onClick}
      >
        {category}
      </button>
    );
  }
  
  export default CollectionBtn;
  ```




---

##### 버튼으로 필터링하기

- 기존 코드

  - useState를 활용해 isActive 요소를 추가
  - 모든 카테고리마다 해당 요소를 추가해야하는 불편함
  - 함수가 길어짐

  ```jsx
  import { useState } from "react";
  import CollectionBtn from "../../atoms/profile/CollectionBtn";
  import CollectionImage from "../../atoms/profile/CollectionImage";
  import YJ from "../../../assets/YJ.png";
  
  function ProfileCollection() {
    const [tabs, setTabs] = useState([
      { category: "전체", isActive: true },
      { category: "가족", isActive: false },
      { category: "연인", isActive: false },
      { category: "친구", isActive: false },
      { category: "선생님", isActive: false },
      { category: "직장동료", isActive: false },
      { category: "기타", isActive: false },
    ]);
  
    const btnClick = (category) => {
      // console.log("clicked", tabs);
      for (let i = 0; i < tabs.length; i++) {
        // console.log(tabs[i]);
        if (tabs[i].category === category && tabs[i].isActive === true) {
          return;
        } else if (tabs[i].category === category && tabs[i].isActive === false) {
          const tmp = [
            { category: "전체", isActive: false },
            { category: "가족", isActive: false },
            { category: "연인", isActive: false },
            { category: "친구", isActive: false },
            { category: "선생님", isActive: false },
            { category: "직장동료", isActive: false },
            { category: "기타", isActive: false },
          ];
          tmp[i].isActive = true;
          // console.log(tmp);
          setTabs(tmp);
        }
      }
    };
  
    return (
      <>
        {/* 탭들 */}
        <div className="tabs grid grid-cols-4 mx-4">
          {tabs.map((tab) => {
            // console.log(tab);
            return (
              <div key={tab.category} className="col-span-1 p-0.5">
                <CollectionBtn
                  category={tab.category}
                  isActive={tab.isActive}
                  onClick={() => {
                    // console.log("clicked");
                    btnClick(tab.category);
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* 사진 및 내용들 */}
        <div className="colletion-items grid grid-cols-3 mt-3 mx-3">
          {collectionItems.map((item) => {
            return (
              <div className="collection-item p-1.5 text-xs">
                <CollectionImage url={item.url} title={item.title} />
              </div>
            );
          })}
        </div>
      </>
    );
  }
  
  export default ProfileCollection;
  ```

- 개선 코드
  - 각 카테고리를 담은 객체 생성
  - index를 값으로 하는 activeTab useState 생성
  - 카테고리를 담은 객체의 index값으로 useState  변환 및 수정
  
  ```jsx
  import { useState } from "react";
  import CollectionBtn from "../../atoms/profile/CollectionBtn";
  import CollectionImage from "../../atoms/profile/CollectionImage";
  import YJ from "../../../assets/YJ.png";
  
  function ProfileCollection() {
    const [activeTab, setActiveTab] = useState(0);
  
    const tabs = [
      { category: "전체" },
      { category: "가족" },
      { category: "연인" },
      { category: "친구" },
      { category: "선생님" },
      { category: "직장동료" },
      { category: "기타" },
    ];
  
    const onClickTab = (index) => {
      setActiveTab(index);
    };
  
    const [collectionItems, setCollectionItems] = useState([
      { url: YJ.src, title: "소통왕 영준" },
      { url: YJ.src, title: "소통왕 영준" },
      { url: YJ.src, title: "소통왕 영준" },
      { url: YJ.src, title: "소통왕 영준" },
      { url: YJ.src, title: "소통왕 영준" },
      { url: YJ.src, title: "소통왕 영준" },
      { url: YJ.src, title: "소통왕 영준" },
    ]);
  
    return (
      <>
        {/* 탭들 */}
        <div className="tabs grid grid-cols-4 mx-4">
          {tabs.map((tab, index) => {
            // console.log(tab);
            return (
              <div key={tab.category} className="col-span-1 p-0.5">
                <CollectionBtn
                  category={tab.category}
                  activeTab={activeTab}
                  index={index}
                  onClick={() => {
                    // console.log("clicked");
                    onClickTab(index);
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* 사진 및 내용들 */}
        <div className="colletion-items grid grid-cols-3 mt-3 mx-3">
          {collectionItems.map((item, index) => {
            return (
              <div className="collection-item p-1.5 text-xs" key={index}>
                <CollectionImage url={item.url} title={item.title} />
              </div>
            );
          })}
        </div>
      </>
    );
  }
  
  export default ProfileCollection;
  ```
  



---

##### URL 클립보드로 복사하기

```jsx
  const copyURL = async () => {
    const url = window.location.href;
    // console.log(url);
    await navigator.clipboard.writeText(url);
    alert("프로필이 복사되었습니다.");
  };
```

- 기능
  - url을 변수에 담고
  -  navigator를 활용해 복사 후, alert창 띄우기



---

##### useRouter 훅 라이프사이클 이슈 - useState보다 늦어서 undefined로 뜨는 문제

- 문제 상황

  - profile관련 url에 username이 필요함
  - username을 받아와 axios 요청을 보내야 함
  - useRouter를 사용하여 axios요청을 보내려했으나 초기 값이 undefined로 뜸
  - useState보다 useRouter가 늦게 실행되어 useEffect를 실행할 때 undefined를 받아옴

- 해결

  - JS에서 window 접근으로 해결
    - `const username = window.location.pathname.substring(9);`

- 코드

  ```jsx
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import StoryImage from "../../components/atoms/profile/StoryImage";
  import ProfileInfo from "../../components/organisms/profile/ProfileInfo";
  import ProfileNavBar from "../../components/organisms/profile/ProfileNavBar";
  import { getUser } from "../../api/profile.js";
  import noStory from "../../assets/profile/main/noStoryImg.jpg";
  
  export default function Profile() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({
      status: "",
      message: "",
      isMe: "",
      user: {
        userName: "",
        followingCount: "",
        followerCount: "",
        userImage: "",
        isFollow: "",
      },
      articles: [
        {
          articleId: "",
          articleImage: "",
        },
      ],
      likeFlowers: [
        {
          tag: "",
          flowers: [
            {
              flowerImage: "",
              subjectId: "",
              kindId: "",
              kindName: "",
            },
          ],
        },
      ],
      likeArticles: [
        {
          articleId: "",
          articleImage: "",
          userName: "",
          likes: "",
        },
      ],
    });
  
    const success = (res) => {
      setUserInfo(res.data);
    };
    const fail = (err) => console.log(err);
    // 서버 통신 짤 코드
  
    const getInfo = (username) => {
      // console.log(username);
      getUser(username, success, fail);
    };
  
    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        const username = window.location.pathname.substring(9);
        getInfo(username);
      } else {
        alert("로그인이 필요한 서비스입니다.");
        router.push("/login");
      }
    }, []);
  
    return ...
  ```

  

---

#### Next js

##### Link와 a태그를 이용하여 링크 구성하기

- 문제 상황

  - Link태그 사용 후  a 태그 없이 내용 작성

    ```html
    <Link href="abcd">
      <BsHeart className="w-full" />  
    </Link>
    ```

  - 에러 발생

    ```
    Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
    ```

- 해결 방법

  ```html
  <Link href="abcd">
    <a>
      <BsHeart className="w-full" />
    </a>  
  </Link>
  ```

  

---

#### Performance



---

#### UI/UX



---

### BE