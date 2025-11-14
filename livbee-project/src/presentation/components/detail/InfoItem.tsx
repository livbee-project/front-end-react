import React from 'react';

/**
 * InfoItem 컴포넌트가 받을 props 타입을 정의합니다.
 * @param title - 정보 항목의 제목 (왼쪽)
 * @param content - 정보 항목의 내용 (오른쪽, 선택)
 * @param children - 커스텀 컨텐츠 (태그 등, content 대신 사용 가능)
 */
interface InfoItemProps {
  title: string;
  content?: string;
  children?: React.ReactNode;
}

/**
 * 모델 상세 페이지의 정보 섹션에서 사용되는
 * 제목-내용 쌍을 표시하는 컴포넌트입니다.
 * 태그나 다른 커스텀 컨텐츠도 표시할 수 있습니다.
 */
const InfoItem: React.FC<InfoItemProps> = ({ title, content, children }) => {
  /**
   * 정보 아이템 컨테이너 스타일
   * 하단 구분선을 포함합니다.
   */
  const itemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderBottom: '1px solid #F7F8FA',
    gap: '16px',
  };

  /**
   * 제목 스타일 (왼쪽)
   */
  const titleStyle: React.CSSProperties = {
    fontSize: 'var(--h3)', // 16px
    fontWeight: 700,
    color: 'var(--black)',
    flexShrink: 0,
  };

  /**
   * 내용 영역 스타일 (오른쪽)
   * flex: 1로 남은 공간을 차지하며, 오른쪽 정렬됩니다.
   */
  const contentAreaStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '8px',
    flexWrap: 'wrap',
    minWidth: 0,
  };

  /**
   * 내용 텍스트 스타일
   * 플레이스홀더 스타일을 적용합니다.
   */
  const contentStyle: React.CSSProperties = {
    fontSize: 'var(--p2)', // 14px
    fontWeight: 400,
    color: 'var(--dark-gray)',
    textAlign: 'right',
  };

  return (
    <div style={itemStyle}>
      {/* 제목 (왼쪽) */}
      <span style={titleStyle}>{title}</span>

      {/* 내용 영역 (오른쪽) */}
      <div style={contentAreaStyle}>
        {children ? (
          children
        ) : (
          <span style={contentStyle}>{content != null ? content : '-'}</span>
        )}
      </div>
    </div>
  );
};

export default InfoItem;

