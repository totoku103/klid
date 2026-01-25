/**
 * Program Name : NoticeBoardDto.java
 *
 * Version  :  3.0
 *
 * Creation Date : 2015. 12. 22.
 * 
 * Programmer Name  : kim dong ju
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE   : PROGRAMMER : REASON
 */

package com.klid.webapp.main.rpt.reportWeeklyState.dto;

public class ReportWeeklyStateDto {
    private String inci_no;
    private String inci_dt;
    private String inci_nm;

    private String occr_dt0;
    private String occr_dt1;
    private String occr_dt2;

    // 일일 보안관제결과 리스트
    private int nis_cnt; //보고서-일일 보안관제 국정원 건수
    private int cnt_cnt; //보고서-일일 보안관제 중앙지원센터 건수
    private int tng_cnt; //보고서-일일 보안관제 통합전산센터 건수
    private int tot_cnt; //보고서-일일 보안관제 총건수
    private int worm_cnt; //보고서-일일 보안관제 웜바이러스 건수 (악성코드)
    private int web_cnt; //보고서-일일 보안관제 웜바이러스 이외 건수 (악성코드 외)
    private int gook_cnt; //일일보고서 토탈건(국정원___박범신)
    private String dcl_inst_cd_nm; //보고서-일일 보안관제 신고기관명
    private String inst_nm; //보고서-일일 보안관제 피해기관명
    private String search_nm; //보고서-일일 보안관제 탐지명

    // 일일 보안관제결과 참고사항 리스트
    private String inci_acpn_yr;
    private String inci_acpn_mm;
    private String inci_acpn_dd;
    private String inci_acpn_hr;
    private String inci_acpn_mi;
    private String accd_typ_cd_nm;
    private String ip_addr;
    private String accd_typ_cd;

    private int    inci_day0;
    private int    inci_day1;
    private int    inci_day2;

    private int    inci_sum0;
    private int    inci_sum1;
    private int    inci_sum2;
    private String inci_sum_per;

    private String inci_type_cd;
    private String inci_type_nm;
    private int    inci_type_inst1;
    private int    inci_type_inst2;
    private int    inci_type_inst3;
    private int    inci_type_inst4;
    private int    inci_type_inst5;
    private int    inci_type_cnt;
    private int    inci_type_sum;

    private int    tms_sum_cnt0;
    private int    tms_web_cnt0;
    private int    tms_mal_cnt0;
    private int    tms_sum_cnt1;
    private int    tms_web_cnt1;
    private int    tms_mal_cnt1;
    private int    tms_total_cnt;

    private String sumDay;
    private String sumEndDt;
    private int    total_cnt;
    private int    end_cnt;
    private int    ing_cnt;

    public int getInci_type_inst5() {
        return inci_type_inst5;
    }

    public void setInci_type_inst5(int inci_type_inst5) {
        this.inci_type_inst5 = inci_type_inst5;
    }

    public String getInci_no() {
        return inci_no;
    }

    public void setInci_no(String inci_no) {
        this.inci_no = inci_no;
    }

    public String getInci_dt() {
        return inci_dt;
    }

    public void setInci_dt(String inci_dt) {
        this.inci_dt = inci_dt;
    }

    public String getInci_nm() {
        return inci_nm;
    }

    public void setInci_nm(String inci_nm) {
        this.inci_nm = inci_nm;
    }

    public String getOccr_dt0() {
        return occr_dt0;
    }

    public void setOccr_dt0(String occr_dt0) {
        this.occr_dt0 = occr_dt0;
    }

    public String getOccr_dt1() {
        return occr_dt1;
    }

    public void setOccr_dt1(String occr_dt1) {
        this.occr_dt1 = occr_dt1;
    }

    public String getOccr_dt2() {
        return occr_dt2;
    }

    public void setOccr_dt2(String occr_dt2) {
        this.occr_dt2 = occr_dt2;
    }

