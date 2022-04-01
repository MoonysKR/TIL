'''
마지막 정점 번호, 간선수
6 8
0 1 0 2 0 5 0 6 5 3 4 3 5 4 6 4
'''

def dfs1(v, V):
    visited[v] = 1
    print(v, end=' ')
    for w in range(V+1):  # v에 인접한 모든 노드에 대해
        if adjM[v][w] == 1 and visited[w] == 0:  # 아직 방문하지 않은 곳이라면
            dfs1(w, V)

def dfs2(v, V):
    visited[v] = 1
    print(v, end=' ')
    for w in adjL[v]:  # v에 인접한 모든 노드 w에 대해
        if visited[w] == 0:  # 아직 방문하지 않은 곳이라면
            dfs2(w, V)

V, E = map(int,input().split())
arr = list(map(int, input().split()))

adjM = [[0] * (V+1) for _ in range(V+1)]
adjL = [[] * (V+1) for _ in range(V+1)]

for i in range(E):
    n1, n2 = arr[i*2], arr[i*2+1]
    adjM[n1][n2] = 1
    adjM[n2][n1] = 1  # 무향 그래프인 경우, 유향인 경우 필요 없음음
for i in range(E):
    n1, n2 = arr[i*2], arr[i*2+1]
    adjL[n1].append(n2)
    adjL[n2].append(n1)  # 무향 그래프인 경우, 유향인 경우 필요 없음

visited = [0] * (V+1)
# dfs1(0, V)
# dfs2(0, V)

# adjM
# 0 = {list: 7} [0, 1, 1, 0, 0, 1, 1]
# 1 = {list: 7} [1, 0, 0, 0, 0, 0, 0]
# 2 = {list: 7} [1, 0, 0, 0, 0, 0, 0]
# 3 = {list: 7} [0, 0, 0, 0, 1, 1, 0]
# 4 = {list: 7} [0, 0, 0, 1, 0, 1, 1]
# 5 = {list: 7} [1, 0, 0, 1, 1, 0, 0]
# 6 = {list: 7} [1, 0, 0, 0, 1, 0, 0]

# adjL
# 0 = {list: 4} [1, 2, 5, 6]
# 1 = {list: 1} [0]
# 2 = {list: 1} [0]
# 3 = {list: 2} [5, 4]
# 4 = {list: 3} [3, 5, 6]
# 5 = {list: 3} [0, 3, 4]
# 6 = {list: 2} [0, 4]
