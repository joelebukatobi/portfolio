import { icon } from '../../../lib/icons.js';

export function resume() {
  return `
<section id="resume" class="resume container">
  <ul class="resume__external">
    <li>
      ${icon('download')}
      <a href="https://docs.google.com/document/d/1mSW8ae8Dpoojbqee7XjOWQMRpL41PzJtEfzK8B8M3WM/edit?usp=sharing">Resume</a>
    </li>
    <li>
      ${icon('download')}
      <a href="https://docs.google.com/document/d/1pLffM_nQwl2bsBqcBk455NHh9sAe5yMrVCefXl55lvc/edit?usp=sharing">Cover Letter</a>
    </li>
  </ul>
  <div class="resume__content">
    <div class="resume__left">
      <div class="resume__card">
        <h6 class="title">skills</h6>
        <ul class="list">
          <li class="item"><span>~</span><p><strong>Product:</strong> Product Life Cycle Management (PLM), Stakeholder Alignment, Agile/Scrum (Jira/Bitbucket), User Experience &amp; Strategic Planning.</p></li>
          <li class="item"><span>~</span><p><strong>Frontend:</strong> React.js, Next.js, TypeScript, JavaScript (ES6+), Redux/RTK Query, Vue.js, Alpine.js, Tailwind, SCSS, Cypress.js, &amp; Vite.</p></li>
          <li class="item"><span>~</span><p><strong>Backend:</strong> Node.js, Strapi.js, PHP/Laravel, Python, REST/GraphQL APIs, MySQL, Postgres, &amp; MongoDB.</p></li>
          <li class="item"><span>~</span><p><strong>DevOps:</strong> Docker, Kubernetes, CI/CD Pipelines (GitHub Actions), Linux, Version Control (Git) &amp; AWS.</p></li>
          <li class="item"><span>~</span><p><strong>Design &amp; Productivity:</strong> Figma, Canva, Office 365, Google Workspace.</p></li>
          <li class="item"><span>~</span><p><strong>AI &amp; Agentic Systems:</strong> LLMs, OpenCode (Coding Agent), Model Context Protocol (MCPs), RAG Architecture, &amp; Prompt Engineering.</p></li>
        </ul>
      </div>
      <div class="resume__card">
        <h6 class="title">experience</h6>
        <h6 class="description">Amazon - Senior Product Manager – Technical (Intern)</h6>
        <p class="date">Customer Experience Impressions (SCOT-AIM) <span class="date__sep">|</span> Bellevue, Washington <span class="date__sep">|</span> May 2025 - August 2025</p>
        <ul class="list">
          <li class="item"><span>~</span><p>Managed product development life cycle, from conceptualization to launch, for the expansion of a core data product used by over 600 internal teams.</p></li>
          <li class="item"><span>~</span><p>Drove requirements gathering and stakeholder alignment with the engineering and business teams, with the end goal of building a more comprehensive data product that provides actionable signals for internal teams consuming these metrics.</p></li>
          <li class="item"><span>~</span><p>Championed a data-driven approach to product development, worked with data engineering for a technical design and implemented a proof-of-concept to validate the business impact and secure a path to production.</p></li>
          <li class="item"><span>~</span><p>Delivered an expanded data product with an increase in the number of product impressions of ASINs (3x) and a better overview of customer experience and engagement across major surfaces (page types).</p></li>
        </ul>
      </div>
      <div class="resume__card">
        <h6 class="description">Numinix Web Development Limited - Senior Frontend Developer (Remote)</h6>
        <p class="date">e-Commerce Company <span class="date__sep">|</span> Vancouver, BC Canada <span class="date__sep">|</span> December 2023 - July 2024</p>
        <ul class="list">
          <li class="item"><span>~</span><p>Optimized e-commerce websites for over 1,000 users by implementing user-friendly experiences and improving search engine visibility by 40% through SEO best practices &amp; rigorous usability testing.</p></li>
          <li class="item"><span>~</span><p>Collaborated with a cross-functional agile team to design, develop, &amp; deploy high-quality e-commerce web pages, achieving a 95% on-time delivery rate.</p></li>
          <li class="item"><span>~</span><p>Responded to client tickets weekly via Jira, addressed issues to ensure timely solutions, and maintained high client satisfaction, leading to a 25% increase in customer satisfaction.</p></li>
        </ul>
      </div>
    </div>
    <div class="resume__right">
      <div class="resume__card">
        <h6 class="description">MKEL Networks Limited - Web Developer</h6>
        <p class="date">Telecommunications and IT <span class="date__sep">|</span> Abuja, Nigeria <span class="date__sep">|</span> March 2022 - December 2023</p>
        <ul class="list">
          <li class="item"><span>~</span><p>Engaged with a broad team on complex network projects, reduced downtime by 25%, and boosted system efficiency by 30%.</p></li>
          <li class="item"><span>~</span><p>Managed VOIP call rates from Q1 to Q3 in 2023, identifying new margins leading to a 20% increase in revenue for VOIP calls.</p></li>
          <li class="item"><span>~</span><p>Cultivated strategic partnerships with MNOs &amp; VOIP service providers.</p></li>
          <li class="item"><span>~</span><p>Engineered web applications with JavaScript frameworks. Leveraged Docker, Kubernetes, CI/CD pipelines as well as Git to boost deployment efficiency by 45%, enhance application speed by 35% with a reduction in load time by 25%.</p></li>
          <li class="item"><span>~</span><p>Mentored 3 software engineering interns, increasing team productivity by 20%, facilitating the completion of two in-house web application projects.</p></li>
        </ul>
      </div>
      <div class="resume__card">
        <h6 class="description">xPathEdge LLC - Web Developer (Part-time Remote)</h6>
        <p class="date">IT Services and Consulting <span class="date__sep">|</span> Arlington, TX United States <span class="date__sep">|</span> March 2022 - March 2024</p>
        <ul class="list">
          <li class="item"><span>~</span><p>Developed and maintained web pages using Next.js and Laravel Framework, ensuring accurate design implementation and mobile responsiveness.</p></li>
          <li class="item"><span>~</span><p>Used Git for version control and built reusable components to streamline web pages for scalability and speed.</p></li>
          <li class="item"><span>~</span><p>Conducted usability testing to enhance user experience and incorporated SEO best practices to improve search engine visibility.</p></li>
          <li class="item"><span>~</span><p>Collaborated with a cross-functional team to design, develop, and deploy high-quality web pages that meet project objectives and exceed stakeholder requirements.</p></li>
          <li class="item"><span>~</span><p>Wrote tests that cover all aspects of the application, including user interface, functionality, and performance with Cypress.js.</p></li>
        </ul>
      </div>
      <div class="resume__card">
        <h6 class="description">Datatac Nigeria Limited - Web Developer</h6>
        <p class="date">Web Design and Development Agency <span class="date__sep">|</span> Abuja, Nigeria <span class="date__sep">|</span> March 2021 - February 2022</p>
        <ul class="list">
          <li class="item"><span>~</span><p>Led an agile team of 10 people across different domains, from design to development to deliver web projects, delegating tasks, and assigning teams based on project requirements. Ensured 100% on-time delivery by adhering to agile principles.</p></li>
          <li class="item"><span>~</span><p>Engaged with clients to gather requirements, outline digital marketing processes, and attained a 30% increase in project efficiency as a result.</p></li>
          <li class="item"><span>~</span><p>Developed proposals for projects. Met project goals within budget while on schedule, achieving a 25% increase in project success rate.</p></li>
          <li class="item"><span>~</span><p>Mentored 2 interns, offering a broad understanding of software engineering. Resulted in top grades upon returning to school.</p></li>
        </ul>
      </div>
    </div>
  </div>
</section>`;
}