    public int getNis_cnt() {
        return nis_cnt;
    }

    public void setNis_cnt(int nis_cnt) {
        this.nis_cnt = nis_cnt;
    }

    public int getCnt_cnt() {
        return cnt_cnt;
    }

    public void setCnt_cnt(int cnt_cnt) {
        this.cnt_cnt = cnt_cnt;
    }

    public int getTng_cnt() {
        return tng_cnt;
    }

    public void setTng_cnt(int tng_cnt) {
        this.tng_cnt = tng_cnt;
    }

    public int getTot_cnt() {
        return tot_cnt;
    }

    public void setTot_cnt(int tot_cnt) {
        this.tot_cnt = tot_cnt;
    }

    public int getWorm_cnt() {
        return worm_cnt;
    }

    public void setWorm_cnt(int worm_cnt) {
        this.worm_cnt = worm_cnt;
    }

    public int getWeb_cnt() {
        return web_cnt;
    }

    public void setWeb_cnt(int web_cnt) {
        this.web_cnt = web_cnt;
    }

    public int getGook_cnt() {
        return gook_cnt;
    }

    public void setGook_cnt(int gook_cnt) {
        this.gook_cnt = gook_cnt;
    }

    public String getDcl_inst_cd_nm() {
        return dcl_inst_cd_nm;
    }

    public void setDcl_inst_cd_nm(String dcl_inst_cd_nm) {
        this.dcl_inst_cd_nm = dcl_inst_cd_nm;
    }

    public String getInst_nm() {
        return inst_nm;
    }

    public void setInst_nm(String inst_nm) {
        this.inst_nm = inst_nm;
    }

    public String getSearch_nm() {
        return search_nm;
    }

    public void setSearch_nm(String search_nm) {
        this.search_nm = search_nm;
    }

    public String getInci_acpn_yr() {
        return inci_acpn_yr;
    }

    public void setInci_acpn_yr(String inci_acpn_yr) {
        this.inci_acpn_yr = inci_acpn_yr;
    }

    public String getInci_acpn_mm() {
        return inci_acpn_mm;
    }

    public void setInci_acpn_mm(String inci_acpn_mm) {
        this.inci_acpn_mm = inci_acpn_mm;
    }

    public String getInci_acpn_dd() {
        return inci_acpn_dd;
    }

    public void setInci_acpn_dd(String inci_acpn_dd) {
        this.inci_acpn_dd = inci_acpn_dd;
    }

    public String getInci_acpn_hr() {
        return inci_acpn_hr;
    }

    public void setInci_acpn_hr(String inci_acpn_hr) {
        this.inci_acpn_hr = inci_acpn_hr;
    }

    public String getInci_acpn_mi() {
        return inci_acpn_mi;
    }

    public void setInci_acpn_mi(String inci_acpn_mi) {
        this.inci_acpn_mi = inci_acpn_mi;
    }

    public String getAccd_typ_cd_nm() {
        return accd_typ_cd_nm;
    }

    public void setAccd_typ_cd_nm(String accd_typ_cd_nm) {
        this.accd_typ_cd_nm = accd_typ_cd_nm;
    }

    public String getIp_addr() {
        return ip_addr;
    }

    public void setIp_addr(String ip_addr) {
        this.ip_addr = ip_addr;
    }

    public String getAccd_typ_cd() {
        return accd_typ_cd;
    }

    public void setAccd_typ_cd(String accd_typ_cd) {
        this.accd_typ_cd = accd_typ_cd;
    }

    public int getInci_day0() {
        return inci_day0;
    }

    public void setInci_day0(int inci_day0) {
        this.inci_day0 = inci_day0;
    }

    public int getInci_day1() {
        return inci_day1;
    }

    public void setInci_day1(int inci_day1) {
        this.inci_day1 = inci_day1;
    }

    public int getInci_day2() {
        return inci_day2;
    }

