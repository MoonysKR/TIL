'''
4
1 2 1 3 3 4 3 5
'''

# 이진 tree 정점 번호 규칙
# 1. 포화이진트리 - 1번루트부터, 부모가 자식보다 작음
# 2. 그외 - 1번루트부터 아님, 규칙 없음, 부모가 자식보다 클 수도 있음

def pre_order(v):
    if v: # 0번 정점이 없으므로... 0번은 자식이 없는 경우를 표시, v == true
        print(v)  # visit(v)
        pre_order(ch1[v])
        pre_order(ch2[v])

def in_order(v):
    if v:
        in_order(ch1[v])
        print(v)
        in_order(ch2[v])

def post_order(v):
    if v:
        post_order(ch1[v])
        post_order(ch2[v])
        print(v)

E = int(input())  # edge 수
arr = list(map(int, input().split()))
V = E + 1  # 정점 수 == 1번부터 V번까지 정점이 있을 때 마지막 정점

# 부모번호를 인덱스로 자식번호 저장
ch1 = [0] * (V+1)
ch2 = [0] * (V+1)

for i in range(E):
    p, c = arr[i*2], arr[i*2+1]
    if ch1[p] == 0:  # 아직 자식이 없는 경우
        ch1[p] = c
    else:
        ch2[p] = c

# print(ch1)
# print(ch2)
# [0, 2, 0, 4, 0, 0]
# [0, 3, 0, 5, 0, 0]

# pre_order(1)
# 1
# 2
# 3
# 4
# 5

# pre_order(3)
# 3
# 4
# 5

# in_order(1)
# 2
# 1
# 4
# 3
# 5

# post_order(1)
# 2
# 4
# 5
# 3
# 1

# post_order(3)
# 4
# 5
# 3

# 자식 번호를 인덱스로 부모 번호를 저장
par = [0]*(V+1)
for i in range(E):
    p, c = arr[i * 2], arr[i * 2 + 1]
    par[c] = p

'''
[input]
4
2 1 2 4 4 3 4 5
'''

# 자식을 정점으로 부모찾기, 조상찾기를 시행하면 루트를 얻어낼 수 있음!

# print(par)
# [0, 2, 0, 4, 2, 4]

# root 찾기
root = 0
for i in range(1, V+1):
    if par[i] == 0:
        root = i
        break
# print(root)
# in_order(2)
# 1
# 2
# 3
# 4
# 5

# 조상 찾기
c = 5  # 정점 c의 조상찾기
anc = []
while par[c] != 0:
    anc.append(par[c])
    c = par[c]
# print(*anc)
# 4 2