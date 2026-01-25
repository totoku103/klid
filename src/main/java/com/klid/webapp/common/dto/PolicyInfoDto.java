package com.klid.webapp.common.dto;

import java.io.Serializable;

/**
 * Created by devbong on 2018-07-05.
 */
public class PolicyInfoDto implements Serializable {

    private String maxWeeks;
    private String retries;
    private String releaseTime;
    private String alarm;
    private String alarmMsgHead;
    private String alarmMsgFoot;

    public String getMaxWeeks() {
        return maxWeeks;
    }

    public void setMaxWeeks(String maxWeeks) {
        this.maxWeeks = maxWeeks;
    }

    public String getRetries() {
        return retries;
    }

    public void setRetries(String retries) {
        this.retries = retries;
    }

    public String getReleaseTime() {
        return releaseTime;
    }

    public void setReleaseTime(String releaseTime) {
        this.releaseTime = releaseTime;
    }

    public String getAlarm() {
        return alarm;
    }

    public void setAlarm(String alarm) {
        this.alarm = alarm;
    }

    public String getAlarmMsgHead() {
        return alarmMsgHead;
    }

    public void setAlarmMsgHead(String alarmMsgHead) {
        this.alarmMsgHead = alarmMsgHead;
    }

    public String getAlarmMsgFoot() {
        return alarmMsgFoot;
    }

    public void setAlarmMsgFoot(String alarmMsgFoot) {
        this.alarmMsgFoot = alarmMsgFoot;
    }

    @Override
    public String toString() {
        return "PolicyInfoDto{" +
                "maxWeeks='" + maxWeeks + '\'' +
                ", retries='" + retries + '\'' +
                ", releaseTime='" + releaseTime + '\'' +
                ", alarm='" + alarm + '\'' +
                ", alarmMsgHead='" + alarmMsgHead + '\'' +
                ", alarmMsgFoot='" + alarmMsgFoot + '\'' +
                '}';
    }
}
