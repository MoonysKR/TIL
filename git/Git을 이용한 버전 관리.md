### Git을 이용한 버전 관리

1. 버전 : 컴퓨터소프트웨어의 특정 상태

2. 관리 : 어떤 일의 사무, 시설이나 물건의 유지 개량
3. 프로그램 : 컴퓨터에서 실행될 때 특정 작업을 수행하는 일련의 명령어들의 모음



버전관리 : 컴퓨터 소프트웨어의 특정상태들을 관리하는것?

![image-20220113113454784](Git을 이용한 버전 관리.assets/image-20220113113454784.png)



버전관리의 이유

- 백업, 복구, 협업



분산 버전 관리- 

![image-20220113114029273](Git을 이용한 버전 관리.assets/image-20220113114029273.png)

- 각버전은 변경사항을 기록, 파일 자체를 기록하는 것 아님



---

### Git의 변경사항 기록

1. git을 쓰는 사용자 정보 등록

- 이름 : ` git config --global user.name 이름`
- 이메일 :  `git config --global user.email 이메일`



---

### Git의 작동 원리

![image-20220113131040144](Git을 이용한 버전 관리.assets/image-20220113131040144.png)

- working directory : 우리가 작업하는 공간
- staging area : 버전에 포함되기위한 대기실
- git directory : 버전이 기록되어 있는 공간
- git에서의 버전은 commit(스냅샷이라고 부르기도 함)



---

### Git 명령어

- ##### `git init` 

  - 초기화, 시작한다는 의미/ (master : 깃 이닛이 시작된 곳이구나, 깃이 관리하는 공간)
  - 폴더가 생김 `,git`이라는 숨긴 폴더 생성됨 건들면 안됨
  - git init을 `중첩해서 하면 안됨`->최상단의 깃 이닛이 하위의 디렉토리를 추적할 수 없음
  - 절대로 `루트 디렉토리`나 `홈 디렉토리`에서 git init을 하면 안됨

- ##### `git status` 

  - 현재 working directory랑 stage area의 상태를 보여줌
  - 가장 자주 쓸 명령어
  - 폴더를 만드는 건 변경사항 아님

- ##### `git add 파일명`

  - workind directory의 변경사항을 staging area로 옮기는 명령어
  - `git add .` 현재 디렉토리에 있는 모든 변경사항을 staging area로 옮김

- ##### `git commit -m "버전이름(first commit.....)"`

  - 버전으로 만드는 명령어
  - **버전 이름을 중복으로 사용 가능... 난수값이 다르기 때문에 상관 ㄴㄴ**

- ##### `git log`

  - commit의 내역을 조회하는 명령어
  - `q`로 화면 나갈 수 있음



---

### Github

- 포트폴리오 기능

- 협업의 기능

- ##### `git remote add origin http://github.com/MoonysKR/TIL.git` 

  - "origin"이라는 이름의 원격저장소로 향하는 길 등록하기

- ##### `git remote -v` 

  - 연결된 원격저장소 확인

- ##### `git push -u origin master` 

  - 로컬에 있는 커밋을 "origin"원격저장소에 master 브랜치를 push하겠다.
  - `-u`의 역할 뒤에 것들을 저장
  - 앞으로는 `git push`만 입력하면 됨

![image-20220113160713418](Git을 이용한 버전 관리.assets/image-20220113160713418.png)

- ##### `git clone URL 폴더이름(업어도 댐)` 

  - 버전 복제하기

- ##### `git pull` 

  - 버전 가져오기