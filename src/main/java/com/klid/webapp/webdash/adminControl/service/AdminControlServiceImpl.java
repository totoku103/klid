package com.klid.webapp.webdash.adminControl.service;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.webdash.adminControl.dto.InciCntDto;
import com.klid.webapp.webdash.adminControl.persistence.AdminControlMapper;
import org.apache.commons.collections.CollectionUtils;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import java.util.*;

@Service("webdash.adminControlService")
public class AdminControlServiceImpl implements AdminControlService {

    @Resource(name = "webdash.adminControlMapper")
    private AdminControlMapper mapper;

    @Override
    public ReturnData getIncidentStatus(Criterion criterion) {
        return new ReturnData(mapper.selectIncidentStatus(criterion.getCondition()));
    }

    @Override
    public ReturnData getInciCnt(Criterion criterion) {
        List<String> dbList = mapper.selectInciCnt(criterion.getCondition());
        List<InciCntDto> inciList = new ArrayList<>();
        if(!CollectionUtils.isEmpty(dbList)) {
            Map<String, Integer> map = new HashMap<>();
            for(String sumJson : dbList) {
                JSONObject jsonObj = new JSONObject(sumJson);
                Iterator<String> keys = jsonObj.keys();
                while(keys.hasNext()) {
                    String key = keys.next();
                    int value = jsonObj.getInt(key);
                    if(map.containsKey(key)) {
                        map.put(key, map.get(key) + value);
                    }
                    else {
                        map.put(key, value);
                    }
                }
            }

            Iterator<String> mapKeys =  map.keySet().iterator();
            while(mapKeys.hasNext()) {
                String mapKey = mapKeys.next();
                InciCntDto dto = new InciCntDto(mapKey, map.get(mapKey));

                if(!dto.getName().equals("기타")){
                    inciList.add(dto);
                }

            }
        }
        return new ReturnData(inciList);
    }

    @Override
    public ReturnData getTbzledgeCnt(Criterion criterion) {
        return new ReturnData(mapper.selectTbzledgeCnt(criterion.getCondition()));
    }

    @Override
    public ReturnData getLocalInciCnt(Criterion criterion) {
        List<String> dbList = mapper.selectLocalInciCnt(criterion.getCondition());
        List<InciCntDto> inciList = new ArrayList<>();
        if(!CollectionUtils.isEmpty(dbList)) {
            Map<String, Integer> map = new HashMap<>();
            for(String sumJson : dbList) {
                JSONObject jsonObj = new JSONObject(sumJson);
                Iterator<String> keys = jsonObj.keys();
                while(keys.hasNext()) {
                    String key = keys.next();
                    int value = jsonObj.getInt(key);
                    if(map.containsKey(key)) {
                        map.put(key, map.get(key) + value);
                    }
                    else {
                        map.put(key, value);
                    }
                }
            }

            if(criterion.getValue("sAuthMain").equals("AUTH_MAIN_2")) {
                inciList.add(new InciCntDto("서울", 0));
                inciList.add(new InciCntDto("부산", 0));
                inciList.add(new InciCntDto("대구", 0));
                inciList.add(new InciCntDto("인천", 0));
                inciList.add(new InciCntDto("광주", 0));
                inciList.add(new InciCntDto("대전", 0));
                inciList.add(new InciCntDto("울산", 0));
                inciList.add(new InciCntDto("세종", 0));
                inciList.add(new InciCntDto("경기", 0));
                inciList.add(new InciCntDto("강원", 0));
                inciList.add(new InciCntDto("충북", 0));
                inciList.add(new InciCntDto("충남", 0));
                inciList.add(new InciCntDto("전북", 0));
                inciList.add(new InciCntDto("전남", 0));
                inciList.add(new InciCntDto("경북", 0));
                inciList.add(new InciCntDto("경남", 0));
                inciList.add(new InciCntDto("제주", 0));

                Iterator<String> mapKeys =  map.keySet().iterator();
                while(mapKeys.hasNext()) {
                    String mapKey = mapKeys.next();

                    for(int i=0; i<inciList.size();i++){
                        if(inciList.get(i).getName().equals(mapKey)){
                            inciList.set(i, new InciCntDto(mapKey, map.get(mapKey)));
                        }
                    }
                }

            }else{
                Iterator<String> mapKeys =  map.keySet().iterator();
                while(mapKeys.hasNext()) {
                    String mapKey = mapKeys.next();
                    InciCntDto dto = new InciCntDto(mapKey, map.get(mapKey));
                    inciList.add(dto);
                }
            }

        }
        return new ReturnData(inciList);
    }

    @Override
    public ReturnData getLocalStatus(Criterion criterion) {
        return new ReturnData(mapper.selectLocalStatus(criterion.getCondition()));
    }

    @Override
    public ReturnData getUrlStatus(Criterion criterion) {
        return new ReturnData(mapper.selectUrlStatus(criterion.getCondition()));
    }

    @Override
    public ReturnData getSysErrorStatus(Criterion criterion) {
        return new ReturnData(mapper.selectSysErrorStatus(criterion.getCondition()));
    }

    @Override
    public ReturnData getInciTypeCnt(Criterion criterion) {
        List<String> list = mapper.selectInciTypeCnt(criterion.getCondition());
        return new ReturnData(list);
    }
}
