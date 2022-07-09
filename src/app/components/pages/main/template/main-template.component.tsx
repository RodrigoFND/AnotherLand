import Content from './content/content'
import Header from './header/header.component'
import Sidebar from './sidebar/sidebar.component'
// import './main-template.css';
import './main-template.scss'

function MainTemplate() {
  return (
    <div className="grid-container">
      <div className="header-grid">
        <Header />
      </div>
      <aside className="sidebar-grid">
        <Sidebar />
      </aside>
      <div className="content-grid">
        <Content />
      </div>
    </div>
  )
}

export default MainTemplate
