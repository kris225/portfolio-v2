import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;

  .numbered-heading {
    justify-content: center;
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .email-link,
  .phone-link {
    ${({ theme }) => theme.mixins.bigButton};
    padding: 1.25rem 1.75rem;
    line-height: 1;
  }

  .phone-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    svg {
      width: 18px;
      height: 18px;
    }
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
    white-space: nowrap;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [copiedField, setCopiedField] = useState(null);
  const phoneNumber = '+91 7032297414';

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const handleCopy = (value, field) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading">Contact</h2>

      <div className="button-container">
        <a className="email-link" href={`mailto:${email}`}>
          Email
        </a>

        <button
          type="button"
          className="phone-link"
          onClick={() => handleCopy(phoneNumber, 'phone')}
          aria-label="Copy phone number">
          <Icon name="Copy" />
          <span>Phone</span>
          {copiedField === 'phone' && <span className="copied-tooltip">Copied!</span>}
        </button>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
