import './CategoryNav.css';

const CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'favorites', label: '⭐ 我的收藏' },
  { key: 'There be 句型', label: 'There be' },
  { key: '万能主语 It', label: '万能 It' },
  { key: '动词前置疑问句', label: '疑问句' },
  { key: '小词大用 (Get/Take)', label: '小词大用' },
  { key: '被动与物称主语', label: '被动语态' },
  { key: '地道神韵短句', label: '地道短句' },
  { key: '介词搭配陷阱', label: '介词陷阱' },
  { key: '时态思维差异', label: '时态差异' },
  { key: '动词短语', label: '动词短语' },
  { key: '情态动词与委婉', label: '情态动词' },
  { key: '否定转移', label: '否定转移' },
  { key: '物称主语进阶', label: '物称主语' },
  { key: '固定搭配地雷', label: '固定搭配' },
  { key: '比较与程度', label: '比较程度' },
  { key: '让步与逻辑连接', label: '让步逻辑' },
  { key: '口语高频万能句', label: '万能口语' },
  { key: 'There be 扩展', label: 'There be+' },
  { key: '万能主语 It 扩展', label: '万能 It+' },
  { key: '餐厅与点餐', label: '餐厅点餐' },
  { key: '购物与退换货', label: '购物退换' },
  { key: '酒店与住宿', label: '酒店住宿' },
  { key: '交通与出行', label: '交通出行' },
  { key: '职场与会议', label: '职场会议' },
  { key: '居家与家务', label: '居家家务' },
  { key: '社交与寒暄', label: '社交寒暄' },
  { key: '情绪与表达', label: '情绪表达' },
  { key: '身体与看病', label: '身体看病' },
  { key: '数字与时间陷阱', label: '数字时间' }
];

export default function CategoryNav({ active, onChange }) {
  return (
    <nav className="bottom-nav">
      <div className="nav-scroll">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            className={`nav-tag ${active === cat.key ? 'active' : ''}`}
            onClick={() => onChange(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
