import { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '@/presentation/styles/theme'

interface ToastProps {
  message: string
  visible: boolean
  onClose: () => void
  duration?: number
}

/** 하단 토스트 알림 */
export function Toast({ message, visible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [visible, onClose, duration])

  if (!visible) return null

  return <ToastBar role="status">{message}</ToastBar>
}

const slideUp = keyframes`
  from { transform: translateX(-50%) translateY(20px); opacity: 0; }
  to { transform: translateX(-50%) translateY(0); opacity: 1; }
`

const ToastBar = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: ${theme.colors.text};
  color: ${theme.colors.white};
  padding: 12px 20px;
  border-radius: ${theme.radius.md};
  font-size: 14px;
  z-index: 1000;
  animation: ${slideUp} 0.25s ease;
  box-shadow: ${theme.shadow.md};
`
