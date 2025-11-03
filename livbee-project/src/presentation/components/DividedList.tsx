import React from 'react';

/**
 * DividedList가 받을 props 타입을 정의합니다.
 * @param children - DividedListItem 컴포넌트들의 목록
 */
interface DividedListProps {
  children: React.ReactNode;
}

/**
 * 자식 컴포넌트들 '사이'에 구분선을 렌더링하는 리스트 컨테이너입니다.
 * Flutter의 ListView.separated 위젯에 해당합니다.
 */
const DividedList: React.FC<DividedListProps> = ({ children }) => {
  // React.Children.toArray를 사용해 children prop을 안전하게 배열로 변환
  const items = React.Children.toArray(children);

  return (
    <div>
      {/* 배열을 map으로 순회하며 아이템과 구분선을 렌더링 */}
      {items.map((child, index) => (
        // React.Fragment를 사용해 key를 전달 (div로 감싸지 않기 위해)
        <React.Fragment key={index}>
          {/* 1. 실제 아이템 (예: DividedListItem) */}
          {child}

          {/* 2. 마지막 아이템이 아닌 경우에만 구분선을 렌더링 */}
          {index < items.length - 1 && (
            <hr
              style={{
                border: 'none', // 기본 hr 스타일 초기화
                // Flutter 원본의 thickness: 0.3
                height: '0.3px',
                // Flutter 원본의 dividerColor(0xFFCAC4D0)
                backgroundColor: '#CAC4D0',
                margin: 0, // 기본 마진 초기화
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default DividedList;