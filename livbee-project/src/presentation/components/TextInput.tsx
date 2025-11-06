import React from 'react';

/**
 * TextInput이 받을 props 타입을 정의합니다.
 */
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

/**
 * 일반 텍스트 입력 필드 컴포넌트
 */
const TextInput: React.FC<TextInputProps> = ({
  label,
  description,
  ...rest
}) => {
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--white)',
    borderRadius: 12,
    border: '1px solid var(--paint-gray, #E5E7ED)',
    fontSize: 'var(--h3)', // 16px
    color: 'var(--black)',
    fontWeight: 400,
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{ marginBottom: '8px' }}>
          <span
            style={{
              fontSize: 'var(--h3)',
              fontWeight: 400,
              color: 'var(--black)',
            }}
          >
            {label}
          </span>
          {description && (
            <div
              style={{
                fontSize: '12px',
                color: 'var(--dark-gray)',
                marginTop: '4px',
              }}
            >
              {description}
            </div>
          )}
        </div>
      )}
      <input type="text" style={inputStyle} {...rest} />
    </div>
  );
};

export default TextInput;

