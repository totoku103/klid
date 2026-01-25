package com.klid.common.hwplib.object.bodytext.control;

import com.klid.common.hwplib.object.bodytext.control.ctrlheader.CtrlHeaderIndexMark;

/**
 * 찾아보기 표식 컨트롤
 * 
 * @author neolord
 */
public class ControlIndexMark extends Control {
	/**
	 * 생성자
	 */
	public ControlIndexMark() {
		super(new CtrlHeaderIndexMark());
	}

	/**
	 * 찾아보기 표식용 컨트롤 헤더를 반환한다.
	 * 
	 * @return 찾아보기 표식용 컨트롤 헤더
	 */
	public CtrlHeaderIndexMark getHeader() {
		return (CtrlHeaderIndexMark) header;
	}
}