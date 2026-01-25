package com.klid.common.hwplib.writer.autosetter.control.gso.part;

import com.klid.common.hwplib.writer.autosetter.InstanceID;
import com.klid.common.hwplib.object.bodytext.control.gso.caption.Caption;
import com.klid.common.hwplib.writer.autosetter.ForParagraphList;

/**
 * 캡션 정보을 쓰기 전에 자동 설정하기 위한 객체
 * 
 * @author neolord
 */
public class ForCaption {
	/**
	 * 캡션 정보을 저장 설정한다.
	 * 
	 * @param c
	 *            캡션 정보 객체
	 * @param iid
	 *            인스턴스 id
	 */
	public static void autoSet(Caption c, InstanceID iid) {
		if (c == null) {
			return;
		}
		listHeader(c);
		ForParagraphList.autoSet(c.getParagraphList(), iid);
	}

	/**
	 * 리스트 헤더 레코드를 자동설정한다.
	 * 
	 * @param c
	 *            캡션 정보 객체
	 */
	private static void listHeader(Caption c) {
		c.getListHeader()
				.setParaCount(c.getParagraphList().getParagraphCount());
	}
}
