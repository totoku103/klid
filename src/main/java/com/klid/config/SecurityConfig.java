package com.klid.config;

import com.klid.webapp.common.security.CustomAuthenticationProvider;
import com.klid.webapp.common.security.TwoFactorAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final TwoFactorAuthenticationFilter twoFactorAuthenticationFilter;

    public SecurityConfig(TwoFactorAuthenticationFilter twoFactorAuthenticationFilter) {
        this.twoFactorAuthenticationFilter = twoFactorAuthenticationFilter;
    }

    @Bean
    public AuthenticationProvider customAuthenticationProvider() {
        return new CustomAuthenticationProvider();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(List.of(customAuthenticationProvider()));
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                                // 불필요한 HTTP 메소드 차단 (보안 취약점 방지)
                                .requestMatchers(HttpMethod.PUT, "/**").denyAll()
                                .requestMatchers(HttpMethod.DELETE, "/**").denyAll()
                                .requestMatchers(HttpMethod.HEAD, "/**").denyAll()
                                .requestMatchers(HttpMethod.TRACE, "/**").denyAll()
                                // OPTIONS는 CORS 프리플라이트 요청에 필요하므로 허용
                                // 정적 리소스 허용
                                .requestMatchers("/lib/**", "/js/**", "/img/**", "/css/**", "/webjars/**").permitAll()
                                .requestMatchers("/WEB-INF/**").permitAll()
                                // 로그인 관련
                                .requestMatchers("/", "/login.do", "/error.do").permitAll()
                                .requestMatchers("/api/login/ctrs/authenticate/**", "/api/login/vms/authenticate/**", "/api/login/ctss/authenticate/**").permitAll()
//                .requestMatchers("/main/login.do", "/api/login/**").permitAll()
                                // 계정 등록
//                .requestMatchers("/main/popup/env/pAccountAdd.do", "/api/main/env/userConf/addAccount.do").permitAll()
                                // 비밀번호 만료 시 변경 팝업 호출
                                .requestMatchers("/main/popup/env/expire/pUserPasswordChange.do").permitAll()
                                .requestMatchers("/api/main/env/userConf/expire/passwordCheck").permitAll()
                                // 개인정보처리방침
                                .requestMatchers("/main/popup/sys/pPolicyInfo", "/main/popup/sys/pPolicyInfo.do").permitAll()
                                .requestMatchers("/main/popup/compare-privacy-policy/**").permitAll()
                                .requestMatchers("/main/popup/privacy-policy/**").permitAll()
                                // VMS/CTSS 연동
                                .requestMatchers("/api/main/vms/privacy-policy", "/main/vms/sign-up.do").permitAll()
                                .requestMatchers("/api/main/ctss/privacy-policy", "/main/ctss/sign-up.do").permitAll()
                                // 외부 연동 및 인증
                                .requestMatchers("/gpki/**", "/gpkisecureweb/client/setup/GPKISecureWebSetup.exe").permitAll()
                                .requestMatchers("/api/third-party/auth/redirect.do", "/api/third-party/auth/otp/initialize.do").permitAll()
                                .requestMatchers("/ctrs/redirect.do", "/authenticate/otp/ctrs.do").permitAll()
                                // 기타
//                .requestMatchers("/main/popup/silverlight/**").permitAll()
                                .requestMatchers("/api/common/code/getCodeListByCodeKind.do").permitAll()
                                .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/login.do")
                        .usernameParameter("userId")
                        .passwordParameter("password")
                        .loginProcessingUrl("/login/prcsLogin.do")
                        .defaultSuccessUrl("/main/main.do", true)
                        .failureUrl("/login.do")
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout.do")
                        .logoutSuccessUrl("/login.do")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                )
                .sessionManagement(session -> session
                        .maximumSessions(1)
                        .expiredUrl("/login.do")
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .headers(headers -> headers
                        .frameOptions(frame -> frame.sameOrigin())
                        .xssProtection(xss -> xss.disable())
                        .contentTypeOptions(contentType -> {
                        })
                )
                // 2단계 인증 필터 추가 (UsernamePasswordAuthenticationFilter 이후)
                .addFilterAfter(twoFactorAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // 모든 origin 허용 (credentials와 함께 사용 가능)
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
