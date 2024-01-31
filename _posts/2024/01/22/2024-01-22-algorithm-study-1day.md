---
layout: post
title: "알고리즘 스터디 1 days"
summary: "with 백준 And 자바스크립트"
author: dahoon06
date: "2023-12-31 00:00:00 +0530"
category: study
thumbnail: 
keywords: algorithm
permalink: /blog/study/2024-01-algorithm-1day/
usemathjax: true
---

늘 함께하는 멤버와 함께 이번에는 알고리즘 스터디를 하기로 했습니다.

이번 스터디의 주된 목적은 알고리즘을 풀어보고 그 문제 풀이에 대한 각자의 생각을 담아 정리해보기로 했고, 사이트는 백준을 이용하기로 했습니다.

저는 주 언어가 자바스크립트이다 보니 당욘 JS로 풀이할 예정이도 다른 분들은 Java를 사용할 예정입니다.

먼저 첫 주차는 기초 문제인 [수 정렬 - 2750](https://www.acmicpc.net/problem/2750) 과 [피보나치 수 - 2747](https://www.acmicpc.net/problem/2747)입니다.


## 수 정렬 - No. 2750

```text
5
5
2
3
4
1
```

input이 5로 시작하여 shift로 첫 번째 인자를 제거한 후 정렬하여 하나씩 출력하는 방법으로 문제를 풀었습니다. 


```javascript
const fs = require("fs");
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

input.shift();
input.sort((a, b) => a - b);

for (let i = 0; i < input.length; i++) {
  console.log(input[i]);
}
```

## 피보나치 수 - No. 2747

피보나치 수는 재귀 카테고리에 속해있어 