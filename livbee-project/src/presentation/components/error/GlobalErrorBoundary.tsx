import React from 'react';
import { GlobalErrorFallback } from '@/presentation/components/error/GlobalErrorFallback';
import { error as logError } from '@/shared/utils/logger';

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
    // 전체 에러 정보를 자세히 로깅
    logError('GlobalErrorBoundary', '에러 발생', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      componentStack: errorInfo.componentStack,
      error: error,
      errorInfo,
    });
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

