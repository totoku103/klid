package com.klid.common.hwplib.writer.bodytext.paragraph.control;

import com.klid.common.hwplib.object.bodytext.control.table.Cell;
import com.klid.common.hwplib.object.bodytext.control.table.Row;
import com.klid.common.hwplib.object.bodytext.control.ControlTable;
import com.klid.common.hwplib.util.compoundFile.writer.StreamWriter;
import com.klid.common.hwplib.writer.bodytext.paragraph.control.gso.part.ForCaption;
import com.klid.common.hwplib.writer.bodytext.paragraph.control.gso.part.ForCtrlHeaderGso;
import com.klid.common.hwplib.writer.bodytext.paragraph.control.tbl.ForCell;
import com.klid.common.hwplib.writer.bodytext.paragraph.control.tbl.ForTable;

import java.io.IOException;

/**
 * 표 컨트롤을 쓰기 위한 객체
 * 
 * @author neolord
 */
public class ForControlTable {
	/**
	 * 표 컨트롤을 쓴다.
	 * 
	 * @param t
	 *            표 컨트롤
	 * @param sw
	 *            스트림 라이터
	 * @throws IOException
	 */
	public static void write(ControlTable t, StreamWriter sw) throws IOException {
		ForCtrlHeaderGso.write(t.getHeader(), sw);

		sw.upRecordLevel();

		ForCaption.write(t.getCaption(), sw);
		ForTable.write(t.getTable(), sw);
		rows(t, sw);

		sw.downRecordLevel();
	}

	/**
	 * 표 컨트롤에 포함된 셀들을 쓴다.
	 * 
	 * @param t
	 *            표 컨트롤
	 * @param sw
	 *            스트림 라이터
	 * @throws IOException
	 */
	private static void rows(ControlTable t, StreamWriter sw) throws IOException {
		for (Row r : t.getRowList()) {
			for (Cell c : r.getCellList()) {
				ForCell.write(c, sw);
			}
		}
	}
}
