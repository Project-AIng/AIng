# AIng-Back
application.properties에서


spring.datasource.username=root


spring.datasource.password=csedbadmin


이 두개는 개인에 맞춰 수정해서 사용(mysql)

---
DB URL
spring.datasource.url=jdbc:mysql://localhost:3306/test?useSSL=false&useUnicode=true&serverTimezone=Asia/Seoul 


여기서 test부분을 수정하지 않을 거라면, mysql workbench키고


CREATE DATABASE test;


USE test;


차례대로 실행 후 사용

user db 확인 -> SELECT * FROM user;