    public void setInci_day2(int inci_day2) {
        this.inci_day2 = inci_day2;
    }

    public int getInci_sum0() {
        return inci_sum0;
    }

    public void setInci_sum0(int inci_sum0) {
        this.inci_sum0 = inci_sum0;
    }

    public int getInci_sum1() {
        return inci_sum1;
    }

    public void setInci_sum1(int inci_sum1) {
        this.inci_sum1 = inci_sum1;
    }

    public int getInci_sum2() {
        return inci_sum2;
    }

    public void setInci_sum2(int inci_sum2) {
        this.inci_sum2 = inci_sum2;
    }

    public String getInci_sum_per() {
        return inci_sum_per;
    }

    public void setInci_sum_per(String inci_sum_per) {
        this.inci_sum_per = inci_sum_per;
    }

    public String getInci_type_cd() {
        return inci_type_cd;
    }

    public void setInci_type_cd(String inci_type_cd) {
        this.inci_type_cd = inci_type_cd;
    }

    public String getInci_type_nm() {
        return inci_type_nm;
    }

    public void setInci_type_nm(String inci_type_nm) {
        this.inci_type_nm = inci_type_nm;
    }

    public int getInci_type_inst1() {
        return inci_type_inst1;
    }

    public void setInci_type_inst1(int inci_type_inst1) {
        this.inci_type_inst1 = inci_type_inst1;
    }

    public int getInci_type_inst2() {
        return inci_type_inst2;
    }

    public void setInci_type_inst2(int inci_type_inst2) {
        this.inci_type_inst2 = inci_type_inst2;
    }

    public int getInci_type_inst3() {
        return inci_type_inst3;
    }

    public void setInci_type_inst3(int inci_type_inst3) {
        this.inci_type_inst3 = inci_type_inst3;
    }

    public int getInci_type_inst4() {
        return inci_type_inst4;
    }

    public void setInci_type_inst4(int inci_type_inst4) {
        this.inci_type_inst4 = inci_type_inst4;
    }

    public int getInci_type_cnt() {
        return inci_type_cnt;
    }

    public void setInci_type_cnt(int inci_type_cnt) {
        this.inci_type_cnt = inci_type_cnt;
    }

    public int getInci_type_sum() {
        return inci_type_sum;
    }

    public void setInci_type_sum(int inci_type_sum) {
        this.inci_type_sum = inci_type_sum;
    }

    public int getTms_sum_cnt0() {
        return tms_sum_cnt0;
    }

    public void setTms_sum_cnt0(int tms_sum_cnt0) {
        this.tms_sum_cnt0 = tms_sum_cnt0;
    }

    public int getTms_web_cnt0() {
        return tms_web_cnt0;
    }

    public void setTms_web_cnt0(int tms_web_cnt0) {
        this.tms_web_cnt0 = tms_web_cnt0;
    }

    public int getTms_mal_cnt0() {
        return tms_mal_cnt0;
    }

    public void setTms_mal_cnt0(int tms_mal_cnt0) {
        this.tms_mal_cnt0 = tms_mal_cnt0;
    }

    public int getTms_sum_cnt1() {
        return tms_sum_cnt1;
    }

    public void setTms_sum_cnt1(int tms_sum_cnt1) {
        this.tms_sum_cnt1 = tms_sum_cnt1;
    }

    public int getTms_web_cnt1() {
        return tms_web_cnt1;
    }

    public void setTms_web_cnt1(int tms_web_cnt1) {
        this.tms_web_cnt1 = tms_web_cnt1;
    }

    public int getTms_mal_cnt1() {
        return tms_mal_cnt1;
    }

    public void setTms_mal_cnt1(int tms_mal_cnt1) {
        this.tms_mal_cnt1 = tms_mal_cnt1;
    }

    public int getTms_total_cnt() {
        return tms_total_cnt;
    }

