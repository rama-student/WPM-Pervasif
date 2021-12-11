import React, {useState} from 'react'
import { Nav,Navbar, Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import CloseIcon from '@mui/icons-material/Close';
import  "../header.css";
import { Link } from 'react-router-dom'
import { sidebarData } from './sidebarData';
import './sidebar.css'

function Header() {
    const[sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)
    
    return (
        <>
        <div>
            <div className="navbar">
            <Link to="#" className="menu-bars">
                <ViewHeadlineIcon onClick={showSidebar}/>
            </Link>
            </div>    
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items'>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <CloseIcon onClick={showSidebar}/>
                            </Link>
                        </li>
                        {sidebarData.map((item, index) => {
                            return(
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
        </div>
</>
    )
}

export default Header
