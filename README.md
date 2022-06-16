# Duckstagram
- recoil, react-query를 이용한 반응형 웹사이트 만들기


# 주 라이브러리
### recoil & recoil-persist
- 전역 상태 유지, ex) 로그인한 사용자의 token을 저장
### react-query
- 서버 상태 유지
### eslint & prettier
- 프로젝트 내에서 코딩 컨벤션을 동일하기 위해 사용
### axios
- HTTP request & respose

# Why recoil?
### 기존 상태관리 라이브러리의 문제점
- 기존에 사용되었던 Redux나 Mobx가 성능 자체에 문제가 있던 것이 아니라 오히려 Flux 패턴을 기반으로 안정적이지만 여러가지 문제가 존재했다
- React 전용 라이브러리가 아니기에 React가 볼 때 Store가 외부의 어떤 것이며 동시성 모드를 구현하기에 호환성이 떨어진다
- 복잡한 보일러 플레이트가 존재해서 러닝커브가 높으며 코드를 알아보기 힘들다.
- 비동기 데이터를 호출하기 위해서 서드파티 라이브러리가 필요하다 Redux-Thunk, Redux-Saga 등
### recoil의 장점
- React 전용 라이브러리여서 React 내부에 접근이 용이하다. 특히 동시성 모드, Suspense 등을 지원해서 UX 관점에서도 유리한 웹 어플리케이션을 만들 수 있다.
- 러닝커브가 낮으며 전역 상태를 정의하고 설정하기가 쉽고 recoil에서 사용하는 훅들로 상태를 get/set하기 때문에 리액트 문법과도 매우 유사하다
- 보일러 플레이트가 매우 적다

# Why 

