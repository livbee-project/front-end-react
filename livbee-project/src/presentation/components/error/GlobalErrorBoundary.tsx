import React from 'react';
import { GlobalErrorFallback } from './GlobalErrorFallback';

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
}

interface GlobalErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class GlobalErrorBoundary extends React.Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 전체 에러 정보를 자세히 출력
    console.group('🚨 [GlobalErrorBoundary] 에러 발생');
    console.error('에러 메시지:', error.message);
    console.error('에러 스택:', error.stack);
    console.error('에러 이름:', error.name);
    console.error('컴포넌트 스택:', errorInfo.componentStack);
    console.error('전체 에러 객체:', error);
    console.error('에러 정보:', errorInfo);
    console.groupEnd();
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return <GlobalErrorFallback message={this.state.error?.message} onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

