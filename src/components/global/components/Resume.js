export default function Resume() {
  return (
    <section id="resume" className="resume container">
      <ul className="resume__external">
        <li>
          <svg>
            <use href="/images/sprite.svg#icon-linkedin" />
          </svg>
          <a href="https://www.linkedin.com/in/joelebukatobi/">LinkedIn</a>
        </li>
        <li>
          <svg>
            <use href="/images/sprite.svg#icon-download" />
          </svg>
          <a href="https://docs.google.com/document/d/1-vNZJobzKZxociDVtTYS4akIpYY0tRkBiVZNg68a7yM/edit?usp=sharing">
            Download
          </a>
        </li>
      </ul>
      <div className="resume__content">
        <div className="resume__left">
          <p>
            I’m a frontend software developer, passionate about solving problems with code and transforming ideas from
            pixels to scalable products. I create usable applications with user experience as a top priority using
            various web tools, languages and technology
          </p>
          <div className="resume__card">
            <h6 className="title">core technologies</h6>
            <p>
              HTML, CSS, SCSS, Javascript [ES6+], React JS, Next JS, Strapi JS,TailwindCSS, Typescript, GraphQL, REST
              APIs & Figma
            </p>
          </div>
          <div className="resume__card">
            <h6 className="title">familiar with</h6>
            <p>WordPress, Node JS, Express, BulmaCSS, SEO,</p>
          </div>
          <div className="resume__card">
            <h6 className="title">work experience</h6>
            <p className="description">Datatac Nigeria Limited — Web Developer</p>
            <p className="date">March 2021 ~ Till Date</p>
            <ul className="list">
              <li className="item">
                <span>~</span> <p>Writing and implementing efficient code</p>
              </li>
              <li className="item">
                <span>~</span> <p>Determining operational practicality</p>
              </li>
              <li className="item">
                <span>~</span> <p>Maintaining and upgrading existing systems</p>
              </li>
              <li className="item">
                <span>~</span> <p>Training users</p>
              </li>
              <li className="item">
                <span>~</span> <p>Researching, designing, implementing, and managing web applications</p>
              </li>
              <li className="item">
                <span>~</span>{' '}
                <p>
                  Identifying areas for modification in existing programs and subsequently developing these
                  modifications
                </p>
              </li>
            </ul>
          </div>
          <div className="resume__card">
            <p className="description">Wootlab DevC Programme - Web Developer [Remote Intern]</p>
            <p className="date">September 2021 - December 2021</p>
            <ul className="list">
              <li className="item">
                <span>~</span>{' '}
                <p>
                  {' '}
                  Contributed to developing user interfaces for quite a number of products within three months while
                  learning new skills.
                </p>
              </li>
              <li className="item">
                <span>~</span> <p>Worked with Node js and React to build web applications</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="resume__right">
          <div className="resume__card">
            <p className="description">HNG Internship [Cohort 7] — UI/UX Design [Remote Intern]</p>
            <p className="date">October 2020 - February 2021</p>
            <ul className="list">
              <li className="item">
                <span>~</span>{' '}
                <p>
                  Contributed to designing user interfaces for quite a number of products within three months while
                  learning new skills
                </p>
              </li>
              <li className="item">
                <span>~</span>{' '}
                <p>Came up with Design Systems for quite a number of products including the MicroAPI Logo</p>
              </li>
              <li className="item">
                <span>~</span> <p>Picked up the basics of UI/UX Using Figma.</p>
              </li>
            </ul>
          </div>
          <div className="resume__card">
            <p className="description">
              Naval Officers Wives Association [NOWA] Educational Center ~ Web Admin/Data Processing Instructor
            </p>
            <p className="date">November 2019 ~ February 2021</p>
            <ul className="list">
              <li className="item">
                <span>~</span>{' '}
                <p>
                  Maintaining the school's website and students portal. This performing checks, updating and preparing
                  the system for each academic calendar
                </p>
              </li>
              <li className="item">
                <span>~</span>{' '}
                <p>Making sure the computer laboratories are functional, maintained and up and running</p>
              </li>
            </ul>
          </div>
          <div className="resume__card">
            <p className="description">Computer and Telecom Services — Frontend Dev/Exam Admin</p>
            <p className="date">April 2019 - October 2019</p>
            <ul className="list">
              <li className="item">
                <span>~</span>{' '}
                <p>Worked as a Front-end Developer using tools such as HTML, CSS, SaSS, JavaScript and Bootstrap.</p>
              </li>
              <li className="item">
                <span>~</span> <p>Administered TOEFL exams for registered students</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
