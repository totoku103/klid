package com.klid.common.hwplib.writer.autosetter.control;

import com.klid.common.hwplib.writer.autosetter.InstanceID;
import com.klid.common.hwplib.writer.autosetter.control.gso.ForGsoControl;
import com.klid.common.hwplib.object.bodytext.control.Control;
import com.klid.common.hwplib.object.bodytext.control.ControlColumnDefine;
import com.klid.common.hwplib.object.bodytext.control.ControlEndnote;
import com.klid.common.hwplib.object.bodytext.control.ControlEquation;
import com.klid.common.hwplib.object.bodytext.control.ControlField;
import com.klid.common.hwplib.object.bodytext.control.ControlFooter;
import com.klid.common.hwplib.object.bodytext.control.ControlFootnote;
import com.klid.common.hwplib.object.bodytext.control.ControlHeader;
import com.klid.common.hwplib.object.bodytext.control.ControlHiddenComment;
import com.klid.common.hwplib.object.bodytext.control.ControlSectionDefine;
import com.klid.common.hwplib.object.bodytext.control.ControlTable;
import com.klid.common.hwplib.object.bodytext.control.gso.GsoControl;

/**
 * 각각의 컨트롤을 쓰기 전에 자동 설정하기 위한 객체
 * 
 * @author neolord
 */
public class ForControl {
	/**
	 * 컨트롤을 자동 설정한다.
	 * 
	 * @param c
	 *            컨트롤
	 * @param iid
	 *            인스턴스 id
	 */
	public static void autoSet(Control c, InstanceID iid) {
		if (c.isField()) {
			ForControlField.autoSet((ControlField) c, iid);
		} else {
			switch (c.getType()) {
			case AdditionalText:
				break;
			case AutoNumber:
				break;
			case Bookmark:
				break;
			case ColumnDefine:
				ForControlColumnDefine.autoSet((ControlColumnDefine) c);
				break;
			case Endnote:
				ForControlEndNote.autoSet((ControlEndnote) c, iid);
				break;
			case Equation:
				ForControlEquation.autoSet((ControlEquation) c, iid);
				break;
			case Footer:
				ForControlFooter.autoSet((ControlFooter) c, iid);
				break;
			case Footnote:
				ForControlFootnote.autoSet((ControlFootnote) c, iid);
				break;
			case Gso:
				ForGsoControl.autoSet((GsoControl) c, iid);
				break;
			case Header:
				ForControlHeader.autoSet((ControlHeader) c, iid);
				break;
			case HiddenComment:
				ForControlHiddenComment.autoSet((ControlHiddenComment) c, iid);
				break;
			case IndexMark:
				break;
			case NewNumber:
				break;
			case OverlappingLetter:
				break;
			case PageHide:
				break;
			case PageNumberPositon:
				break;
			case PageOddEvenAdjust:
				break;
			case SectionDefine:
				ForControlSectionDefine.autoSet((ControlSectionDefine) c, iid);
				break;
			case Table:
				ForControlTable.autoSet((ControlTable) c, iid);
				break;
			default:
				break;
			}
		}
	}
}
