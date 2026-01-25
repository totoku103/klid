package com.klid.webapp.main.mois.dashConfig.dto;

public class DashConfigDto {

    private String workCp1;			//근무현황회사1
    private String workCp2;			//근무현황회사2
    private String workCp3;			//근무현황회사3
    private int workPs1;			//근무현황총명1
    private int workPs2;			//근무현황총명2
    private int workPs3;			//근무현황총명3
    private String workMng1;		//근무현황담당자1
    private String workMng2;		//근무현황담당자2
    private String workMng3;		//근무현황담당자3
    private String workCon1;		//근무현황위탁요원1
    private String workCon2;		//근무현황위탁요원2
    private String workCon3;		//근무현황위탁요원3
    private int attCnt;			    //침해건수
    private int nirsCdM;			//국자원악성코드수동
    private int nirsCdA;			//국자원악성코드자동
    private int nirsCdD;			//국자원악성코드탐지
    private int nirsDdM;			//국자원DDOS수동
    private int nirsDdA;			//국자원DDOS자동
    private int nirsDdD;			//국자원DDOS탐지
    private int nirsHkM;			//국자원해킹수동
    private int nirsHkA;			//국자원해킹자동
    private int nirsHkD;			//국자원해킹탐지
    private int nirsEtM;			//국자원기타수동
    private int nirsEtA;			//국자원기타자동
    private int nirsEtD;			//국자원기타탐지
    private int klidCdM;			//개발원악성코드자동
    private int klidCdA;			//개발원악성코드수동
    private int klidCdD;			//개발원악성코드탐지
    private int klidDdM;			//개발원DDOS수동
    private int klidDdA;			//개발원DDOS자동
    private int klidDdD;			//개발원DDOS탐지
    private int klidHkM;			//개발원해킹수동
    private int klidHkA;			//개발원해킹자동
    private int klidHkD;			//개발원해킹탐지
    private int klidEtM;			//개발원기타수동
    private int klidEtA;			//개발원기타자동
    private int klidEtD;			//개발원기타탐지
    private float gtAv;			    //국통망평균값
    private float gtMax;			//국통망최대값
    private float ctAv;			    //센터망평균값
    private float ctMax;			//센터망최대값
    private float ssAv;			    //소속평균값
    private float ssMax;			//소속최대값
    private String gtRst;			//국통망결과
    private String ctRst;			//센터망결과
    private String ssRst;			//소속결과
    private int errSvr;			    //서버장애수
    private int errNet;			    //네트워크/보안장애수
    private int errStr;			    //스토리지장애수
    private int errBak;			    //백업/기타장애수
    private int errHom;			    //홈페이지장애수
    private String noti1;			//상황전파1
    private String noti2;			//상황전파2
    private String secu1;			//보안동향1
    private String secu2;			//보안동향2
    private String crtTime;			//등록시간
    private String modTime;			//수정시간
    private String datTime;			//데이터시간

    public String getWorkCp1() {
        return workCp1;
    }

    public void setWorkCp1(String workCp1) {
        this.workCp1 = workCp1;
    }

    public String getWorkCp2() {
        return workCp2;
    }

    public void setWorkCp2(String workCp2) {
        this.workCp2 = workCp2;
    }

    public String getWorkCp3() {
        return workCp3;
    }

    public void setWorkCp3(String workCp3) {
        this.workCp3 = workCp3;
    }

    public int getWorkPs1() {
        return workPs1;
    }

    public void setWorkPs1(int workPs1) {
        this.workPs1 = workPs1;
    }

    public int getWorkPs2() {
        return workPs2;
    }

    public void setWorkPs2(int workPs2) {
        this.workPs2 = workPs2;
    }

    public int getWorkPs3() {
        return workPs3;
    }

    public void setWorkPs3(int workPs3) {
        this.workPs3 = workPs3;
    }

    public String getWorkMng1() {
        return workMng1;
    }

