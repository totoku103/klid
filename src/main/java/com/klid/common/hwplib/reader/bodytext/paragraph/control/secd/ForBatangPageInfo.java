package com.klid.common.hwplib.reader.bodytext.paragraph.control.secd;

import com.klid.common.hwplib.object.bodytext.control.sectiondefine.ListHeaderForBatangPage;
import com.klid.common.hwplib.reader.bodytext.ForParagraphList;
import com.klid.common.hwplib.object.bodytext.control.sectiondefine.BatangPageInfo;
import com.klid.common.hwplib.util.compoundFile.reader.StreamReader;

import java.io.IOException;

/**
 * 바탕쪽 정보를 읽기 위한 객체
 * 
 * @author neolord
 */
public class ForBatangPageInfo {
	/**
	 * 바탕쪽 정보를 읽는다.
	 * 
	 * @param bpi
	 *            바탕쪽 정보
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	public static void read(BatangPageInfo bpi, StreamReader sr)
			throws IOException {
		listHeader(bpi.getListHeader(), sr);
		ForParagraphList.read(bpi.getParagraphList(), sr);
	}

	/**
	 * 바탕쪽의 문단 리스트 헤더 레코드를 읽는다.
	 * 
	 * @param lh
	 *            바탕쪽의 문단 리스트 헤더 레코드
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	private static void listHeader(ListHeaderForBatangPage lh, StreamReader sr)
			throws IOException {
		lh.setParaCount(sr.readSInt4());
		lh.getProperty().setValue(sr.readUInt4());
		lh.setTextWidth(sr.readUInt4());
		lh.setTextHeight(sr.readUInt4());
		sr.skipToEndRecord();
	}
}
