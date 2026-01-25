package com.klid.common.hwplib.writer.autosetter.control;

import com.klid.common.hwplib.object.bodytext.control.ControlField;
import com.klid.common.hwplib.writer.autosetter.InstanceID;
import com.klid.common.hwplib.object.bodytext.control.ctrlheader.CtrlHeaderField;

/**
 * 필드 컨트롤을 쓰기 전에 자동 설정하기 위한 객체
 * 
 * @author neolord
 */
public class ForControlField {
	/**
	 * 필드 컨트롤을 자동 설정한다.
	 * 
	 * @param f
	 *            필드 컨트롤
	 * @param iid
	 *            인스턴스 id
	 */
	public static void autoSet(ControlField f, InstanceID iid) {
		ctrlHeader(f.getHeader(), iid);
	}

	/**
	 * 컨트롤 헤더 레코드를 자동 설정한다.
	 * 
	 * @param h
	 *            컨트롤 헤더
	 * @param iid
	 *            인스턴스 id
	 */
	private static void ctrlHeader(CtrlHeaderField h, InstanceID iid) {
		h.setInstanceId(iid.get());
	}

}
