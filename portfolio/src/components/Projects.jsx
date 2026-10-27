const projects = [
    { name: 'DEMOTECH ENGINEERING', type: 'Business Website / Frontend', image: '/projects/demotech.png', alt: 'Demotech Engineering website with industrial HVAC imagery and enquiry navigation', description: 'A responsive website for an HVAC engineering company, designed to improve its digital presence, communicate its services clearly, and make it easier for potential clients to enquire about projects.', focus: 'Responsive UI · Service presentation · Enquiry experience', links: [{ label: 'View Live', href: 'https://demotech-engineering-website.vercel.app' }, { label: 'View Code', href: 'https://github.com/sirpels/Demotech-Engineering-Website' }] },
    { name: 'REELORA', type: 'React Application', image: '/projects/reelora.png', alt: 'Reelora movie search with Batman results, favorites and watchlist controls', description: 'A React movie discovery application that helps users search for movies and explore results through a simple, responsive interface.', focus: 'React · API data · Search experience · Responsive UI', links: [{ label: 'View Live', href: 'https://reelora-six.vercel.app' }, { label: 'View Code', href: 'https://github.com/sirpels/Reelora' }] },
    { name: 'CONTROLHQ', type: 'Shopify Storefront', image: '/projects/controlhq.png', alt: 'ControlHQ Shopify storefront showing navigation, gaming controller imagery and product cards', description: "A gaming-focused Shopify storefront where I worked on the ecommerce experience and used Shopify's AI tools as part of the development process.", focus: 'Shopify · Ecommerce UX · AI-assisted development', links: [{ label: 'View Store', href: 'https://sirpelsbuilds.myshopify.com/' }], demoPassword: 'controlhq' }
];
function ProjectCard({ project, index }) {
  return <article className="project-card">
    <div className={`project-preview preview-${index}`}><img src={project.image} alt={project.alt} loading="lazy"/></div>
    <div className="project-content">
      <div className="project-meta"><span>{project.type}</span><span>0{index + 1}</span></div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p className="project-focus">{project.focus}</p>
      <div className="project-links">
        {project.links.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} for ${project.name} (opens in a new tab)`}>{label}</a>)}
      </div>
      {project.demoPassword && <p className="project-access">Demo password: <code>{project.demoPassword}</code></p>}
    </div>
  </article>
}
export default function Projects() { return <section id="projects" className="section"><div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Real projects.<br /><em>Practical solutions.</em></h2></div><p>A selection of websites, applications,<br />and ecommerce experiences.</p></div><div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index}/>)}</div></section>; }
