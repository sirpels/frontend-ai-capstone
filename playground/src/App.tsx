import Modal from './components/Modal'
import Tabs from './components/Tabs'
import Disclosure from './components/Disclosure'
import './App.css'

export default function App() {
  return (
    <main>
      <h1>Accessibility playground</h1>
      <p>Use your keyboard to explore these manually built components.</p>
      <section aria-labelledby="modal-heading">
        <h2 id="modal-heading">Modal dialog</h2>
        <Modal />
      </section>
      <section aria-labelledby="tabs-heading">
        <h2 id="tabs-heading">Tabs</h2>
        <p>Arrow keys move between tabs and immediately show their content.</p>
        <Tabs />
      </section>
      <section aria-labelledby="disclosure-heading">
        <h2 id="disclosure-heading">Disclosure</h2>
        <Disclosure />
      </section>
    </main>
  )
}
