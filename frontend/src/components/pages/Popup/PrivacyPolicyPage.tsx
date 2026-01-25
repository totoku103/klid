import { useEffect, useState } from 'react'

export function PrivacyPolicyPage() {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.close()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const openHistoryPolicy = (version: string) => {
    window.open(`/popup/history-policy/${version}`, '_blank', 'width=750,height=800,scrollbars=yes,resizable=yes')
  }

  const openComparePolicy = (version: string) => {
    window.open(`/popup/compare-policy/${version}`, '_blank', 'width=1250,height=800,scrollbars=yes,resizable=yes')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-between border-b bg-[#22516d] px-4 py-2">
        <h2 className="font-bold text-white">개인정보 처리방침</h2>
        <button
          onClick={() => window.close()}
          className="text-xl text-white hover:text-gray-200"
          type="button"
          aria-label="닫기"
        >
          ×
        </button>
      </div>
      <div className="overflow-y-auto p-4">
        <PrivacyPolicyContent
          onOpenHistoryPolicy={openHistoryPolicy}
          onOpenComparePolicy={openComparePolicy}
        />
      </div>


    </div>
  )
}

interface PrivacyPolicyContentProps {
  onOpenHistoryPolicy: (version: string) => void
  onOpenComparePolicy: (version: string) => void
}

function PrivacyPolicyContent({ onOpenHistoryPolicy, onOpenComparePolicy }: PrivacyPolicyContentProps) {

  return (
    <div className="privacy-policy-container" style={{ maxWidth: 700, padding: 10, margin: '0 auto' }}>
      <style>{`
        .privacy-policy-container { text-align: left; line-height: normal; }
        .privacy-policy-container a { text-decoration: none; color: inherit; }
        .privacy-policy-container h3 { margin: 20px 0; font-weight: bold; }
        .privacy-policy-container p { margin: 16px 0; }
        .privacy-policy-container ul { margin: 16px 0; padding-left: 40px; }
        .privacy-policy-container ol { margin: 16px 0; padding-left: 40px; }
        .privacy-policy-container .title-1 { font-size: 20px; font-weight: bold; margin: 20px 0; }
        .privacy-policy-container .title-2 { font-size: 15px; font-weight: bold; }
        .privacy-policy-container .text-center { text-align: center; }
        .privacy-policy-container .border-1px { padding: 15px; border: #e3e4e5 1px solid; border-radius: 5px; margin-bottom: 20px; text-align: left; }
        .privacy-policy-container .image-box-container { width: 100%; display: flex; flex-flow: row wrap; justify-content: space-around; align-items: center; }
        .privacy-policy-container .image-box { width: 30%; height: 188px; display: flex; flex-direction: column; position: relative; }
        .privacy-policy-container .image-box p { margin: 0px; }
        .privacy-policy-container .tail-text { font-size: 11px; text-align: center; }
        .privacy-policy-container .tail-text p { margin: 0px; }
        .privacy-policy-container .hover-tooltip { width: 300px; display: none; position: absolute; z-index: 10000; border: 1px solid #ccc; border-radius: 10px; }
        .privacy-policy-container .image-box:hover .hover-tooltip { display: block; }
        .privacy-policy-container .tooltip-position-top { top: 0px; right: 0px; }
        .privacy-policy-container .tooltip-position-right { top: 0px; left: 100%; }
        .privacy-policy-container .tooltip-position-left { top: 0px; right: 100%; }
        .privacy-policy-container .hover-tooltip .tooltip-title { padding: 10px; color: white; background-color: #1647aa; border-top-right-radius: 10px; border-top-left-radius: 10px; }
        .privacy-policy-container .hover-tooltip .tooltip-title p { margin: 0; font-weight: bold; }
        .privacy-policy-container .hover-tooltip .tooltip-content { padding: 10px; background-color: white; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px; }
        .privacy-policy-container .hover-tooltip .tooltip-content p { margin: 0; }
        .privacy-policy-container .index-container { padding: 15px; border: #e3e4e5 1px solid; border-radius: 5px; margin-bottom: 20px; text-align: left; }
        .privacy-policy-container .index-list { display: flex; flex-flow: row wrap; justify-content: space-between; margin: 16px 0; padding-left: 40px; list-style: none; }
        .privacy-policy-container .index-item { width: 48%; padding-top: 10px; margin-left: 10px; text-align: left; }
        .privacy-policy-container .index-item a { display: inline-flex; align-items: center; flex-wrap: nowrap; }
        .privacy-policy-container .index-item a > span:first-child { flex-shrink: 0; min-width: 45px; }
        .privacy-policy-container .index-item a span img { width: 20px; height: 20px; }
        .privacy-policy-container .article { text-align: left; }
        .privacy-policy-container .article:not(:first-child) { margin-top: 20px; }
        .privacy-policy-container .article-title { font-size: 13px; font-weight: bold; text-align: left; }
        .privacy-policy-container .article-title > span { display: inline-flex; align-items: center; }
        .privacy-policy-container .article-title > span > img { width: 20px; height: 20px; }
        .privacy-policy-container .article-content { margin-left: 10px; text-align: left; }
        .privacy-policy-container .article-content > ol li { list-style-type: decimal; }
        .privacy-policy-container .article-content table { display: table; border-collapse: collapse; }
        .privacy-policy-container .article-content table > thead { background-color: #f3f4f5; font-weight: bold; }
        .privacy-policy-container .article-content table, .privacy-policy-container .article-content th, .privacy-policy-container .article-content td { border: grey 1px solid; text-align: center; }
        .privacy-policy-container .plain-text-table { border: none !important; }
        .privacy-policy-container .plain-text-table th, .privacy-policy-container .plain-text-table td { text-align: left; vertical-align: top; border: none; }
        .privacy-policy-container .none-list-style-type { list-style-type: none !important; }
      `}</style>

      <h3 className="title-1 text-center">사이버침해대응시스템(CTRS) 개인정보처리방침</h3>
      <div className="border-1px">
        사이버안전부 사이버침해대응시스템('https://lcsc.go.kr' 이하 '사이버침해대응시스템')는 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립・공개합니다.
      </div>

      <section>
        <div>
          <p className="title-2 text-center">【주요 개인정보 처리 표시(라벨링)】</p>
        </div>
        <div className="image-box-container">
          <ImageBox
            src="/img/login/personal/label01.jpg"
            alt="일반 개인정보 수집"
            tooltipTitle="일반 개인정보 수집"
            tooltipContent="기관(시도,시군구), 부서, 직책, 이름, 이메일주소, 휴대폰번호, 사무실번호, 사용자ID(계정), 접속IP"
            tooltipPosition="right"
          />
          <ImageBox
            src="/img/login/personal/label02.jpg"
            alt="개인정보의 처리 목적"
            tooltipTitle="개인정보의 처리 목적"
            tooltipContent="사용자 관리, 사이버위협정보 및 침해시도 공유"
            tooltipPosition="top"
          />
          <ImageBox
            src="/img/login/personal/label03.jpg"
            alt="개인정보의 보유기간"
            tooltipTitle="개인정보의 보유기간"
            tooltipContent="지자체 사이버침해대응시스템 이용 중단 시 까지"
            tooltipPosition="left"
          />
          <ImageBox
            src="/img/login/personal/label04.jpg"
            alt="개인정보 처리위탁"
            tooltipTitle="개인정보 처리위탁"
            tooltipContent={<>- 위탁 : 한국지역정보개발원<br />- 재위탁 : ㈜이글루코퍼레이션</>}
            tooltipPosition="right"
          />
          <ImageBox
            src="/img/login/personal/label05.jpg"
            alt="개인정보의 제공"
            tooltipTitle="개인정보의 제공"
            tooltipContent="해당사항 없음"
            tooltipPosition="top"
          />
          <ImageBox
            src="/img/login/personal/label06.jpg"
            alt="개인정보 열람 청구"
            tooltipTitle="개인정보 열람 청구"
            tooltipContent={<>처리부서 : 디지털보안정책과,<br />044-205-2755</>}
            tooltipPosition="left"
          />
        </div>
        <div className="tail-text">
          <p>해당 기호에 마우스 위치시 세부 사항을 확인할 수 있으며, 자세한 내용은 아래의 개인정보 처리방침을 확인하시기 바랍니다.</p>
          <p>(세부 요약 내용 표출 기능)</p>
        </div>
      </section>

      <section>
        <div>
          <p className="title-2 text-center">목차</p>
          <p>개인정보처리방침은 다음과 같은 내용으로 구성되어 있습니다.</p>
          <span style={{ fontWeight: 'bold' }}>※ 목차 클릭 시 해당 조문으로 이동합니다.</span>
        </div>
        <div className="index-container">
          <ul className="index-list">
            {INDEX_ITEMS.map((item, idx) => (
              <li key={idx} className="index-item">
                <a href={`#index-${String(idx + 1).padStart(2, '0')}`} title={`제${idx + 1}조 ${item.title}`}>
                  <span>제{idx + 1}조</span>
                  {item.icon && (
                    <span>
                      <img
                        src={`/img/privacy-policy/2025-01/index/${item.icon}`}
                        alt={`제${idx + 1}조 ${item.title}`}
                        style={item.iconWidth ? { width: item.iconWidth } : undefined}
                      />
                    </span>
                  )}
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <Article id="01" title="개인정보의 처리목적" icon="01.png">
          <p>① 사이버침해대응시스템는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
        </Article>

        <Article id="02" title="개인정보파일 등록 현황" icon="02.png">
          <p>사이버침해대응시스템가 「개인정보 보호법」 제32조에 따라 등록・공개하는 개인정보파일의 처리목적・보유기간 및 항목은 아래와 같으며, 해당 업무 또는 서비스 제공을 위해 필요한 최소한의 범위에서 개인정보를 수집·이용합니다.</p>
          <ol>
            <li>정보주체의 동의를 받지 않고 처리하는 개인정보 항목 : 없음</li>
            <li>정보주체의 동의를 받아 처리하는 개인정보 항목</li>
          </ol>
          <span>사이버침해대응시스템는 다음의 개인정보 항목을 정보주체의 동의를 받아 처리하고 있습니다.</span>
          <table>
            <colgroup>
              <col style={{ width: 80 }} />
              <col />
              <col />
              <col style={{ width: 50 }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">개인정보파일의 명칭</th>
                <th scope="col">운영근거/처리목적</th>
                <th scope="col">개인정보파일에 기록되는 개인정보의 항목</th>
                <th scope="col">보유 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={2}>회원정보</td>
                <td>개인정보 보호법 제15조제1항제1호 (정보주체의 동의)</td>
                <td rowSpan={2} style={{ textDecoration: 'underline', color: 'blue', fontWeight: 'bold' }}>
                  필수 : 기관(시도,시군구), 부서, 직책, 이름, 이메일주소, 휴대폰번호, 사무실번호, 사용자ID(계정), 사용자 권한, 접속IP, 인터넷차단여부
                </td>
                <td rowSpan={2} style={{ textDecoration: 'underline', color: 'blue', fontWeight: 'bold' }}>
                  3년 (단, 회원탈퇴시 즉시 파기)
                </td>
              </tr>
              <tr>
                <td>서비스 이용, 개인식별, 공지사항 전달, 사이버위협정보 및 침해시도 공유</td>
              </tr>
            </tbody>
          </table>
        </Article>

        <Article id="03" title="14세 미만 아동의 개인정보 처리에 관한 사항" icon="03.png">
          <p>사이버침해대응시스템는 14세 미만 아동의 개인정보를 운영하지 않아 해당 사항이 없습니다.</p>
        </Article>

        <Article id="04" title="개인정보 영향평가 수행 결과" icon="04.png">
          <p>사이버침해대응시스템는 개인정보 영향평가를 수행하지 않아 해당 사항이 없습니다.</p>
        </Article>

        <Article id="05" title="개인정보의 처리 및 보유기간" icon="05.png">
          <p>① 사이버침해대응시스템는 법령에 따른 개인정보 보유・이용 기간 또는 정보주체로부터 개인정보를 수집 시 동의 받은 개인정보 보유・이용기간 내에서 개인정보를 처리합니다.</p>
          <p>② 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
          <ol>
            <li>사이버침해대응시스템 회원정보 : 이용 중단 시까지</li>
          </ol>
        </Article>

        <Article id="06" title="개인정보의 파기 절차 및 방법에 관한 사항" icon="06.png">
          <p>① 사이버침해대응시스템는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
          <p>② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보(또는 개인정보파일)를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.</p>
          <p>③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
          <ol>
            <li>파기절차 : 사이버침해대응시스템는 파기 사유가 발생한 개인정보(또는 개인정보파일)를 선정하고, 사이버침해대응시스템는 개인정보 분야별책임자의 승인을 받아 개인정보(또는 개인정보파일)를 파기합니다.</li>
            <li>파기방법 : 사이버침해대응시스템는 전자적 파일 형태로 기록・저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록・저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.</li>
          </ol>
        </Article>

        <Article id="07" title="개인정보의 제3자 제공에 관한 사항" icon="07.png">
          <p>① 사이버침해대응시스템는 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
          <p>② 사이버침해대응시스템는 개인정보를 제공하지 않아 해당사항이 없습니다.</p>
        </Article>

        <Article id="08" title="추가적인 이용·제공이 지속적으로 발생 시 판단 기준" icon="08.png">
          <p>① 사이버침해대응시스템는 「개인정보 보호법」 제15조제3항 또는 제17조제4항에 따라 「개인정보 보호법」 시행령 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용・제공할 수 있습니다.</p>
          <p>② 사이버침해대응시스템는 정보주체의 동의 없이 추가적인 이용・제공하지 않아 해당사항이 없습니다.</p>
        </Article>

        <Article id="09" title="개인정보 처리업무의 위탁에 관한 사항" icon="09.png">
          <p>① 사이버침해대응시스템 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
          <ol>
            <li className="none-list-style-type">
              <span>가. 위탁처리 기관(수탁자)</span>
              <table style={{ width: 'calc(100% - 10px)' }}>
                <colgroup>
                  <col style={{ width: '50%' }} />
                  <col style={{ width: '50%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>위탁받는 자(수탁자)</th>
                    <th>위탁 업무</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>한국지역정보개발원 사이버안전부</td>
                    <td>지자체 사이버 침해대응 지원체계 운영 등</td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li className="none-list-style-type">
              <span>나. 위탁처리 수행업체(재수탁자)</span>
              <table style={{ width: 'calc(100% - 10px)' }}>
                <colgroup>
                  <col style={{ width: '50%' }} />
                  <col style={{ width: '50%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>위탁받는 자(재수탁자)</th>
                    <th>위탁 업무</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>㈜이글루코퍼레이션</td>
                    <td>지자체 사이버침해대응지원센터 운영 및 유지보수</td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ol>
          <p>② 사이버침해대응시스템는 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 안전성 확보조치, 재위탁 제한, 수탁자에 대한 관리・감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다</p>
          <p>③ 「개인정보 보호법」 제26조 제6항에 따라 수탁자가 당사의 개인정보 처리업무를 재위탁하는 경우 &lt;사이버침해대응시스템&gt;의 동의를 받고 있습니다.</p>
          <p>④ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.</p>
        </Article>

        <Article id="10" title="개인정보의 국외 수집 및 이전에 관한 사항" icon="10.png">
          <p>
            <span>&lt; 개인정보의 국외 수집 &gt;</span><br />
            <span>① 사이버침해대응시스템는 개인정보를 국외에서 수집하여 처리하고 있지 않으며, 추가적인 수집 및 처리 할 경우 정보주체가 확인할 수 있도록 안내하겠습니다.</span>
          </p>
          <p>
            <span>&lt; 개인정보의 국외 이전 &gt;</span><br />
            <span>① 사이버침해대응시스템는 개인정보를 국외에 제공·위탁하고 있지 않으며, 추가적인 제공 및 위탁 할 경우 정보주체가 확인할 수 있도록 안내하겠습니다.</span>
          </p>
        </Article>

        <Article id="11" title="개인정보의 안전성 확보조치에 관한 사항" icon="11.png">
          <p>사이버침해대응시스템는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
          <div style={{ paddingLeft: 12 }}>
            <table className="plain-text-table">
              <colgroup>
                <col style={{ width: 90 }} />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <td>1. 관리적 조치:</td>
                  <td>내부 관리계획 수립·시행, 정기적 직원 교육, 전담조직 운영</td>
                </tr>
                <tr>
                  <td>2. 기술적 조치:</td>
                  <td>개인정보처리시스템에 대한 등의 접근 권한의 관리, 접근통제시스템 설치 및 기타 관련 보호 조치, 인터넷망 차단 조치, 개인정보의 암호화, 접속기록의 보관 및 점검, 보안프로그램 설치 및 갱신, 개인정보처리시스템의 취약점 점검 및 보완</td>
                </tr>
                <tr>
                  <td>3. 물리적 조치:</td>
                  <td>전산실, 자료보관실 등의 접근통제, 서류·보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관, 재해·재난에 대한 안전조치, 보조저장매체의 반출·입 통제</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Article>

        <Article id="12" title="민감정보의 공개 가능성 및 비공개를 선택하는 방법" icon="12.png">
          <p>사이버침해대응시스템는 서비스를 제공하는 과정에서 공개되는 정보에 정보주체의 민감정보가 포함됨으로써 사생활 침해의 위험성이 있다고 판단하는 때에는 서비스의 제공 전에 민감정보의 공개 가능성 및 비공개를 선택하는 방법을 정보주체가 확인할 수 있도록 안내를 하도록 하겠습니다.</p>
        </Article>

        <Article id="13" title="가명정보 처리에 관한 사항" icon="13.png">
          <p>① 사이버침해대응시스템는 개인정보를 가명처리 하고 있지 않으며, 가명처리 할 경우 관련사항을 정보주체가 확인할 수 있도록 안내를 하겠습니다.</p>
        </Article>

        <Article id="14" title="개인정보 자동 수집 장치의 설치·운영 및 그 거부에 관한 사항" icon="14.png">
          <p>
            <span>&lt; 설치・운영하는 개인정보 자동 수집 장치 &gt;</span><br />
            <span>① 사이버침해대응시스템는 이용자에게 개별적인 서비스와 편의를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용하지 않습니다.</span>
          </p>
        </Article>

        <Article id="15" title="개인정보 자동 수집 장치를 통해 제3자가 행태정보를 수집하도록 허용하는 경우 그 수집·이용 및 거부에 관한 사항" icon="15.png">
          <p>
            <span>&lt; 제3자가 수집해가는 행태정보에 관한 사항 &gt;</span><br />
            <span>① 사이버침해대응시스템는 행태정보를 수집・이용・제공하지 않아 해당사항이 없습니다.</span>
          </p>
        </Article>

        <Article id="16" title="정보주체와 법정대리인의 권리·의무 및 행사방법에 관한 사항" icon="16.png" iconWidth={40}>
          <p>① 정보주체는 사이버침해대응시스템에 대해 언제든지 개인정보 열람・정정・삭제・처리정지 및 동의철회 요구, 자동화된 결정에 대한 거부 또는 설명 요구 등의 권리를 행사할 수 있습니다.</p>
          <p>※ 14세 미만 아동에 관한 개인정보의 열람등 요구는 법정대리인이 직접 해야 하며, 14세 이상의 미성년자인 정보주체는 정보주체의 개인정보에 관하여 미성년자 본인이 권리를 행사하거나 법정대리인을 통하여 권리를 행사할 수도 있습니다.</p>
          <p><span>② 권리 행사는 사이버안전부에 대해 「개인정보 보호법」 시행령 제41조 제1항에 따라 서면, 전화, 전자우편, 팩스(FAX), 인터넷 등을 통하여 하실 수 있으며, 사이버안전부는 이에 대해 지체없이 조치하겠습니다.</span></p>
          <ol>
            <li className="none-list-style-type">- 정보주체는 언제든지 홈페이지 '이름 &gt; 정보수정'에서 개인정보를 직접 조회・수정・삭제・처리정지・동의 철회하거나 '문의센터'를 통해 열람을 요청할 수 있습니다.</li>
            <li className="none-list-style-type">- 정보주체는 언제든지 '회원탈퇴'를 통해 개인정보의 수집 및 이용 동의 철회가 가능합니다.</li>
            <li className="none-list-style-type">- 정보주체는 언제든지 홈페이지 '문의센터 &gt; 문의의견'를 통해 자동화된 결정의 설명 및 거부 요구가 가능합니다.</li>
          </ol>
          <p>③ 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수도 있습니다. 이 경우 "개인정보 처리 방법에 관한 고시" 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</p>
          <p>④ 정보주체가 개인정보 열람 및 처리 정지를 요구할 권리는 「개인정보 보호법」 제35조 제4항 및 제37조 제2항에 의하여 제한될 수 있습니다.</p>
          <p>⑤ 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 해당 개인정보의 삭제를 요구할 수 없습니다.</p>
          <p>⑥ 자동화된 결정이 이루어진다는 사실에 대해 정보주체의 동의를 받았거나, 계약 등을 통해 미리 알린 경우, 법률에 명확히 규정이 있는 경우에는 자동화된 결정에 대한 거부는 인정되지 않으며 설명 및 검토 요구만 가능합니다.</p>
          <ol>
            <li className="none-list-style-type">- 또한 자동화된 결정에 대한 거부・설명 요구는 다른 사람의 생명・신체・재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 등 정당한 사유가 있는 경우에는 그 요구가 거절될 수 있습니다.</li>
          </ol>
          <p>⑦ 사이버침해대응시스템는 정보주체 권리에 따른 열람의 요구, 정정・삭제의 요구, 처리정지 및 동의철회의 요구, 자동화된 결정 거부・설명 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</p>
          <p>⑧ 정보주체는 개인정보의 열람등 청구를 아래의 부서에 할 수 있습니다. 사이버침해대응시스템는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.</p>
          <span>▶ 개인정보 열람 등 청구 접수・처리 부서</span>
          <table style={{ width: 'calc(100% - 10px)' }}>
            <thead>
              <tr>
                <th scope="col">총괄 부서</th>
                <th scope="col">담당자</th>
                <th scope="col">전화</th>
                <th scope="col">전자우편</th>
                <th scope="col">팩스</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>디지털보안정책과</td>
                <td>송영준</td>
                <td>044-205-2755</td>
                <td>ss66268@korea.kr</td>
                <td>044-204-8933</td>
              </tr>
            </tbody>
          </table>
          <span>※ 정보주체께서는 열람청구 접수·처리부서 이외에 '개인정보 포털'홈페이지(www.privacy.go.kr)을 통하여서도 개인정보 열람청구를 하실 수 있습니다.</span><br />
          <span>· 개인정보 포털 → 민원서비스 → 정보주체 권리행사 → 개인정보 열람 등 요구(본인인증 필요)</span>
        </Article>

        <Article id="17" title="자동화된 결정에 관한 사항">
          <p>사이버침해대응시스템는 인공지능 기술을 적용한 완전히 자동화된 시스템이 아니므로 해당 사항이 없습니다.</p>
        </Article>

        <Article id="18" title="개인정보 보호(분야별)책임자의 성명 또는 개인정보 업무 담당부서 및 고충사항을 처리하는 부서에 관한 사항" icon="17.png" iconWidth={40}>
          <p>① 사이버침해대응시스템는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호(분야별)책임자를 지정하고 있습니다.</p>
          <table style={{ width: 'calc(100% - 10px)' }}>
            <thead>
              <tr>
                <th scope="col" colSpan={2}>구분</th>
                <th scope="col">부서</th>
                <th scope="col">성명</th>
                <th scope="col">연락처</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>개인정보 보호책임자</td>
                <td>정책기획관</td>
                <td>이지성</td>
                <td rowSpan={3}>※ 담당부서로 연결됩니다.<br />전화 044-205-2755<br />팩스 044-204-8933<br />전자우편 ss66268@korea.kr</td>
              </tr>
              <tr>
                <td colSpan={2}>개인정보보호 분야별 책임자</td>
                <td>디지털보안정책과</td>
                <td>김경직</td>
              </tr>
              <tr>
                <td colSpan={2}>개인정보보호 분야별 담당자</td>
                <td>디지털보안정책과</td>
                <td>송영준</td>
              </tr>
              <tr>
                <td rowSpan={3}>위탁 기관</td>
                <td>개인정보 보호책임자</td>
                <td>부원장</td>
                <td>김석진</td>
                <td>02-2031-9103</td>
              </tr>
              <tr>
                <td>개인정보보호 분야별 책임자</td>
                <td>사이버안전부</td>
                <td>원종현</td>
                <td>02-2031-9880</td>
              </tr>
              <tr>
                <td>개인정보보호 분야별 담당자</td>
                <td>사이버안전부</td>
                <td>최한범</td>
                <td>02-2031-9887</td>
              </tr>
            </tbody>
          </table>
          <p>② 정보주체는 사이버침해대응시스템의 서비스를 이용하시면서 발생한 모든 개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 분야별 담당부서로 문의하실 수 있습니다. 사이버안전부는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.</p>
        </Article>

        <Article id="19" title="정보주체의 권익침해에 대한 구제방법" icon="18.png">
          <p>① 정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.</p>
          <ol>
            <li>개인정보 분쟁조정 위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</li>
            <li>개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</li>
            <li>대검찰청 : (국번없이) 1301 (www.spo.go.kr)</li>
            <li>경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)</li>
          </ol>
          <p>② 「개인정보 보호법」 제35조(개인정보의 열람), 제36조(개인정보의 정정・삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.</p>
          <span>▶ 중앙행정심판위원회 : (국번없이) 110 (www.simpan.go.kr)</span>
        </Article>

        <Article id="20" title="개인정보 보호수준 평가 결과" icon="19.png">
          <p>① 한국지역정보개발원은 정보주체의 개인정보를 안전하게 관리하기 위해 「행정안전부 개인정보보호 지침」 제11조 및 제13조에 따라 매년 행정안전부에서 실시하는 "개인정보보호 실태점검"을 받고 있습니다.</p>
          <p>② 한국지역정보개발원은 2023년도 개인정보보호 실태점검 결과 "우수" 등급을 획득하였습니다.</p>
        </Article>

        <Article id="21" title="고정형 영상정보처리기기 운영·관리에 관한 사항" icon="20.png">
          <p>사이버침해대응시스템은 고정형 영상정보처리기기를 운영하지 않아 해당 사항이 없습니다.</p>
        </Article>

        <Article id="22" title="이동형 영상정보처리기기 운영·관리에 관한 사항" icon="21.png">
          <p>사이버침해대응시스템은 이동형 영상정보처리기기를 운영하지 않아 해당 사항이 없습니다.</p>
        </Article>

        <Article id="23" title="그밖에 개인정보처리자가 개인정보처리 기준 및 보호조치 등에 관하여 자율적으로 개인정보 처리방침에 포함하여 정한 사항">
          <p>① 사이버침해대응시스템는 이용자의 개인정보를 안전하게 관리하기 위하여 최선을 다하며, 개인정보 보호법에서 요구하는 안전성 확보 조치 외에도 추가적인 개인정보 보호 노력을 기울이고 있습니다.</p>
        </Article>

        <Article id="24" title="개인정보 처리방침의 변경에 관한 사항" icon="23.png">
          <p>① 이 개인정보 처리방침은 2025. 6. 30부터 적용됩니다.</p>
          <p>② 이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.</p>
          <ol id="history-policy-list">
            <li className="none-list-style-type">
              <span onClick={() => onOpenHistoryPolicy('2025-02')} style={{ cursor: 'pointer', color: '#0066cc' }}>
                2025. 2. 16 ~ 2025. 6. 30 적용지침 (클릭)
              </span>
              &nbsp;&nbsp;&nbsp;
              <a onClick={() => onOpenComparePolicy('2025-02')} style={{ fontWeight: 'bold', cursor: 'pointer', color: '#0066cc' }}>
                &lt; 신·구 대조표 &gt;
              </a>
            </li>
            <li className="none-list-style-type">
              <span onClick={() => onOpenHistoryPolicy('2024-03')} style={{ cursor: 'pointer', color: '#0066cc' }}>
                2024. 3. 15 ~ 2025. 2. 16 적용지침 (클릭)
              </span>
              &nbsp;&nbsp;&nbsp;
              <a onClick={() => onOpenComparePolicy('2024-03')} style={{ fontWeight: 'bold', cursor: 'pointer', color: '#0066cc' }}>
                &lt; 신·구 대조표 &gt;
              </a>
            </li>
            <li className="none-list-style-type">
              <span onClick={() => onOpenHistoryPolicy('2019-01')} style={{ cursor: 'pointer', color: '#0066cc' }}>
                2019. 1. 1. ~ 2024. 3. 14 적용지침 (클릭)
              </span>
            </li>
          </ol>
        </Article>
      </section>
    </div>
  )
}

interface ImageBoxProps {
  src: string
  alt: string
  tooltipTitle: string
  tooltipContent: React.ReactNode
  tooltipPosition: 'right' | 'top' | 'left'
}

function ImageBox({ src, alt, tooltipTitle, tooltipContent, tooltipPosition }: ImageBoxProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="image-box">
      {imgError ? (
        <div style={{ width: '100%', height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', borderRadius: 5 }}>
          <span style={{ fontSize: 12, color: '#666' }}>{alt}</span>
        </div>
      ) : (
        <img src={src} alt={alt} onError={() => setImgError(true)} style={{ maxWidth: '100%' }} />
      )}
      <div className={`hover-tooltip tooltip-position-${tooltipPosition}`}>
        <div className="tooltip-title">
          <p>{tooltipTitle}</p>
        </div>
        <div className="tooltip-content">
          <p>{tooltipContent}</p>
        </div>
      </div>
    </div>
  )
}

interface ArticleProps {
  id: string
  title: string
  icon?: string
  iconWidth?: number
  children: React.ReactNode
}

function Article({ id, title, icon, iconWidth, children }: ArticleProps) {
  return (
    <div className="article" id={`index-${id}`}>
      <div className="article-title">
        <span>제{parseInt(id)}조</span>
        {icon && (
          <span>
            <img
              src={`/img/privacy-policy/2025-01/contents/${icon}`}
              alt={`제${parseInt(id)}조 ${title}`}
              style={iconWidth ? { width: iconWidth } : undefined}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </span>
        )}
        <span>{title}</span>
      </div>
      <div className="article-content">
        {children}
      </div>
    </div>
  )
}

const INDEX_ITEMS = [
  { title: '개인정보의 처리 목적', icon: '01.png' },
  { title: '개인정보파일 등록 현황', icon: '02.png' },
  { title: '14세 미만 아동의 개인정보 처리에 관한 사항', icon: '03.png' },
  { title: '개인정보 영향평가 수행 결과', icon: '04.png' },
  { title: '개인정보의 처리 및 보유 기간', icon: '05.png' },
  { title: '개인정보의 파기 절차 및 방법에 관한 사항', icon: '06.png' },
  { title: '개인정보의 제3자 제공에 관한 사항', icon: '07.png' },
  { title: '추가적인 이용·제공이 지속적으로 발생 시 판단 기준', icon: '08.png' },
  { title: '개인정보 처리업무의 위탁에 관한 사항', icon: '09.png' },
  { title: '개인정보의 국외 수집 및 이전에 관한 사항', icon: '10.png' },
  { title: '개인정보의 안전성 확보조치에 관한 사항', icon: '11.png' },
  { title: '민감정보의 공개 가능성 및 비공개를 선택하는 방법', icon: '12.png' },
  { title: '가명정보 처리에 관한 사항', icon: '13.png' },
  { title: '개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항', icon: '14.png' },
  { title: '개인정보 자동 수집 장치를 통해 제3자가 행태정보를 수집하도록 허용하는 경우 그 수집·이용 및 거부에 관한 사항', icon: '15.png' },
  { title: '정보주체와 법정대리인의 권리·의무 및 행사방법에 관한 사항', icon: '16.png', iconWidth: 40 },
  { title: '자동화된 결정에 관한 사항' },
  { title: '개인정보 보호(분야별)책임자의 성명 또는 개인정보 업무 담당부서 및 고충사항을 처리하는 부서에 관한 사항', icon: '17.png', iconWidth: 40 },
  { title: '정보주체의 권익침해에 대한 구제방법', icon: '18.png' },
  { title: '개인정보 보호수준 평가 결과', icon: '19.png' },
  { title: '고정형 영상정보처리기기 운영·관리에 관한 사항', icon: '20.png' },
  { title: '이동형 영상정보처리기기 운영·관리에 관한 사항', icon: '21.png' },
  { title: '그밖에 개인정보처리자가 개인정보처리 기준 및 보호조치 등에 관하여 자율적으로 개인정보 처리방침에 포함하여 정한 사항' },
  { title: '개인정보 처리방침의 변경에 관한 사항', icon: '23.png' },
]