    public void setWorkMng1(String workMng1) {
        this.workMng1 = workMng1;
    }

    public String getWorkMng2() {
        return workMng2;
    }

    public void setWorkMng2(String workMng2) {
        this.workMng2 = workMng2;
    }

    public String getWorkMng3() {
        return workMng3;
    }

    public void setWorkMng3(String workMng3) {
        this.workMng3 = workMng3;
    }

    public String getWorkCon1() {
        return workCon1;
    }

    public void setWorkCon1(String workCon1) {
        this.workCon1 = workCon1;
    }

    public String getWorkCon2() {
        return workCon2;
    }

    public void setWorkCon2(String workCon2) {
        this.workCon2 = workCon2;
    }

    public String getWorkCon3() {
        return workCon3;
    }

    public void setWorkCon3(String workCon3) {
        this.workCon3 = workCon3;
    }

    public int getAttCnt() {
        return attCnt;
    }

    public void setAttCnt(int attCnt) {
        this.attCnt = attCnt;
    }

    public int getNirsCdM() {
        return nirsCdM;
    }

    public void setNirsCdM(int nirsCdM) {
        this.nirsCdM = nirsCdM;
    }

    public int getNirsCdA() {
        return nirsCdA;
    }

    public void setNirsCdA(int nirsCdA) {
        this.nirsCdA = nirsCdA;
    }

    public int getNirsCdD() {
        return nirsCdD;
    }

    public void setNirsCdD(int nirsCdD) {
        this.nirsCdD = nirsCdD;
    }

    public int getNirsDdM() {
        return nirsDdM;
    }

    public void setNirsDdM(int nirsDdM) {
        this.nirsDdM = nirsDdM;
    }

    public int getNirsDdA() {
        return nirsDdA;
    }

    public void setNirsDdA(int nirsDdA) {
        this.nirsDdA = nirsDdA;
    }

    public int getNirsDdD() {
        return nirsDdD;
    }

    public void setNirsDdD(int nirsDdD) {
        this.nirsDdD = nirsDdD;
    }

    public int getNirsHkM() {
        return nirsHkM;
    }

    public void setNirsHkM(int nirsHkM) {
        this.nirsHkM = nirsHkM;
    }

    public int getNirsHkA() {
        return nirsHkA;
    }

    public void setNirsHkA(int nirsHkA) {
        this.nirsHkA = nirsHkA;
    }

    public int getNirsHkD() {
        return nirsHkD;
    }

    public void setNirsHkD(int nirsHkD) {
        this.nirsHkD = nirsHkD;
    }

    public int getNirsEtM() {
        return nirsEtM;
    }

    public void setNirsEtM(int nirsEtM) {
        this.nirsEtM = nirsEtM;
    }

    public int getNirsEtA() {
        return nirsEtA;
    }

    public void setNirsEtA(int nirsEtA) {
        this.nirsEtA = nirsEtA;
    }

    public int getNirsEtD() {
        return nirsEtD;
    }

    public void setNirsEtD(int nirsEtD) {
        this.nirsEtD = nirsEtD;
    }

    public int getKlidCdM() {
        return klidCdM;
    }

    public void setKlidCdM(int klidCdM) {
        this.klidCdM = klidCdM;
    }

    public int getKlidCdA() {
        return klidCdA;
    }

    public void setKlidCdA(int klidCdA) {
        this.klidCdA = klidCdA;
    }

    public int getKlidCdD() {
        return klidCdD;
    }

    public void setKlidCdD(int klidCdD) {
        this.klidCdD = klidCdD;
    }

    public int getKlidDdM() {
        return klidDdM;
    }

    public void setKlidDdM(int klidDdM) {
        this.klidDdM = klidDdM;
    }

    public int getKlidDdA() {
        return klidDdA;
    }

    public void setKlidDdA(int klidDdA) {
        this.klidDdA = klidDdA;
    }

    public int getKlidDdD() {
        return klidDdD;
    }

