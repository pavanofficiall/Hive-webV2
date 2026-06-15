"use client"

import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type ScrollRevealSegment = 
  | string 
  | { text: string; className?: string } 
  | { br: boolean; className?: string };

interface ScrollRevealProps {
  children?: ReactNode;
  segments?: ScrollRevealSegment[];
  scrollContainerRef?: RefObject<HTMLElement>;
  trigger?: string | HTMLElement | null;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  scrollStart?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  scrub?: boolean | number;
}

export default function ScrollReveal({
  children,
  segments,
  scrollContainerRef,
  trigger,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  scrollStart = 'top bottom',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  scrub = 1.2 // default to a smooth 1.2s lag catch-up for premium feel
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const elements = useMemo(() => {
    if (segments) {
      const result: Array<{ text: string; className: string; isBr: boolean; isWhitespace?: boolean }> = [];
      segments.forEach(seg => {
        if (typeof seg === 'string') {
          seg.split(' ').filter(Boolean).forEach(w => {
            result.push({ text: w, className: '', isBr: false });
          });
        } else if (typeof seg === 'object' && 'br' in seg && seg.br) {
          result.push({ text: '', className: seg.className || '', isBr: true });
        } else if (typeof seg === 'object' && 'text' in seg && seg.text) {
          seg.text.split(' ').filter(Boolean).forEach(w => {
            result.push({ text: w, className: seg.className || '', isBr: false });
          });
        }
      });
      return result;
    }
    
    // Fallback to split text
    const text = typeof children === 'string' ? children : '';
    const parts = text.split(/(\s+)/);
    return parts.map(part => {
      const isWhitespace = part.match(/^\s+$/) !== null;
      return {
        text: part,
        className: '',
        isBr: false,
        isWhitespace
      };
    });
  }, [children, segments]);

  const splitText = useMemo(() => {
    return elements.map((segment, index) => {
      if (segment.isBr) {
        return <br key={index} className={segment.className} />;
      }
      if (segment.isWhitespace) {
        return segment.text;
      }
      return (
        <span className={`inline-block word ${segment.className}`} key={index}>
          {segment.text}
          {segments && index < elements.length - 1 && '\u00A0'}
        </span>
      );
    });
  }, [elements, segments]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const triggerEl = trigger || el;

    // Rotation animation
    const rotTween = gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: triggerEl,
          scroller,
          start: scrollStart,
          end: rotationEnd,
          scrub
        }
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>('.word');

    // Opacity reveal animation
    const opTween = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: triggerEl,
          scroller,
          start: scrollStart,
          end: wordAnimationEnd,
          scrub
        }
      }
    );

    // Optional blur reveal animation
    let blurTween: ReturnType<typeof gsap.fromTo> | null = null;
    if (enableBlur) {
      blurTween = gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: triggerEl,
            scroller,
            start: scrollStart,
            end: wordAnimationEnd,
            scrub
          }
        }
      );
    }

    return () => {
      rotTween.kill();
      opTween.kill();
      if (blurTween) blurTween.kill();
    };
  }, [
    scrollContainerRef,
    trigger,
    enableBlur,
    baseRotation,
    baseOpacity,
    scrollStart,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    scrub
  ]);

  return (
    <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <span className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}>{splitText}</span>
    </h2>
  );
}
