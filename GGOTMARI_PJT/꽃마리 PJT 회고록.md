# 꽃마리 PJT 회고록

[toc]

## 안된점들 😥

### FE

#### Javascript



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