    public void setKlidDdD(int klidDdD) {
        this.klidDdD = klidDdD;
    }

    public int getKlidHkM() {
        return klidHkM;
    }

    public void setKlidHkM(int klidHkM) {
        this.klidHkM = klidHkM;
    }

    public int getKlidHkA() {
        return klidHkA;
    }

    public void setKlidHkA(int klidHkA) {
        this.klidHkA = klidHkA;
    }

    public int getKlidHkD() {
        return klidHkD;
    }

    public void setKlidHkD(int klidHkD) {
        this.klidHkD = klidHkD;
    }

    public int getKlidEtM() {
        return klidEtM;
    }

    public void setKlidEtM(int klidEtM) {
        this.klidEtM = klidEtM;
    }

    public int getKlidEtA() {
        return klidEtA;
    }

    public void setKlidEtA(int klidEtA) {
        this.klidEtA = klidEtA;
    }

    public int getKlidEtD() {
        return klidEtD;
    }

    public void setKlidEtD(int klidEtD) {
        this.klidEtD = klidEtD;
    }

    public float getGtAv() {
        return gtAv;
    }

    public void setGtAv(float gtAv) {
        this.gtAv = gtAv;
    }

    public float getGtMax() {
        return gtMax;
    }

    public void setGtMax(float gtMax) {
        this.gtMax = gtMax;
    }

    public float getCtAv() {
        return ctAv;
    }

    public void setCtAv(float ctAv) {
        this.ctAv = ctAv;
    }

    public float getCtMax() {
        return ctMax;
    }

    public void setCtMax(float ctMax) {
        this.ctMax = ctMax;
    }

    public float getSsAv() {
        return ssAv;
    }

    public void setSsAv(float ssAv) {
        this.ssAv = ssAv;
    }

    public float getSsMax() {
        return ssMax;
    }

    public void setSsMax(float ssMax) {
        this.ssMax = ssMax;
    }

    public String getGtRst() {
        return gtRst;
    }

    public void setGtRst(String gtRst) {
        this.gtRst = gtRst;
    }

    public String getCtRst() {
        return ctRst;
    }

    public void setCtRst(String ctRst) {
        this.ctRst = ctRst;
    }

    public String getSsRst() {
        return ssRst;
    }

    public void setSsRst(String ssRst) {
        this.ssRst = ssRst;
    }

    public int getErrSvr() {
        return errSvr;
    }

    public void setErrSvr(int errSvr) {
        this.errSvr = errSvr;
    }

    public int getErrNet() {
        return errNet;
    }

    public void setErrNet(int errNet) {
        this.errNet = errNet;
    }

    public int getErrStr() {
        return errStr;
    }

    public void setErrStr(int errStr) {
        this.errStr = errStr;
    }

    public int getErrBak() {
        return errBak;
    }

    public void setErrBak(int errBak) {
        this.errBak = errBak;
    }

    public int getErrHom() {
        return errHom;
    }

    public void setErrHom(int errHom) {
        this.errHom = errHom;
    }

    public String getNoti1() {
        return noti1;
    }

    public void setNoti1(String noti1) {
        this.noti1 = noti1;
    }

    public String getNoti2() {
        return noti2;
    }

    public void setNoti2(String noti2) {
        this.noti2 = noti2;
    }

    public String getSecu1() {
        return secu1;
    }

    public void setSecu1(String secu1) {
        this.secu1 = secu1;
    }

    public String getSecu2() {
        return secu2;
    }

    public void setSecu2(String secu2) {
        this.secu2 = secu2;
    }

    public String getCrtTime() {
        return crtTime;
    }

    public void setCrtTime(String crtTime) {
        this.crtTime = crtTime;
    }

    public String getModTime() {
        return modTime;
    }

    public void setModTime(String modTime) {
        this.modTime = modTime;
    }

    public String getDatTime() {
        return datTime;
    }

    public void setDatTime(String datTime) {
        this.datTime = datTime;
    }
}
