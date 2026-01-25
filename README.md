# KLID Web Application

## 로그 설정

로그 파일 경로와 이름은 다음 우선순위로 결정됩니다:

1. 실행 인자 (JVM 옵션)
2. 환경 변수
3. application-system-{profile}.yml 설정
4. 기본값 (`./logs`, `klid-web`)

### 설정 항목

| 항목 | Spring 프로퍼티 | 기본값 |
|------|-----------------|--------|
| 로그 경로 | `app.system.log.path` | `./logs` |
| 로그 파일명 | `app.system.log.name` | `klid-web` |

### 방법 1: 실행 인자 (JVM 옵션)

```bash
# JAR 실행 시
java -Dapp.system.log.path=/var/log/klid \
     -Dapp.system.log.name=myapp \
     -jar klid-web.jar

# 또는 spring 프로퍼티 오버라이드
java -jar klid-web.jar \
     --app.system.log.path=/var/log/klid \
     --app.system.log.name=myapp
```

### 방법 2: 환경 변수

```bash
# Linux/Mac
export APP_SYSTEM_LOG_PATH=/var/log/klid
export APP_SYSTEM_LOG_NAME=myapp
java -jar klid-web.jar

# Windows (PowerShell)
$env:APP_SYSTEM_LOG_PATH="C:\logs\klid"
$env:APP_SYSTEM_LOG_NAME="myapp"
java -jar klid-web.jar

# Windows (CMD)
set APP_SYSTEM_LOG_PATH=C:\logs\klid
set APP_SYSTEM_LOG_NAME=myapp
java -jar klid-web.jar
```

### 방법 3: application-system-{profile}.yml 설정

각 프로필별 설정 파일에서 수정:

```yaml
# src/main/resources/config/system/application-system-{profile}.yml
app:
  system:
    log:
      name: klid-web
      path: /var/log/klid
```

### 프로필별 기본 설정

| Profile | LOG_PATH | LOG_FILE |
|---------|----------|----------|
| local | `./log` | `klid-web` |
| dev | `./log` | `klid-web` |
| stage | `C:/home/ntis/log` | `klid-web` |
| prod | `C:/home/ntis/log` | `klid-web` |

### 콘솔 로그 인코딩 (Windows 한글 깨짐 해결)

Windows 환경에서는 기본 콘솔 인코딩(MS949/CP949)과 JVM의 UTF-8 출력이 충돌하여 한글이 깨질 수 있습니다.
이를 위해 `CONSOLE_ENCODING` 시스템 프로퍼티를 제공합니다.

*   **기본값**: `UTF-8` (Linux, Mac, Docker 등 대다수 환경)
*   **Windows 개발 시**: `MS949` 설정 필요

실행 시 아래와 같이 옵션을 추가하세요:

```bash
# Windows (MS949 설정)
java -DCONSOLE_ENCODING=MS949 -jar klid-web.jar

# 그 외 (설정 불필요, 기본값 UTF-8 사용)
java -jar klid-web.jar
```
