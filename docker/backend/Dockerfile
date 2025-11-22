FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY backend/ /app/

RUN ./gradlew build -x test --no-daemon

CMD ["./gradlew", "bootRun"]
