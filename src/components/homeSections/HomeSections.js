import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import styles from './homeSections.module.scss';

const HomeSections = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "section" } } }
        sort: { order: ASC, fields: [frontmatter___order] }
      ) {
        nodes {
          frontmatter {
            title
            image
          }
          html
        }
      }
    }
  `);

  return (
    <div className={`${styles.root} container`}>
      {data.allMarkdownRemark.nodes.map((section) => {
        return (
          <section key={section.id} className={styles.section}>
            <header className={styles.header}>
              <h1 className="section-title">{section.frontmatter.title}</h1>
            </header>

            <main
              dangerouslySetInnerHTML={{
                __html: section.html,
              }}
            ></main>

            <div
              style={{
                backgroundImage: `url(${section.frontmatter.image})`,
              }}
            ></div>
          </section>
        );
      })}
    </div>
  );
};

export default HomeSections;
