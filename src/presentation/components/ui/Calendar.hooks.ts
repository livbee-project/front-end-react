import { useEffect } from 'react';
import type { RefObject } from 'react';
import { WEEKDAYS, CALENDAR_TIMING, WEEKDAY_STYLES } from '@/presentation/components/ui/Calendar.constants';
import { formatMonthYearToKorean } from '@/presentation/components/ui/Calendar.utils';

interface UseCalendarDOMProps {
  calendarRef: RefObject<HTMLDivElement | null>;
}

/**
 * 캘린더 DOM 조작 로직을 관리하는 커스텀 훅
 * - 년월 텍스트 한글화
 * - 요일 한글화
 * - 버튼 클릭 이벤트 처리
 */
export const useCalendarDOM = ({ calendarRef }: UseCalendarDOMProps) => {
  useEffect(() => {
    let isUpdating = false;
    let lastMonthYear = '';
    let weekdaysUpdated = false;
    let mutationTimeout: ReturnType<typeof setTimeout> | null = null;
    
    
    const updateWeekdays = () => {
      if (weekdaysUpdated) return;
      
      const weekdayCells = calendarRef.current?.querySelectorAll('.rdp-weekday');
      if (!weekdayCells || weekdayCells.length === 0) return;
      
      const firstCell = weekdayCells[0] as HTMLElement;
      if (firstCell && firstCell.querySelector('.korean-weekday')) {
        weekdaysUpdated = true;
        return;
      }
      
      for (let i = 0; i < weekdayCells.length && i < WEEKDAYS.length; i++) {
        const thElement = weekdayCells[i] as HTMLElement;
        
        if (thElement.querySelector('.korean-weekday')) {
          continue;
        }
        
        thElement.style.fontSize = '0';
        thElement.style.lineHeight = '0';
        
        const koreanSpan = document.createElement('span');
        koreanSpan.className = 'korean-weekday';
        koreanSpan.textContent = WEEKDAYS[i];
        koreanSpan.style.cssText = `display: block; font-size: ${WEEKDAY_STYLES.FONT_SIZE}; font-weight: ${WEEKDAY_STYLES.FONT_WEIGHT}; color: ${WEEKDAY_STYLES.COLOR};`;
        thElement.appendChild(koreanSpan);
      }
      
      weekdaysUpdated = true;
    };
    
    const updateMonthYear = () => {
      if (isUpdating) return;
      isUpdating = true;
      
      requestAnimationFrame(() => {
        const navElement = calendarRef.current?.querySelector('.rdp-nav') as HTMLElement;
        const captionLabel = calendarRef.current?.querySelector('.rdp-caption_label') as HTMLElement;
        
        if (navElement && captionLabel) {
          const englishText = captionLabel.textContent || '';
          const koreanText = formatMonthYearToKorean(englishText);
          
          if (!koreanText || lastMonthYear === koreanText) {
            isUpdating = false;
            return;
          }
          lastMonthYear = koreanText;
          
          const existingText = navElement.querySelector('.custom-month-year');
          if (existingText) {
            // 페이드 아웃 애니메이션
            (existingText as HTMLElement).style.transition = 'opacity 0.15s ease-out';
            (existingText as HTMLElement).style.opacity = '0';
            setTimeout(() => {
              existingText.remove();
            }, 150);
          }
          
          const monthYearSpan = document.createElement('span');
          monthYearSpan.className = 'custom-month-year';
          monthYearSpan.textContent = koreanText;
          monthYearSpan.style.opacity = '0';
          monthYearSpan.style.transition = 'opacity 0.15s ease-in';
          
          const nextButton = navElement.querySelector('.rdp-button_next');
          if (nextButton) {
            navElement.insertBefore(monthYearSpan, nextButton);
          } else {
            navElement.appendChild(monthYearSpan);
          }
          
          // 페이드 인 애니메이션
          requestAnimationFrame(() => {
            monthYearSpan.style.opacity = '1';
          });
        }
        isUpdating = false;
      });
    };

    const timer = setTimeout(() => {
      updateMonthYear();
      updateWeekdays();
    }, CALENDAR_TIMING.INITIAL_DELAY);
    
    let buttonClickTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleButtonClick = () => {
      if (buttonClickTimeout) {
        clearTimeout(buttonClickTimeout);
      }
      buttonClickTimeout = setTimeout(() => {
        updateMonthYear();
      }, CALENDAR_TIMING.BUTTON_CLICK_DEBOUNCE);
    };
    
    const prevButton = calendarRef.current?.querySelector('.rdp-button_previous');
    const nextButton = calendarRef.current?.querySelector('.rdp-button_next');
    
    if (prevButton) {
      prevButton.addEventListener('click', handleButtonClick, { passive: true });
    }
    if (nextButton) {
      nextButton.addEventListener('click', handleButtonClick, { passive: true });
    }
    
    let rafId: number | null = null;
    const observer = new MutationObserver(() => {
      if (mutationTimeout) {
        clearTimeout(mutationTimeout);
      }
      mutationTimeout = setTimeout(() => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        rafId = requestAnimationFrame(() => {
          const captionLabel = calendarRef.current?.querySelector('.rdp-caption_label');
          if (captionLabel && captionLabel.textContent) {
            updateMonthYear();
          }
        });
      }, CALENDAR_TIMING.MUTATION_DEBOUNCE);
    });
    
    if (calendarRef.current) {
      const captionLabel = calendarRef.current.querySelector('.rdp-caption_label');
      if (captionLabel) {
        observer.observe(captionLabel, {
          childList: true,
          characterData: true,
          subtree: false,
          attributes: false,
        });
      }
      
      const monthElement = calendarRef.current.querySelector('.rdp-month');
      if (monthElement) {
        observer.observe(monthElement, {
          childList: true,
          subtree: false,
          attributes: false,
        });
      }
    }

    return () => {
      clearTimeout(timer);
      if (buttonClickTimeout) {
        clearTimeout(buttonClickTimeout);
      }
      if (mutationTimeout) {
        clearTimeout(mutationTimeout);
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      observer.disconnect();
      if (prevButton) {
        prevButton.removeEventListener('click', handleButtonClick);
      }
      if (nextButton) {
        nextButton.removeEventListener('click', handleButtonClick);
      }
    };
  }, [calendarRef]);
};

