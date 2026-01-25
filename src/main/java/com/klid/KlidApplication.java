package com.klid;

import org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(
        scanBasePackages = {"com.klid"},
        exclude = {MybatisAutoConfiguration.class}
)
@EnableScheduling
public class KlidApplication {

    public static void main(String[] args) {
        SpringApplication.run(KlidApplication.class, args);
    }
}
