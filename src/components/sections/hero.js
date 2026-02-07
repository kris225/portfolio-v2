import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  position: relative;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const StyledScrollArrow = styled.a`
  position: absolute;
  bottom: 40px;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border: 1px solid var(--green);
  border-radius: 50%;
  background-color: transparent;
  color: var(--green);
  cursor: pointer;
  transition: var(--transition);
  animation: bounce 2s infinite;

  @media (max-width: 768px) {
    bottom: 20px;
    width: 45px;
    height: 45px;
  }

  @media (max-width: 480px) {
    bottom: 15px;
    width: 40px;
    height: 40px;
  }

  @media (max-height: 700px) {
    display: none;
  }

  &:hover,
  &:focus {
    background-color: var(--green-tint);
    transform: translate(-50%, 3px);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translate(-50%, 0);
    }
    40% {
      transform: translate(-50%, -10px);
    }
    60% {
      transform: translate(-50%, -5px);
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Krishna Gundimeda.</h2>;
  const three = <h3 className="big-heading">I build AI & web experiences.</h3>;
  const four = (
    <>
      <p>
        I'm a Frontend and AI Engineer specializing in building production-grade web applications
        and intelligent systems. Currently, I'm contracting at{' '}
        <a href="https://www.broadcom.com/" target="_blank" rel="noreferrer">
          Broadcom
        </a>{' '}
        via Futurist Global, developing next-generation AI features and reusable web components.
      </p>
    </>
  );

  const items = [one, two, three, four];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}

      <StyledScrollArrow href="#about" aria-label="Scroll down">
        <svg viewBox="0 0 24 24">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </StyledScrollArrow>
    </StyledHeroSection>
  );
};

export default Hero;
