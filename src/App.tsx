import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Journey } from './components/Journey'
import { Story } from './components/Story'
import { Music } from './components/Music'
import { Live } from './components/Live'
import { Daisies } from './components/Daisies'
import { Footer } from './components/Footer'
import { useRevealAll } from './lib/hooks'

export default function App() {
  useRevealAll()
  return (
    <>
      <a href="#ep" className="skip">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Journey />
        <Story />
        <Music />
        <Live />
        <Daisies />
      </main>
      <Footer />
    </>
  )
}
