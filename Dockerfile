# Node 이미지를 사용하는 빌드 스테이지
FROM node:16 AS build

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 설치를 위해 package.json과 package-lock.json을 복사
COPY package*.json ./

# npm install 대신 npm ci 사용 (더 엄격한 종속성 관리)
RUN npm ci

# 나머지 소스 코드를 복사
COPY . .

# React 앱을 빌드
RUN npm run build

# Nginx를 사용하는 프로덕션 환경 설정
FROM nginx:alpine

# 빌드된 파일을 Nginx의 기본 웹 디렉토리로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 사용자 정의 Nginx 설정 파일 복사
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# 포트 80과 443 노출
EXPOSE 80

# Nginx 시작 명령어
CMD ["nginx", "-g", "daemon off;"]