    public void setTms_total_cnt(int tms_total_cnt) {
        this.tms_total_cnt = tms_total_cnt;
    }

    public String getSumDay() {
        return sumDay;
    }

    public void setSumDay(String sumDay) {
        this.sumDay = sumDay;
    }

    public String getSumEndDt() {
        return sumEndDt;
    }

    public void setSumEndDt(String sumEndDt) {
        this.sumEndDt = sumEndDt;
    }

    public int getTotal_cnt() {
        return total_cnt;
    }

    public void setTotal_cnt(int total_cnt) {
        this.total_cnt = total_cnt;
    }

    public int getEnd_cnt() {
        return end_cnt;
    }

    public void setEnd_cnt(int end_cnt) {
        this.end_cnt = end_cnt;
    }

    public int getIng_cnt() {
        return ing_cnt;
    }

    public void setIng_cnt(int ing_cnt) {
        this.ing_cnt = ing_cnt;
    }

    @Override
    public String toString() {
        return "ReportDailyDto{" +
                "inci_no='" + inci_no + '\'' +
                ", inci_dt='" + inci_dt + '\'' +
                ", inci_nm='" + inci_nm + '\'' +
                ", occr_dt0='" + occr_dt0 + '\'' +
                ", occr_dt1='" + occr_dt1 + '\'' +
                ", occr_dt2='" + occr_dt2 + '\'' +
                ", nis_cnt=" + nis_cnt +
                ", cnt_cnt=" + cnt_cnt +
                ", tng_cnt=" + tng_cnt +
                ", tot_cnt=" + tot_cnt +
                ", worm_cnt=" + worm_cnt +
                ", web_cnt=" + web_cnt +
                ", gook_cnt=" + gook_cnt +
                ", dcl_inst_cd_nm='" + dcl_inst_cd_nm + '\'' +
                ", inst_nm='" + inst_nm + '\'' +
                ", search_nm='" + search_nm + '\'' +
                ", inci_acpn_yr='" + inci_acpn_yr + '\'' +
                ", inci_acpn_mm='" + inci_acpn_mm + '\'' +
                ", inci_acpn_dd='" + inci_acpn_dd + '\'' +
                ", inci_acpn_hr='" + inci_acpn_hr + '\'' +
                ", inci_acpn_mi='" + inci_acpn_mi + '\'' +
                ", accd_typ_cd_nm='" + accd_typ_cd_nm + '\'' +
                ", ip_addr='" + ip_addr + '\'' +
                ", accd_typ_cd='" + accd_typ_cd + '\'' +
                ", inci_day0=" + inci_day0 +
                ", inci_day1=" + inci_day1 +
                ", inci_day2=" + inci_day2 +
                ", inci_sum0=" + inci_sum0 +
                ", inci_sum1=" + inci_sum1 +
                ", inci_sum2=" + inci_sum2 +
                ", inci_sum_per='" + inci_sum_per + '\'' +
                ", inci_type_cd='" + inci_type_cd + '\'' +
                ", inci_type_nm='" + inci_type_nm + '\'' +
                ", inci_type_inst1=" + inci_type_inst1 +
                ", inci_type_inst2=" + inci_type_inst2 +
                ", inci_type_inst3=" + inci_type_inst3 +
                ", inci_type_inst4=" + inci_type_inst4 +
                ", inci_type_cnt=" + inci_type_cnt +
                ", inci_type_sum=" + inci_type_sum +
                ", tms_sum_cnt0=" + tms_sum_cnt0 +
                ", tms_web_cnt0=" + tms_web_cnt0 +
                ", tms_mal_cnt0=" + tms_mal_cnt0 +
                ", tms_sum_cnt1=" + tms_sum_cnt1 +
                ", tms_web_cnt1=" + tms_web_cnt1 +
                ", tms_mal_cnt1=" + tms_mal_cnt1 +
                ", tms_total_cnt=" + tms_total_cnt +
                '}';
    }
}
