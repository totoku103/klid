package com.klid.webapp.main.thirdparty.redirect.persistence;

import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.rules.SpringClassRule;
import org.springframework.test.context.junit4.rules.SpringMethodRule;

@ContextConfiguration(classes = {
        TokenInfoMapper.class
})
public class ThirdPartyRedirectTokenInfoMapperTest {
    @ClassRule
    public static final SpringClassRule SPRING_CLASS_RULE = new SpringClassRule();
    @Rule
    public final SpringMethodRule springMethodRule = new SpringMethodRule();

    @Autowired
    private TokenInfoMapper thirdPartyRedirectTokenInfoMapper;

    @Test
    public void save() {
        System.out.println(thirdPartyRedirectTokenInfoMapper);
    }
}