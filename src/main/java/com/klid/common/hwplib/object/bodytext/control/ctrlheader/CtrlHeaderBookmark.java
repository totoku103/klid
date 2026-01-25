package com.klid.common.hwplib.object.bodytext.control.ctrlheader;

import com.klid.common.hwplib.object.bodytext.control.ControlType;

/**
 * 책갈피 컨트롤을 위한 컨트롤 헤더 레코드
 * 
 * @author neolord
 */
public class CtrlHeaderBookmark extends CtrlHeader {
	/**
	 * 생성자
	 */
	public CtrlHeaderBookmark() {
		super(ControlType.Bookmark.getCtrlId());
	}
}
