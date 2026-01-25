/**
 * Program Name	: WebDashCenterServiceImpl.java
 * <p>
 * Version		:  1.0
 * <p>
 * Creation Date	: 2015. 12. 22.
 * <p>
 * Programmer Name 	:  kim dong ju
 * <p>
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 * P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.webdash.center.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.webdash.adminControl.dto.InciCntDto;
import com.klid.webapp.webdash.center.dto.WebDashCenterDto;
import com.klid.webapp.webdash.center.persistence.WebDashCenterMapper;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.map.HashedMap;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import java.util.*;

@Service("webDashCenterService")
public class WebDashCenterServiceImpl extends MsgService implements WebDashCenterService {

    @Resource(name = "webDashCenterMapper")
    private WebDashCenterMapper mapper;

    @Override
    public ReturnData getAttNationTop5(Criterion criterion) {
        return new ReturnData(mapper.selectAttNationTop5(criterion.getCondition()));
    }

    @Override
    public ReturnData getTypeChart(Criterion criterion) {
        List<WebDashCenterDto> dbList = mapper.selectTypeChart(criterion.getCondition());
        List<Map<String, Integer>> listMap = new ArrayList<Map<String, Integer>>();

        listMap = regHhListReturn(dbList, listMap);

        return new ReturnData(listMap);
    }

    public List<Map<String, Integer>> regHhListReturn(List<WebDashCenterDto> dbList, List<Map<String, Integer>> listMap) {
        if (!CollectionUtils.isEmpty(dbList)) {
            Map<String, Integer> amap = new HashMap<>();
            Map<String, Integer> bmap = new HashMap<>();
            Map<String, Integer> cmap = new HashMap<>();
            Map<String, Integer> dmap = new HashMap<>();
            Map<String, Integer> emap = new HashMap<>();
            Map<String, Integer> fmap = new HashMap<>();
            Map<String, Integer> gmap = new HashMap<>();
            Map<String, Integer> hmap = new HashMap<>();
            Map<String, Integer> imap = new HashMap<>();
            Map<String, Integer> jmap = new HashMap<>();
            Map<String, Integer> kmap = new HashMap<>();
            Map<String, Integer> lmap = new HashMap<>();
            Map<String, Integer> mmap = new HashMap<>();
            Map<String, Integer> nmap = new HashMap<>();
            Map<String, Integer> omap = new HashMap<>();
            Map<String, Integer> pmap = new HashMap<>();
            Map<String, Integer> qmap = new HashMap<>();
            Map<String, Integer> rmap = new HashMap<>();
            Map<String, Integer> smap = new HashMap<>();
            Map<String, Integer> tmap = new HashMap<>();
            Map<String, Integer> umap = new HashMap<>();
            Map<String, Integer> vmap = new HashMap<>();
            Map<String, Integer> wmap = new HashMap<>();
            Map<String, Integer> xmap = new HashMap<>();

            for (WebDashCenterDto re : dbList) {
                switch (re.getRegHh()) {
                    case "0":
                        amap = regHHJsonReturn(amap, re);
                        break;
                    case "1":
                        bmap = regHHJsonReturn(bmap, re);
                        break;
                    case "2":
                        cmap = regHHJsonReturn(cmap, re);
                        break;
                    case "3":
                        dmap = regHHJsonReturn(dmap, re);
                        break;
                    case "4":
                        emap = regHHJsonReturn(emap, re);
                        break;
                    case "5":
                        fmap = regHHJsonReturn(fmap, re);
                        break;
                    case "6":
                        gmap = regHHJsonReturn(gmap, re);
                        break;
                    case "7":
                        hmap = regHHJsonReturn(hmap, re);
                        break;
                    case "8":
                        imap = regHHJsonReturn(imap, re);
                        break;
                    case "9":
                        jmap = regHHJsonReturn(jmap, re);
                        break;
                    case "10":
                        kmap = regHHJsonReturn(kmap, re);
                        break;
                    case "11":
                        lmap = regHHJsonReturn(lmap, re);
                        break;
                    case "12":
                        nmap = regHHJsonReturn(nmap, re);
                        break;
                    case "13":
                        mmap = regHHJsonReturn(mmap, re);
                        break;
                    case "14":
                        omap = regHHJsonReturn(omap, re);
                        break;
                    case "15":
                        pmap = regHHJsonReturn(pmap, re);
                        break;
                    case "16":
                        qmap = regHHJsonReturn(qmap, re);
                        break;
                    case "17":
                        rmap = regHHJsonReturn(rmap, re);
                        break;
                    case "18":
                        smap = regHHJsonReturn(smap, re);
                        break;
                    case "19":
                        tmap = regHHJsonReturn(tmap, re);
                        break;
                    case "20":
                        umap = regHHJsonReturn(umap, re);
                        break;
                    case "21":
                        vmap = regHHJsonReturn(vmap, re);
                        break;
                    case "22":
                        wmap = regHHJsonReturn(wmap, re);
                        break;
                    case "23":
                        xmap = regHHJsonReturn(xmap, re);
                        break;
                }
            }
            listMap.add(amap);
            listMap.add(bmap);
            listMap.add(cmap);
            listMap.add(dmap);
            listMap.add(emap);
            listMap.add(fmap);
            listMap.add(gmap);
            listMap.add(hmap);
            listMap.add(imap);
            listMap.add(jmap);
            listMap.add(kmap);
            listMap.add(lmap);
            listMap.add(mmap);
            listMap.add(nmap);
            listMap.add(omap);
            listMap.add(pmap);
            listMap.add(qmap);
            listMap.add(rmap);
            listMap.add(smap);
            listMap.add(tmap);
            listMap.add(umap);
            listMap.add(vmap);
            listMap.add(wmap);
            listMap.add(xmap);
        }
        return listMap;
    }

    public Map<String, Integer> regHHJsonReturn(Map<String, Integer> map, WebDashCenterDto re) {
            JSONObject jsonObj = new JSONObject(re.getSumJson());
            Iterator<String> keys = jsonObj.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                int value = jsonObj.getInt(key);
                if (map.containsKey(key)) {
                    map.put(key, map.get(key) + value);
                } else {
                    map.put(key, value);
                }
            }
            map.put("regHh", Integer.parseInt(re.getRegHh()));

        return map;
    }

    @Override
    public ReturnData getEvtAllChart(Criterion criterion) {
        List<WebDashCenterDto> dbList = mapper.selectEvtAllChart(criterion.getCondition());
        Map<String,List<Map<String, Integer>>> listMap= new HashMap<String,List<Map<String, Integer>>>();
        listMap= dayTypeListReturn(dbList,listMap);
        return new ReturnData(listMap);
    }

    @Override
    public ReturnData getEvtChart(Criterion criterion) {
        List<WebDashCenterDto> dbList = mapper.selectEvtChart(criterion.getCondition());
        Map<String,List<Map<String, Integer>>> listMap= new HashMap<String,List<Map<String, Integer>>>();
        listMap= dayTypeListReturn(dbList,listMap);
        return new ReturnData(listMap);


//        if (!CollectionUtils.isEmpty(dbList)) {
//            Map<String, Integer> map = new HashMap<>();
//            for (WebDashCenterDto re : dbList) {
//                List<InciCntDto> inciList = new ArrayList<>();
//
//                JSONObject jsonObj = new JSONObject(re.getSumJson());
//                Iterator<String> keys = jsonObj.keys();
//                while (keys.hasNext()) {
//                    String key = keys.next();
//                    int value = jsonObj.getInt(key);
//                    if (map.containsKey(key)) {
//                        map.put(key, map.get(key) + value);
//                    } else {
//                        map.put(key, value);
//                    }
//                }
//
//                Iterator<String> mapKeys = map.keySet().iterator();
//                while (mapKeys.hasNext()) {
//                    String mapKey = mapKeys.next();
//                    InciCntDto dto = new InciCntDto(mapKey, map.get(mapKey));
//                    inciList.add(dto);
//                }
//                re.setJsonList(inciList);
//                re.setSumJson("");
//            }
//
//
//        }
//        return new ReturnData(mapper.selectEvtChart(criterion.getCondition()));
        //return new ReturnData(mapper.selectEvtChart(criterion.getCondition()));
//        return new ReturnData(listMap);
    }

    public Map<String,List<Map<String, Integer>>> dayTypeListReturn(List<WebDashCenterDto> dbList, Map<String,List<Map<String, Integer>>> listMap) {
        List<Map<String, Integer>> todayListMap = new ArrayList<Map<String, Integer>>();
        List<Map<String, Integer>> yesterdayListMap = new ArrayList<Map<String, Integer>>();
        List<Map<String, Integer>> lastWeekListMap = new ArrayList<Map<String, Integer>>();

        Map<String, Integer> amap = new HashMap<>(),aamap = new HashMap<>(),aaamap = new HashMap<>();
        Map<String, Integer> bmap = new HashMap<>(),bbmap = new HashMap<>(),bbbmap = new HashMap<>();
        Map<String, Integer> cmap = new HashMap<>(),ccmap = new HashMap<>(),cccmap = new HashMap<>();
        Map<String, Integer> dmap = new HashMap<>(),ddmap = new HashMap<>(),dddmap = new HashMap<>();
        Map<String, Integer> emap = new HashMap<>(),eemap = new HashMap<>(),eeemap = new HashMap<>();
        Map<String, Integer> fmap = new HashMap<>(),ffmap = new HashMap<>(),fffmap = new HashMap<>();
        Map<String, Integer> gmap = new HashMap<>(),ggmap = new HashMap<>(),gggmap = new HashMap<>();
        Map<String, Integer> hmap = new HashMap<>(),hhmap = new HashMap<>(),hhhmap = new HashMap<>();
        Map<String, Integer> imap = new HashMap<>(),iimap = new HashMap<>(),iiimap = new HashMap<>();
        Map<String, Integer> jmap = new HashMap<>(),jjmap = new HashMap<>(),jjjmap = new HashMap<>();
        Map<String, Integer> kmap = new HashMap<>(),kkmap = new HashMap<>(),kkkmap = new HashMap<>();
        Map<String, Integer> lmap = new HashMap<>(),llmap = new HashMap<>(),lllmap = new HashMap<>();
        Map<String, Integer> mmap = new HashMap<>(),mmmap = new HashMap<>(),mmmmap = new HashMap<>();
        Map<String, Integer> nmap = new HashMap<>(),nnmap = new HashMap<>(),nnnmap = new HashMap<>();
        Map<String, Integer> omap = new HashMap<>(),oomap = new HashMap<>(),ooomap = new HashMap<>();
        Map<String, Integer> pmap = new HashMap<>(),ppmap = new HashMap<>(),pppmap = new HashMap<>();
        Map<String, Integer> qmap = new HashMap<>(),qqmap = new HashMap<>(),qqqmap = new HashMap<>();
        Map<String, Integer> rmap = new HashMap<>(),rrmap = new HashMap<>(),rrrmap = new HashMap<>();
        Map<String, Integer> smap = new HashMap<>(),ssmap = new HashMap<>(),sssmap = new HashMap<>();
        Map<String, Integer> tmap = new HashMap<>(),ttmap = new HashMap<>(),tttmap = new HashMap<>();
        Map<String, Integer> umap = new HashMap<>(),uumap = new HashMap<>(),uuumap = new HashMap<>();
        Map<String, Integer> vmap = new HashMap<>(),vvmap = new HashMap<>(),vvvmap = new HashMap<>();
        Map<String, Integer> wmap = new HashMap<>(),wwmap = new HashMap<>(),wwwmap = new HashMap<>();
        Map<String, Integer> xmap = new HashMap<>(),xxmap = new HashMap<>(),xxxmap = new HashMap<>();
        if (!CollectionUtils.isEmpty(dbList)) {

            for (WebDashCenterDto re : dbList) {
                switch (re.getDayType()){
                    case "today":
                        switch (re.getRegHh()){
                            case "0":
                                amap = regHHJsonReturn(amap, re);
                                break;
                            case "1":
                                bmap = regHHJsonReturn(bmap, re);
                                break;
                            case "2":
                                cmap = regHHJsonReturn(cmap, re);
                                break;
                            case "3":
                                dmap = regHHJsonReturn(dmap, re);
                                break;
                            case "4":
                                emap = regHHJsonReturn(emap, re);
                                break;
                            case "5":
                                fmap = regHHJsonReturn(fmap, re);
                                break;
                            case "6":
                                gmap = regHHJsonReturn(gmap, re);
                                break;
                            case "7":
                                hmap = regHHJsonReturn(hmap, re);
                                break;
                            case "8":
                                imap = regHHJsonReturn(imap, re);
                                break;
                            case "9":
                                jmap = regHHJsonReturn(jmap, re);
                                break;
                            case "10":
                                kmap = regHHJsonReturn(kmap, re);
                                break;
                            case "11":
                                lmap = regHHJsonReturn(lmap, re);
                                break;
                            case "12":
                                nmap = regHHJsonReturn(nmap, re);
                                break;
                            case "13":
                                mmap = regHHJsonReturn(mmap, re);
                                break;
                            case "14":
                                omap = regHHJsonReturn(omap, re);
                                break;
                            case "15":
                                pmap = regHHJsonReturn(pmap, re);
                                break;
                            case "16":
                                qmap = regHHJsonReturn(qmap, re);
                                break;
                            case "17":
                                rmap = regHHJsonReturn(rmap, re);
                                break;
                            case "18":
                                smap = regHHJsonReturn(smap, re);
                                break;
                            case "19":
                                tmap = regHHJsonReturn(tmap, re);
                                break;
                            case "20":
                                umap = regHHJsonReturn(umap, re);
                                break;
                            case "21":
                                vmap = regHHJsonReturn(vmap, re);
                                break;
                            case "22":
                                wmap = regHHJsonReturn(wmap, re);
                                break;
                            case "23":
                                xmap = regHHJsonReturn(xmap, re);
                                break;
                        }
                        break;
                    case "yesterday":
                        switch (re.getRegHh()){
                            case "0":
                                aamap = regHHJsonReturn(aamap, re);
                                break;
                            case "1":
                                bbmap = regHHJsonReturn(bbmap, re);
                                break;
                            case "2":
                                ccmap = regHHJsonReturn(ccmap, re);
                                break;
                            case "3":
                                ddmap = regHHJsonReturn(ddmap, re);
                                break;
                            case "4":
                                eemap = regHHJsonReturn(eemap, re);
                                break;
                            case "5":
                                ffmap = regHHJsonReturn(ffmap, re);
                                break;
                            case "6":
                                ggmap = regHHJsonReturn(ggmap, re);
                                break;
                            case "7":
                                hhmap = regHHJsonReturn(hhmap, re);
                                break;
                            case "8":
                                iimap = regHHJsonReturn(iimap, re);
                                break;
                            case "9":
                                jjmap = regHHJsonReturn(jjmap, re);
                                break;
                            case "10":
                                kkmap = regHHJsonReturn(kkmap, re);
                                break;
                            case "11":
                                llmap = regHHJsonReturn(llmap, re);
                                break;
                            case "12":
                                nnmap = regHHJsonReturn(nnmap, re);
                                break;
                            case "13":
                                mmmap = regHHJsonReturn(mmmap, re);
                                break;
                            case "14":
                                oomap = regHHJsonReturn(oomap, re);
                                break;
                            case "15":
                                ppmap = regHHJsonReturn(ppmap, re);
                                break;
                            case "16":
                                qqmap = regHHJsonReturn(qqmap, re);
                                break;
                            case "17":
                               rrmap = regHHJsonReturn(rrmap, re);
                                break;
                            case "18":
                                ssmap = regHHJsonReturn(ssmap, re);
                                break;
                            case "19":
                                ttmap = regHHJsonReturn(ttmap, re);
                                break;
                            case "20":
                                uumap = regHHJsonReturn(uumap, re);
                                break;
                            case "21":
                                vvmap = regHHJsonReturn(vvmap, re);
                                break;
                            case "22":
                                wwmap = regHHJsonReturn(wwmap, re);
                                break;
                            case "23":
                                xxmap = regHHJsonReturn(xxmap, re);
                                break;
                        }
                        break;
                    case "lastWeek":
                        switch (re.getRegHh()){
                            case "0":
                                aaamap = regHHJsonReturn(aaamap, re);
                                break;
                            case "1":
                                bbbmap = regHHJsonReturn(bbbmap, re);
                                break;
                            case "2":
                                cccmap = regHHJsonReturn(cccmap, re);
                                break;
                            case "3":
                                dddmap = regHHJsonReturn(dddmap, re);
                                break;
                            case "4":
                                eeemap = regHHJsonReturn(eeemap, re);
                                break;
                            case "5":
                                fffmap = regHHJsonReturn(fffmap, re);
                                break;
                            case "6":
                                gggmap = regHHJsonReturn(gggmap, re);
                                break;
                            case "7":
                                hhhmap = regHHJsonReturn(hhhmap, re);
                                break;
                            case "8":
                                iiimap = regHHJsonReturn(iiimap, re);
                                break;
                            case "9":
                                jjjmap = regHHJsonReturn(jjjmap, re);
                                break;
                            case "10":
                                kkkmap = regHHJsonReturn(kkkmap, re);
                                break;
                            case "11":
                                lllmap = regHHJsonReturn(lllmap, re);
                                break;
                            case "12":
                                nnnmap = regHHJsonReturn(nnnmap, re);
                                break;
                            case "13":
                                mmmmap = regHHJsonReturn(mmmmap, re);
                                break;
                            case "14":
                                ooomap = regHHJsonReturn(ooomap, re);
                                break;
                            case "15":
                                pppmap = regHHJsonReturn(pppmap, re);
                                break;
                            case "16":
                                qqqmap = regHHJsonReturn(qqqmap, re);
                                break;
                            case "17":
                                rrrmap = regHHJsonReturn(rrrmap, re);
                                break;
                            case "18":
                                sssmap = regHHJsonReturn(sssmap, re);
                                break;
                            case "19":
                                tttmap = regHHJsonReturn(tttmap, re);
                                break;
                            case "20":
                                uuumap = regHHJsonReturn(uuumap, re);
                                break;
                            case "21":
                                vvvmap = regHHJsonReturn(vvvmap, re);
                                break;
                            case "22":
                                wwwmap = regHHJsonReturn(wwwmap, re);
                                break;
                            case "23":
                                xxxmap = regHHJsonReturn(xxxmap, re);
                                break;
                        }
                        break;
                }
            }

        }
        todayListMap.add(amap);yesterdayListMap.add(aamap);lastWeekListMap.add(aaamap);
        todayListMap.add(bmap);yesterdayListMap.add(bbmap);lastWeekListMap.add(bbbmap);
        todayListMap.add(cmap);yesterdayListMap.add(ccmap);lastWeekListMap.add(cccmap);
        todayListMap.add(dmap);yesterdayListMap.add(ddmap);lastWeekListMap.add(dddmap);
        todayListMap.add(emap);yesterdayListMap.add(eemap);lastWeekListMap.add(eeemap);
        todayListMap.add(fmap);yesterdayListMap.add(ffmap);lastWeekListMap.add(fffmap);
        todayListMap.add(gmap);yesterdayListMap.add(ggmap);lastWeekListMap.add(gggmap);
        todayListMap.add(hmap);yesterdayListMap.add(hhmap);lastWeekListMap.add(hhhmap);
        todayListMap.add(imap);yesterdayListMap.add(iimap);lastWeekListMap.add(iiimap);
        todayListMap.add(jmap);yesterdayListMap.add(jjmap);lastWeekListMap.add(jjjmap);
        todayListMap.add(kmap);yesterdayListMap.add(kkmap);lastWeekListMap.add(kkkmap);
        todayListMap.add(lmap);yesterdayListMap.add(llmap);lastWeekListMap.add(lllmap);
        todayListMap.add(mmap);yesterdayListMap.add(mmmap);lastWeekListMap.add(mmmmap);
        todayListMap.add(nmap);yesterdayListMap.add(nnmap);lastWeekListMap.add(nnnmap);
        todayListMap.add(omap);yesterdayListMap.add(oomap);lastWeekListMap.add(ooomap);
        todayListMap.add(pmap);yesterdayListMap.add(ppmap);lastWeekListMap.add(pppmap);
        todayListMap.add(qmap);yesterdayListMap.add(qqmap);lastWeekListMap.add(qqqmap);
        todayListMap.add(rmap);yesterdayListMap.add(rrmap);lastWeekListMap.add(rrrmap);
        todayListMap.add(smap);yesterdayListMap.add(ssmap);lastWeekListMap.add(sssmap);
        todayListMap.add(tmap);yesterdayListMap.add(ttmap);lastWeekListMap.add(tttmap);
        todayListMap.add(umap);yesterdayListMap.add(uumap);lastWeekListMap.add(uuumap);
        todayListMap.add(vmap);yesterdayListMap.add(vvmap);lastWeekListMap.add(vvvmap);
        todayListMap.add(wmap);yesterdayListMap.add(wwmap);lastWeekListMap.add(wwwmap);
        todayListMap.add(xmap);yesterdayListMap.add(xxmap);lastWeekListMap.add(xxxmap);
        listMap.put("today",todayListMap);
        listMap.put("yesterday",yesterdayListMap);
        listMap.put("lastWeek",lastWeekListMap);

        return listMap;
    }

    public Map<String, Integer> dayTypeJsonReturn(Map<String, Integer> map, WebDashCenterDto re) {

            JSONObject jsonObj = new JSONObject(re.getSumJson());
            Iterator<String> keys = jsonObj.keys();
            while (keys.hasNext()) {
                String key = keys.next();
                int value = jsonObj.getInt(key);
                if (map.containsKey(key)) {
                    map.put(key, map.get(key) + value);
                } else {
                    map.put(key, value);
                }
            }

            map.put("regHh", Integer.parseInt(re.getRegHh()));

        return map;
    }

}
