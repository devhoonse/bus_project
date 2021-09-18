# GOMATA (고양시 마을버스 타요)

## 0. recent version: `0.0.0` `@2021-09-19 18:32`
### 업데이트 내역
   1. 프론트엔드 페이지 초안이 작성되었습니다.
   2. 백엔드 API 문서 페이지가 작성되었습니다.
   3. Nginx 웹서버 도커 파일이 작성되었습니다.

## 1. About This Project
   1. 목표 : 우리 동네 마을 버스 언제 와?
   2. Github : https://github.com/devhoonse/bus_project
   3. Jira : https://devhoonse.atlassian.net/jira/software/projects/BUS/boards/1/roadmap

## 2. Contact Us
   1. `wyjang8838@gmail.com` `PM/PL`
   2. `devhoonse@gmail.com` `DEV`

## 3. How to Run Test
   ### 1) run Serverside Renderer `작성 완료`
   - 개발 페이지 확인 : http://localhost:3030
   - 호스트 포트 변경 : docker-compose.yml 의 ports 설정의 3030 부분 변경
   - 개발 서버 구동 (도커 이미지)
      > cd frontend; \
        docker build . -t frontend-dev:0.01 -f Dockerfile-dev \
        docker-compose up -d frontend-dev;
     - 서버 종료
      > docker-compose stop frontend-dev;
    
   ### 2) run API Server `작성 완료`
   - API 문서(swagger) : http://localhost:8099/doc 
   - 호스트 포트 변경 : docker-compose.yml 의 ports 설정의 8099 부분 변경
   - 서버 구동 (도커 이미지)
      > cd api; \
        docker build . -t api:0.01 \
        docker-compose up -d api;
   - 서버 종료
     > docker-compose stop api;
   

## 4. Production Deployment `작성 중`
> docker-compose up -d;