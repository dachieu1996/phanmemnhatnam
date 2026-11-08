import Reveal from "@/components/ui/Reveal";
import { IconCheck, IconSend, IconSpark } from "@/components/ui/Icons";

function Ava({ sm }) {
  return (
    <div className={`nnc-ava${sm ? " sm" : ""}`}>
      <span>1N</span>
      <img src="/images/logo.png" alt="" width="38" height="38" loading="lazy" />
    </div>
  );
}

/** Khối "Trợ lý AI" trên trang chủ: điểm nổi bật + câu hỏi mẫu (bấm là mở chat và hỏi luôn) + khung chat minh họa. */
export default function AiSection({ ai, chatbot }) {
  return (
    <section className="block soft" id="tro-ly-ai">
      <div className="container ai-sec">
        <Reveal>
          <span className="tag">{ai.tag}</span>
          <h2>{ai.title}</h2>
          <p>{ai.text}</p>
          <ul>
            {ai.points.map((p) => (
              <li key={p}>
                <IconCheck />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="ai-try">
            {ai.sample_questions.map((q) => (
              <button type="button" key={q} data-chat-ask={q}>
                {q}
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-primary" data-chat-open="">
            <IconSpark /> Bắt đầu trò chuyện
          </button>
        </Reveal>
        <Reveal className="ai-mock" aria-hidden="true" delay={120}>
          <div className="nnc-head">
            <Ava />
            <div className="nnc-title">
              <b>{chatbot.title}</b>
              <small>
                <i />
                {chatbot.status}
              </small>
            </div>
          </div>
          <div className="nnc-body">
            <div className="nnc-msg me">
              <div className="nnc-b">Hạch toán tiền lương phải trả theo TT133 thế nào?</div>
            </div>
            <div className="nnc-msg bot">
              <Ava sm />
              <div className="nnc-col">
                <div className="nnc-b">
                  <p>Theo Thông tư 133/2016, cuối tháng căn cứ bảng lương:</p>
                  <p><span className="nnc-dr">Nợ</span> 154 – lương công nhân sản xuất</p>
                  <p><span className="nnc-dr">Nợ</span> 6421 – lương nhân viên bán hàng</p>
                  <p><span className="nnc-dr">Nợ</span> 6422 – lương bộ phận quản lý</p>
                  <p className="nnc-indent"><span className="nnc-cr">Có</span> 334 – Phải trả người lao động</p>
                  <div className="nnc-src"><a>Xem: Hạch toán tiền lương – bảo hiểm →</a></div>
                </div>
              </div>
            </div>
            <div className="nnc-msg me">
              <div className="nnc-b">Nhập bảng lương trên phần mềm ở đâu?</div>
            </div>
            <div className="nnc-msg bot nnc-typing">
              <Ava sm />
              <div className="nnc-b"><span /><span /><span /></div>
            </div>
          </div>
          <div className="mock-input">
            <span>Nhập câu hỏi về phần mềm, hạch toán, thuế…</span>
            <b><IconSend /></b>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
