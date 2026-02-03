import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledBlogsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }
`;

const StyledBlogsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  position: relative;
  margin-top: 50px;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StyledBlog = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .blog-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .blog-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
  }

  .blog-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .blog-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .blog-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .blog-description {
    color: var(--light-slate);
    font-size: 17px;
  }

  .blog-date {
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    margin-top: 20px;
  }
`;

const blogsData = [
  {
    title: 'The Case for CAG: Less Retrieval, More Speed',
    description:
      'Exploring Cache-Augmented Generation as an alternative to RAG for superior performance in LLM applications.',
    url: 'https://prabhatkrishna.wordpress.com/2024/12/25/the-case-of-cag/',
    date: 'Dec 25, 2025',
  },
  {
    title: 'Gemini: Google\'s Multimodal Moonshot',
    description:
      'Technical analysis of Google\'s Gemini AI model family and its architectural innovations.',
    url: 'https://prabhatkrishna.wordpress.com/2024/02/21/gemini-googles-multimodal-moonshot/',
    date: 'Feb 21, 2024',
  },
  {
    title: 'Llama 2: How Meta Gave Away the Recipe (Mostly)',
    description:
      'Deep dive into Meta\'s Llama 2 release, training methodology, and licensing nuances.',
    url: 'https://prabhatkrishna.wordpress.com/2023/07/21/llama-2-how-meta-gave-away-the-recipe-mostly/',
    date: 'Jul 21, 2023',
  },
];

const Blogs = () => {
  const revealTitle = useRef(null);
  const revealBlogs = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealBlogs.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledBlogsSection id="blogs">
      <h2 ref={revealTitle} className="numbered-heading">
        Blogs
      </h2>

      <StyledBlogsGrid>
        {blogsData.map((blog, i) => (
          <StyledBlog key={i} ref={el => (revealBlogs.current[i] = el)}>
            <div className="blog-inner">
              <header>
                <div className="blog-top">
                  <div className="folder">
                    <Icon name="Article" />
                  </div>
                  <div className="blog-links">
                    <a
                      href={blog.url}
                      aria-label="External Link"
                      className="external"
                      target="_blank"
                      rel="noreferrer">
                      <Icon name="External" />
                    </a>
                  </div>
                </div>

                <h3 className="blog-title">
                  <a href={blog.url} target="_blank" rel="noreferrer">
                    {blog.title}
                  </a>
                </h3>

                <p className="blog-description">{blog.description}</p>
              </header>

              <footer>
                <p className="blog-date">{blog.date}</p>
              </footer>
            </div>
          </StyledBlog>
        ))}
      </StyledBlogsGrid>
    </StyledBlogsSection>
  );
};

export default Blogs;
