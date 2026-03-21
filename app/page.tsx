import Link from 'next/link';

type Stack = { _id: string; category: string; name: string; level?: string };
type Project = { _id: string; title: string; summary: string; tags: string[]; imageUrl?: string; liveUrl?: string; sourceUrl?: string };
type Log = { _id: string; year: number; title: string; details: string };

async function getContent(): Promise<{ stackMatrix: Stack[]; registry: Project[]; systemLogs: Log[] }> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  try {
    const res = await fetch(`${base}/api/content`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load');
    return res.json();
  } catch {
    return { stackMatrix: [], registry: [], systemLogs: [] };
  }
}

export default async function Home() {
  const { stackMatrix, registry, systemLogs } = await getContent();
  const grouped = stackMatrix.reduce<Record<string, Stack[]>>((acc, item) => {
    acc[item.category] = [...(acc[item.category] ?? []), item];
    return acc;
  }, {});

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <span className="brand">SYS_ARCHITECT_v1.0</span>
          <div className="nav-links">
            <a href="#about">ABOUT</a>
            <a href="#stack">STACK_MATRIX</a>
            <a href="#projects">REGISTRY</a>
            <a href="#logs">SYSTEM_LOGS</a>
            <a href="#contact">CONTACT</a>
            <Link href="/admin">ADMIN</Link>
          </div>
        </div>
      </nav>

      <main className="container">
        <section className="hero" id="hero">
          <div>
            <span className="badge">SYSTEM LIVE // v2.4.0</span>
            <h1>
              Hi, I’m Daniel.
              <br />
              <span style={{ color: 'var(--primary)' }}>Full-Stack</span> Developer & Mobile Engineer.
            </h1>
            <p className="muted">I build fast, scalable apps and real-world systems.</p>
            <div className="btns">
              <a className="btn primary" href="#projects">VIEW PROJECTS</a>
              <a className="btn ghost" href="#contact">CONTACT ME</a>
            </div>
          </div>
          <div className="terminal">
            <pre>{`➜ deploy --env production
[info] compiling assets...
[done] optimization complete (0.4s)
➜ SUCCESS endpoint active: api.daniel.dev`}</pre>
          </div>
        </section>

        <section className="section" id="about">
          <h2>// BRIEFING_02</h2>
          <p>Engineering digital experiences that bridge the gap between design and scalable systems.</p>
        </section>

        <section className="section" id="stack">
          <h2>Stack_Matrix</h2>
          <div className="grid-4">
            {(Object.keys(grouped).length ? Object.entries(grouped) : [['Frontend', []], ['Backend', []], ['Mobile', []], ['Cloud', []]]).map(([category, items]) => (
              <div key={category} className="card">
                <h3>{category}</h3>
                <p className="muted">{items.length ? items.map((skill) => skill.name).join(' • ') : 'Add skills from /admin.'}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="projects">
          <h2>The Registry</h2>
          <div className="project-grid">
            {registry.length ? registry.map((project) => (
              <article key={project._id} className="card">
                {project.imageUrl ? <img className="project-img" src={project.imageUrl} alt={project.title} /> : <div className="project-img" />}
                <h3>{project.title}</h3>
                <p className="muted">{project.summary}</p>
                <p className="muted">{project.tags.join(' • ')}</p>
                <div className="btns">
                  {project.liveUrl ? <a className="btn ghost" href={project.liveUrl}>LIVE</a> : null}
                  {project.sourceUrl ? <a className="btn ghost" href={project.sourceUrl}>SOURCE</a> : null}
                </div>
              </article>
            )) : <p className="muted">No registry items yet. Add from /admin.</p>}
          </div>
        </section>

        <section className="section" id="logs">
          <h2>System Logs // Chronology</h2>
          <div className="timeline">
            {systemLogs.length ? systemLogs.sort((a, b) => b.year - a.year).map((log) => (
              <div className="log" key={log._id}>
                <strong>{log.year}</strong>
                <div className="card">
                  <h3>{log.title}</h3>
                  <p className="muted">{log.details}</p>
                </div>
              </div>
            )) : <p className="muted">No logs yet. Add from /admin.</p>}
          </div>
        </section>

        <section className="section" id="contact">
          <h2>Let’s build something solid.</h2>
          <p className="muted">Reach me at <a href="mailto:danielagbeni12@gmail.com">danielagbeni12@gmail.com</a></p>
        </section>
      </main>
    </>
  );
}
