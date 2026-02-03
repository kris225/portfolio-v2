import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledCertificationsSection = styled.section`
  max-width: 700px;
  margin: 0 auto;

  .cert-list {
    ${({ theme }) => theme.mixins.resetList};
    margin-top: 30px;
  }

  .cert-item {
    margin-bottom: 24px;
  }

  .cert-title {
    font-size: var(--fz-xl);
    color: var(--lightest-slate);
    margin-bottom: 8px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .cert-issuer {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    margin-bottom: 8px;
  }

  .cert-description {
    color: var(--light-slate);
    font-size: var(--fz-md);
  }
`;

const certifications = [
  {
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI & Stanford University',
    url: 'https://coursera.org/share/ce426408ec16186b03fcf5f4c16d5645',
    description:
      'Comprehensive ML curriculum covering supervised learning, neural networks, decision trees, recommender systems, and reinforcement learning taught by Andrew Ng.',
  },
  {
    title: 'The Web Developer Bootcamp',
    issuer: 'Udemy',
    url: 'https://www.udemy.com/certificate/UC-6ce12db2-b423-46ef-ada3-ea335902ec7a/',
    description:
      'Full-stack web development covering HTML, CSS, JavaScript, Node.js, Express, MongoDB, and modern frameworks for building production-ready applications.',
  },
  {
    title: '100 Days of Code: Python',
    issuer: 'Udemy',
    url: 'https://www.udemy.com/certificate/UC-6e3073b2-e41b-406a-8e9c-8f157cba6ed8/',
    description:
      'Intensive Python bootcamp covering automation, web scraping, data science, GUI development, and building real-world projects across 100 days.',
  },
  {
    title: 'Google Cloud Skills Boost',
    issuer: 'Google Cloud',
    url: 'https://www.cloudskillsboost.google/public_profiles/58b2fd36-2dc5-4dd7-b08b-a2f864e9c605',
    description:
      'Hands-on labs and skill badges in Google Cloud Platform including Vertex AI, BigQuery, Cloud Functions, and MLOps practices.',
  },
];

const Certifications = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledCertificationsSection id="certifications" ref={revealContainer}>
      <h2 className="numbered-heading">Certifications</h2>

      <ul className="cert-list">
        {certifications.map((cert, index) => (
          <li key={index} className="cert-item">
            <h3 className="cert-title">
              <a href={cert.url} target="_blank" rel="noopener noreferrer">
                {cert.title}
              </a>
            </h3>
            <p className="cert-issuer">{cert.issuer}</p>
            <p className="cert-description">{cert.description}</p>
          </li>
        ))}
      </ul>
    </StyledCertificationsSection>
  );
};

export default Certifications;
