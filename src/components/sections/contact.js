import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 50px;
    flex-wrap: wrap;
  }

  .email-link,
  .phone-link {
    ${({ theme }) => theme.mixins.bigButton};
  }

  .phone-link {
    position: relative;
    cursor: pointer;
  }

  .copied-tooltip {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--green);
    color: var(--navy);
    padding: 5px 10px;
    border-radius: 4px;
    font-size: var(--fz-xs);
    font-family: var(--font-mono);
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);
  const phoneNumber = '+91 7032297414';

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(phoneNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What's Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        I'm always interested in hearing about new opportunities, collaborations, or just having a
        chat about AI and technology. Whether you have a question or just want to say hi, feel free
        to reach out!
      </p>

      <div className="button-container">
        <a className="email-link" href={`mailto:${email}`}>
          Say Hello
        </a>
        <button className="phone-link" onClick={copyToClipboard}>
          {copied && <span className="copied-tooltip">Copied!</span>}
          Phone
        </button>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
