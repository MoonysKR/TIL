git branch : 브랜치 목록 확인

git branch `name` : 새로운 브랜치 생성

git branch -d `name` : 특정 브랜치 삭제(브랜치가 합병되었을 경우), merge가 되었을 경우 항상 삭제해 주기

git branch -D `name` : 강제 삭제 

git switch `branch_name` : 다른 브랜치로 이동, 헤드의 이동

git switch -c `branch_name` : 브랜치를 새로 생성과 동시에 이동

---

git log --oneline : 한줄로 간단하게 로그 확인 가능

git log --oneline --all : 모든 커밋 조회

git log --oneline --all --graph : 가지가 어떻게 뻗어나가고 있는지 확인할 수 있음

---

git merge `branch_name` :  merge하기 전에 일단 다른 브렌치를 합치려고하는, 즉 메인 브랜치로 switch해야함, merge가 된 브랜치는 삭제할 것!

1. fast-forward

- 일반적인 머지 형태

2. 3-way merge(merge commit)

- 브랜치를 합병하려 하는데 마스터가 변경되어 다른 버젼일 때

3. merge conflict(충돌이 일어나는 경우)

- merge하는 두 브랜치에서 같은 파일의 같은 부분을 동시에 수정하고 merge하면, git은 해당 부분을 자동으로 merge해주지 못함
- 반면 동일 파일이더라도 서로 다른 부분을 수정했다면 conflict없이 자동으로 merge commit된다.
  - git status => both modified
  - 수정 후에
  - `git commit`만 작성!!!!!!!!
  - vim 에디터 등장
    - 맨 위 커밋 이름
    - 다음부터 커밋 내용
    - `esc: -> wq` 입력
  - vim이란?
    - 텍스터 에디터의 조상