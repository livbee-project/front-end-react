import React from 'react';

/**
 * VerticalList가 받을 props 타입을 정의합니다.
 * @param children - ListItem 컴포넌트들의 목록
 * @param showDividers - (추가) 구분선 표시 여부 (기본값: true)
 */
interface VerticalListProps {
  children: React.ReactNode;
  showDividers?: boolean;
}

/**
 * 자식 컴포넌트들 '사이'에 구분선을 렌더링하는 세로 리스트 컨테이너입니다.
 * (구. DividedList)
 */
const VerticalList: React.FC<VerticalListProps> = ({
  children,
  showDividers = true, // (수정) 기본값을 true로 설정
}) => {
  const items = React.Children.toArray(children);

  return (
    <div>
      {items.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {/*
            (수정) showDividers가 true이고, 마지막 아이템이 아닐 때만
            구분선을 렌더링합니다.
          */}
          {showDividers && index < items.length - 1 && (
            <hr
              style={{
                border: 'none',
                height: '0.3px',
                backgroundColor: '#CAC4D0',
                margin: 0,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default VerticalList;