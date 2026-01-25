package com.klid.webapp.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

//@Component
public class StartupRunner implements ApplicationListener<ContextRefreshedEvent> {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Override
    public void onApplicationEvent(final ContextRefreshedEvent contextEvent) {
        if (contextEvent.getApplicationContext().getParent() != null) {
            log.info(contextEvent.getApplicationContext().getDisplayName() + " 컨텍스트 로딩.");
            final ApplicationContext applicationContext = contextEvent.getApplicationContext();

            checkCtssRestServerHealth(applicationContext);
            checkVmsRestServerHealth(applicationContext);
        }
    }

    private void checkCtssRestServerHealth(final ApplicationContext applicationContext) {
        final ThirdPartyRestTemplate thirdPartyRestTemplate = applicationContext.getBean(ThirdPartyRestTemplate.class);
        try {
            thirdPartyRestTemplate.checkCtss();
        } catch (Exception ex) {
            log.error(ex.getMessage());
            System.exit(1);
        }
    }

    private void checkVmsRestServerHealth(final ApplicationContext applicationContext) {
        final ThirdPartyRestTemplate thirdPartyRestTemplate = applicationContext.getBean(ThirdPartyRestTemplate.class);
        try {
            thirdPartyRestTemplate.checkVms();
        } catch (Exception ex) {
            log.error(ex.getMessage());
            System.exit(1);
        }
    }
}
