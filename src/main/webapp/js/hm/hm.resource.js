var HmResource = {
		vsvr_eng_ver_list: ['vSphere5.1', 'vSphere5.5', 'vSphere6.0'],
		rack_type_list: [
		                 	{ label: '서버랙', value: 1 },
		                 	{ label: '통신랙', value: 2 },
		                 	{ label: '그룹', value: 3 }
		                 ],
        evt_level_list: [
                         	{ label: '정보', value: 1 },
                         	{ label: '주의', value: 2 },
                         	{ label: '알람', value: 3 },
                         	{ label: '경보', value: 4 },
                         	{ label: '장애', value: 5 }
                         ],
        evtlog_logname_list: [
                      		{ label: '응용 프로그램', value: 'Application' },
                      		{ label: '하드웨어 이벤트', value: 'HardwareEvents' },
                      		{ label: 'Internet Explorer', value: 'Internet Explorer' },
                      		{ label: '키 관리 서비스', value: 'Key Management Service' },
                      		{ label: 'Microsoft Office Alerts', value: 'OAlerts' },
                      		{ label: 'PreEmptive', value: 'PreEmptive' },
                      		{ label: '시스템', value: 'System' },
                      		{ label: 'Windows PowerShell', value: 'Windows PowerShell' },
                      		{ label: '보안', value: 'Security' },
                          ],
        evtlog_entrytype_list: [
                            { label: '정보', value: 'Information' },
                            { label: '경고', value: 'Warning' },
                            { label: '오류', value: 'Error' },
                            { label: '감사 성공', value: 'SuccessAudit' },
                            { label: '감사 실패', value: 'FailureAudit' }
                          ],
        bizsupport_req_type_list: [
                       		{ label: '신규지급', value: 1 },
                       		{ label: '수리요청', value: 2 }
                           ],
        bizsupport_progress_state_list: [
                             { label: '신청', value: 0 }, 
                             { label: '접수 완료', value: 1 }, 
                             { label: '접수&발주 동시 진행', value: 2 }, 
                             { label: '발주', value: 3 }, 
                             { label: '반송처리', value: 4 }, 
                             { label: '내용 보완 요청', value: 5 }, 
                             { label: '처리 완료', value: 6 }, 
                             { label: '미결 완료', value: 7 }
                         ],
        use_flag_list: [
        					{ label: '미사용', value: 0 },
                          	{ label: '사용', value: 1 }
                          ],

		/** topology */
		topo_line_style_list: [
            {label: '실선', value: ""},
            {label: '점선', value: "3,3"},
            {label: '파선-점선', value: "10,5,3,5"},
            {label: '긴파선-점선', value: "20,10,5,10"}
        ],

		/** tms */
		protocol_list: [
            { label: 'ALL',	value: 0 },
            { label: 'TCP',	value: 6 },
            { label: 'UDP',	value: 17 }
		],

		protocol_list2: [
            { label: 'ICMP',	value: 1 },
			{ label: 'TCP',	value: 6 },
			{ label: 'UDP',	value: 17 }
		],

		tcpflag_list: [
			{ label: 'NUL', value: 0 },
			{ label: 'FIN', value: 1 },
			{ label: 'SYN', value: 2 },
			{ label: 'RST', value: 4 },
			{ label: 'PSH', value: 8 },
			{ label: 'ACK', value: 16 },
			{ label: 'URG', value: 32 }
		],

		period_tms_short_list: [
			{ label: '최근5분', value: '5m' },
			{ label: '최근10분', value: '10m' },
			{ label: '사용자설정', value: '-1' }
		],

		period_tms_long_list: [
			{ label: '최근1시간', value: '1h' },
			{ label: '일간', value: '0d' },
            { label: '주간', value: '6d' },
            { label: '월간', value: '30d' },
			{ label: '사용자설정', value: '-1' }
		],

		period_middle_list: [
			{ label: '최근10분', value: '9m' },
			{ label: '최근30분', value: '29m' },
			{ label: '최근1시간', value: '1h' },
			{ label: '사용자설정', value: '-1' }
		],

		getResource: function(resourceId, isIncAll) {
			var arr = JSON.parse(JSON.stringify(this[resourceId]));
			if(isIncAll !== undefined && isIncAll) {
				arr.unshift({ label: '전체', value: 'ALL' });
			}
			return arr;
		}
};

var HmConst = {
		rack: {
			type_server: 1,		// 서버랙
			type_com: 2		// 통신랙
		},
		
		upload_file_kind: {
			evt_log: 1,		// 이벤트로그
			evt_rpt: 2			// 이벤트보고서
		},
		
		asset_mgr_flag: {
			sys_reg: 1,		//시스템등록
			user_reg: 2,		//사용자등록
			del: -1			//삭제
		},

		period_type: {
			short: 1,
			middle: 2,
			long: 3,
			cstrf: 4,
			devif: 5,
			hist: 6,
			tms_short: 7,
			tms_long: 8
		}
};