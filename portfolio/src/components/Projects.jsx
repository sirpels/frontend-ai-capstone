const projects = [
  {
    name: 'CONTROLHQ',
    type: 'Shopify Storefront',
    image: '/projects/controlhq.webp',
    previewIndex: 2,
    alt: 'ControlHQ Shopify storefront showing navigation, gaming controller imagery and product cards',
    description: 'A gaming-focused Shopify storefront where I worked on product presentation, navigation, responsive layouts, collections, and the overall ecommerce experience.',
    links: [{ label: 'View Store', href: 'https://sirpelsbuilds.myshopify.com/' }],
    demoPassword: 'controlhq',
  },
  {
    name: 'DEMOTECH ENGINEERING',
    type: 'Business Website / Frontend',
    image: '/projects/demotech.webp',
    previewIndex: 0,
    alt: 'Demotech Engineering website with industrial HVAC imagery and enquiry navigation',
    description: 'A responsive HVAC and mechanical engineering business website designed to present services clearly and give potential customers a simpler path to make enquiries and request quotations.',
    links: [
      { label: 'View Live', href: 'https://demotech-engineering-website.vercel.app' },
      { label: 'View Code', href: 'https://github.com/sirpels/Demotech-Engineering-Website' },
    ],
  },
  {
    name: 'REELORA',
    type: 'React Application',
    image: '/projects/reelora.webp',
    previewIndex: 1,
    alt: 'Reelora movie search with Batman results, favorites and watchlist controls',
    description: 'A React and Vite movie discovery application using the OMDb API and Firebase, with search, movie information, favorites, and watchlists.',
    currentFocus: 'Improving product polish, user flows, and overall experience.',
    links: [
      { label: 'View Live', href: 'https://reelora-six.vercel.app' },
      { label: 'View Code', href: 'https://github.com/sirpels/Reelora' },
    ],
  },
];
function ProjectCard({ project, index }) {
  return <article className="project-card">
    <div className={`project-preview preview-${project.previewIndex}`}><img src={project.image} alt={project.alt} loading="lazy"/></div>
    <div className="project-content">
      <div className="project-meta"><span>{project.type}</span><span>0{index + 1}</span></div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      {project.currentFocus && <p className="project-current-focus"><strong>Current focus:</strong> {project.currentFocus}</p>}
      <div className="project-links">
        {project.links.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} for ${project.name} (opens in a new tab)`}>{label}</a>)}
      </div>
      {project.demoPassword && <p className="project-access">Demo password: <code>{project.demoPassword}</code></p>}
    </div>
  </article>
}
export default function Projects() { return <section id="projects" className="section"><div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Real projects.<br /><em>Practical solutions.</em></h2></div><p>A selection of websites, applications,<br />and ecommerce experiences.</p></div><div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index}/>)}</div></section>; }
