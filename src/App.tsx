import { site } from './config/index.ts'
import { Header } from './components/Header.tsx'
import { Hero } from './components/Hero.tsx'
import { Portfolio } from './components/Portfolio.tsx'
import { About, Services, Process } from './components/Studio.tsx'
import { Contact } from './components/Contact.tsx'
import { Footer } from './components/Footer.tsx'
import { useReveal } from './hooks/useReveal.ts'

export default function App() {
  useReveal()
  return (
    <>
      <a href="#main" className="skip-link">
        {site.content.ui.skip}
      </a>
      <div id="home" />
      <Header />
      <main id="main" tabIndex={-1}>
        {!site.sections.hero && (
          <h1 className="sr-only">
            {site.brand.name} — {site.brand.tagline}
          </h1>
        )}
        {site.sections.hero && <Hero />}
        {site.sections.portfolio && <Portfolio />}
        {site.sections.about && <About />}
        {site.sections.services && <Services />}
        {site.sections.process && <Process />}
        {site.sections.contact && <Contact />}
      </main>
      <Footer />
    </>
  )
}
