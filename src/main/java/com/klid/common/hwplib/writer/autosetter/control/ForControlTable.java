package com.klid.common.hwplib.writer.autosetter.control;

import com.klid.common.hwplib.object.bodytext.control.table.Cell;
import com.klid.common.hwplib.writer.autosetter.InstanceID;
import com.klid.common.hwplib.writer.autosetter.control.gso.part.ForCaption;
import com.klid.common.hwplib.writer.autosetter.control.gso.part.ForCtrlHeaderGso;
import com.klid.common.hwplib.object.bodytext.control.ControlTable;
import com.klid.common.hwplib.object.bodytext.control.table.Row;
import com.klid.common.hwplib.object.bodytext.control.table.Table;
import com.klid.common.hwplib.writer.autosetter.ForParagraphList;

/**
 * 표 컨트롤을 쓰기 전에 자동 설정하기 위한 객체
 * 
 * @author neolord
 */
public class ForControlTable {
	/**
	 * 표 컨트롤을 자동 설정한다.
	 * 
	 * @param t
	 *            표 컨트롤
	 * @param iid
	 *            인스턴스 id
	 */
	public static void autoSet(ControlTable t, InstanceID iid) {
		ForCtrlHeaderGso.autoSet(t.getHeader(), iid);
		ForCaption.autoSet(t.getCaption(), iid);
		table(t);
		cells(t, iid);
	}

	/**
	 * 표 정보 객체를 자동 설정한다.
	 * 
	 * @param t
	 *            표 컨트롤
	 */
	private static void table(ControlTable t) {
		Table tbl = t.getTable();
		tbl.setRowCount(t.getRowList().size());

		tbl.getCellCountOfRowList().clear();
		for (Row r : t.getRowList()) {
			tbl.getCellCountOfRowList().add(r.getCellList().size());
		}
	}

	/**
	 * 셀들을 자동 설정한다.
	 * 
	 * @param t
	 *            표 컨트롤
	 * @param iid
	 *            인스턴스 id
	 */
	private static void cells(ControlTable t, InstanceID iid) {
		for (Row r : t.getRowList()) {
			for (Cell c : r.getCellList()) {
				listHeader(c);
				ForParagraphList.autoSet(c.getParagraphList(), iid);
			}
		}
	}

	/**
	 * 셀의 리스트 헤더 레코드를 자동 설정한다.
	 * 
	 * @param c
	 *            셀 객체
	 */
	private static void listHeader(Cell c) {
		c.getListHeader()
				.setParaCount(c.getParagraphList().getParagraphCount());
	}
}
