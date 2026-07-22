import { SampleTemplate } from '../types';

export const SAMPLE_TEMPLATES: SampleTemplate[] = [
  {
    id: 'portfolio',
    title: 'Modern Developer Portfolio',
    description: 'Clean personal website with hero section, project grid, skills badge, and contact form.',
    category: 'Portfolio',
    html: `<header class="site-header">
  <div class="logo">Farrux<span>.dev</span></div>
  <nav class="nav-links">
    <a href="#about">Biz haqimizda</a>
    <a href="#projects">Loyiha va Portfolio</a>
    <a href="#skills">Ko'nikmalar</a>
    <a href="#contact" class="btn-primary">Bog'lanish</a>
  </nav>
</header>

<section class="hero-section">
  <div class="hero-content">
    <span class="badge">Full-Stack Dasturchi</span>
    <h1>Salom, men <span>Next.js & Web</span> dasturchiman</h1>
    <p>Zamonaviy, tez va xavfsiz veb-saytlar va ilovalar yarataman. HTML/CSS loyihalarni Next.js ga o'tkazish va serverless deploy qilish tajribasiga egaman.</p>
    <div class="hero-buttons">
      <a href="#projects" class="btn-main">Loyihalarni ko'rish</a>
      <a href="#contact" class="btn-secondary">Murojaat qilish</a>
    </div>
  </div>
  <div class="hero-card">
    <div class="stat-box">
      <h3>50+</h3>
      <p>Bajarilgan loyihalar</p>
    </div>
    <div class="stat-box">
      <h3>99.9%</h3>
      <p>Ishonchlilik & Bepul deploy</p>
    </div>
  </div>
</section>

<section id="projects" class="projects-section">
  <h2>Ajoyib Loyihalar</h2>
  <div class="project-grid">
    <div class="project-card">
      <div class="card-tag">Next.js 15</div>
      <h3>Online Do'kon Platformasi</h3>
      <p>Tezkor e-commerce platformasi Next.js, Tailwind CSS va Stripe to'lov tizimi bilan.</p>
      <button class="btn-outline">Batafsil</button>
    </div>
    <div class="project-card">
      <div class="card-tag">AI & Cloud</div>
      <h3>AI Chat va Boshqaruv Paneli</h3>
      <p>Shtatli sun'iy intellekt assistant va analitika paneli.</p>
      <button class="btn-outline">Batafsil</button>
    </div>
    <div class="project-card">
      <div class="card-tag">React & API</div>
      <h3>Moliya & Kripto Hamyon</h3>
      <p>Real-vaqt rejimida daromadlar va xarajatlarni kuzatish ilovasi.</p>
      <button class="btn-outline">Batafsil</button>
    </div>
  </div>
</section>`,
    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

body {
  background-color: #0f172a;
  color: #f8fafc;
  line-height: 1.6;
}

.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  border-bottom: 1px solid #1e293b;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: #38bdf8;
}

.logo span {
  color: #a855f7;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-links a {
  color: #94a3b8;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #f8fafc;
}

.btn-primary {
  background: linear-gradient(135deg, #0284c7, #2563eb);
  color: white !important;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-weight: 600;
}

.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 5rem 3rem;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
}

.badge {
  display: inline-block;
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.hero-content h1 {
  font-size: 3rem;
  line-height: 1.2;
  font-weight: 800;
  margin-bottom: 1.25rem;
}

.hero-content h1 span {
  background: linear-gradient(to right, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-content p {
  color: #94a3b8;
  font-size: 1.125rem;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.btn-main {
  background: #38bdf8;
  color: #0f172a;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 700;
  text-decoration: none;
}

.btn-secondary {
  border: 1px solid #334155;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
}

.hero-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.stat-box {
  background: #1e293b;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #334155;
  text-align: center;
}

.stat-box h3 {
  font-size: 2.25rem;
  color: #38bdf8;
}

.projects-section {
  padding: 4rem 3rem;
  max-width: 1280px;
  margin: 0 auto;
}

.projects-section h2 {
  font-size: 2.25rem;
  margin-bottom: 2.5rem;
  text-align: center;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: #1e293b;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #334155;
}

.card-tag {
  color: #38bdf8;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.project-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.project-card p {
  color: #94a3b8;
  margin-bottom: 1.5rem;
}

.btn-outline {
  background: transparent;
  border: 1px solid #38bdf8;
  color: #38bdf8;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  width: 100%;
  font-weight: 600;
}`,
    js: `// Interactive script
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});`
  },
  {
    id: 'business',
    title: 'SaaS Platform Landing Page',
    description: 'High converting landing page with feature badges, pricing cards, and call to action.',
    category: 'Landing Page',
    html: `<div class="saas-container">
  <nav class="navbar">
    <div class="brand">CloudSync</div>
    <div class="menu">
      <a href="#features">Imkoniyatlar</a>
      <a href="#pricing">Narxlar</a>
      <a href="#faq">FAQ</a>
    </div>
    <button class="nav-btn">Boshlash (Tekshirish)</button>
  </nav>

  <main class="hero">
    <h1>Bulutli Dasturlarni Next.js da Boshqaring</h1>
    <p>HTML, CSS va Javascript loyihalaringizni soniyalar ichida Next.js va Vercel, Cloud Run serverlariga tez va oson joylashtiring.</p>
    <div class="cta-box">
      <input type="email" placeholder="Elektron pochtangizni kiriting..." />
      <button class="cta-btn">Bepul Boshlash</button>
    </div>
  </main>
</div>`,
    css: `.saas-container {
  background: #090d16;
  color: #ffffff;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.brand {
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(45deg, #4f46e5, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.menu a {
  color: #9ca3af;
  margin: 0 15px;
  text-decoration: none;
}
.nav-btn {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}
.hero {
  text-align: center;
  max-width: 800px;
  margin: 80px auto;
  padding: 0 20px;
}
.hero h1 {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.2;
}
.hero p {
  color: #9ca3af;
  font-size: 18px;
  margin: 20px 0 40px;
}
.cta-box {
  display: flex;
  gap: 10px;
  justify-content: center;
}
.cta-box input {
  padding: 14px 20px;
  border-radius: 8px;
  border: 1px solid #374151;
  background: #1f2937;
  color: white;
  width: 320px;
}
.cta-btn {
  background: #06b6d4;
  color: #000;
  font-weight: bold;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  cursor: pointer;
}`,
    js: `console.log('SaaS Landing ready');`
  }
];
