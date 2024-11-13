import LogoInverso from '../assets/Logoinverso.png'
import '../css/NavBar.css'
import BoardCard from "./BoardCard"
import React, { useState, useEffect, useRef } from 'react';
import Dropdown from '../components/Dropdown'


const NavBar = () => {

    
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        // Aplica el fondo deseado al body
        document.body.style.backgroundColor = "#1d2125"; // Color específico para la página de login
        // Limpieza: restaura el fondo original cuando el componente se desmonte
        return () => {
            document.body.style.backgroundColor = ""; // Restaura el fondo original
        };
    }, []);

    useEffect(() => {

        function handleResize() {
            setIsMobile(window.innerWidth < 800);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, []);


    const change = (event, contenido) => {
        setTimeout(() => {
            inputRef.current?.focus(); // Fija el foco en el input (si existe)
        }, 0);
        setItemContent(contenido);
    }

    const notclose = (event, allowDefault = false) => {
        event.preventDefault();
        event.stopPropagation();

    }
    const [itemContent, setItemContent] = useState(
        <div>
            <li><a className="dropdown-item" onClick={(event) => change(event, createtableros)}>
                <div>
                    <img src={LogoInverso} className="LogoNavBar" />
                    <span>Crear tablero</span>
                </div>
                <h6>Un tablero es una colección de tarjetas organizadas en listas. Úsalo para administrar proyectos,
                    hacer seguimiento de información o planificar cualquier tarea.</h6></a></li>
            <li><a className="dropdown-item">Another action</a></li>
            <li><a className="dropdown-item">Something else here</a></li>
        </div>
    );
    const original = (
        <div>
            <li><a className="dropdown-item" onClick={(event) => change(event, createtableros)}>
                <div>
                    <img src={LogoInverso} className="LogoNavBar" />
                    <span>Crear tablero</span>
                </div>
                <h6>Un tablero es una colección de tarjetas organizadas en listas. Úsalo para administrar proyectos,
                    hacer seguimiento de información o planificar cualquier tarea.</h6></a></li>
            <li><a className="dropdown-item">Another action</a></li>
            <li><a className="dropdown-item">Something else here</a></li>
        </div>
    );
    const inputRef = useRef(null);


    const createtableros = (

        <div className="containerCT">
            <div className='navbar-createT' >
                <div className='back' onClick={(event) => change(event, original)}>
                    <i className="bi bi-chevron-left" ></i>
                </div>
                <span className='title'>Crear tablero</span>
                <div className='close' onClick={(event) => closeDropdown(event, original)}>
                    <i className="bi bi-x-lg"></i>
                </div>
            </div>
            <div className="color-selector">
                <button className="color-1"></button>
                <button className="color-2"></button>
                <button className="color-3"></button>
                <button className="color-4"></button>
            </div>

            <div className="form-group">
                <label htmlFor="titulo">Título del tablero *</label>
                <input type="text" id="titulo" ref={inputRef} />
                <p className="warning-message">Es necesario indicar el título del tablero</p>
            </div>

            <div className="form-group">
                <label htmlFor="workspace">Espacio de trabajo</label>
                <select id="workspace">
                    <option value="life-engineers">Life Engineers</option>
                    <option value="otro">Otro Espacio</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="visibility">Visibilidad</label>
                <select id="visibility">
                    <option value="workspace">Espacio de trabajo</option>
                    <option value="public">Público</option>
                    <option value="private">Privado</option>
                </select>
            </div>
        </div>
    );
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = (event, contenido) => {
        
        setIsDropdownOpen(false);
    };
    useEffect(() => {
        document.body.style.backgroundColor = "#1d2125";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Si el clic ocurre fuera del dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false); // Cierra el menú
                setItemContent(original);
            }
        };

        // Agregar el evento al documento
        document.addEventListener("mousedown", handleClickOutside);

        // Limpiar el evento al desmontar el componente
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="NavBar">
            <div className="top-space1">
                <img src={LogoInverso} className="LogoNavBar1" />
                <span className="text-top1">KanbanFlow</span>
                {isMobile ? (
                    <Dropdown title="Más" items={dropdownData} nested={true} />
                ) : (
                    dropdownData.map((data, index) => (
                        <Dropdown key={index} title={data.title} items={data.items} nested={false} />
                    ))
                )}
                <div className="dropdown">
                    <button
                        className="btn btn-secondary btn-large-custom btn-create"
                        type="button"
                        onClick={toggleDropdown}
                    >
                        Crear
                    </button>
                    <div ref={dropdownRef}>
                        {isDropdownOpen && ( // Solo muestra el menú si está abierto
                            <div>
                                <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} onClick={notclose}>
                                    {itemContent}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="tableros">
                <BoardCard boardname={"project1"}></BoardCard>
                <BoardCard boardname={"project2"}></BoardCard>
                <BoardCard boardname={"project3"}></BoardCard>
                <BoardCard boardname={"project4"}></BoardCard>
                <BoardCard boardname={"project5"}></BoardCard>
                <BoardCard boardname={"project6"}></BoardCard>
                <BoardCard boardname={"project7"}></BoardCard>
                <BoardCard boardname={"project8"}></BoardCard>
                <BoardCard boardname={"project9"}></BoardCard>
                <BoardCard boardname={"project10"}></BoardCard>
            </div>
        </div>


    );
};


const dropdownData = [
    {
        title: "Dropdown 1",
        items: [
            { href: null, label: "Action 1-1" },
            { href: null, label: "Action 1-2" }
        ]
    },
    {
        title: "Dropdown 2",
        items: [
            { href: null, label: "Action 2-1" },
            { href: null, label: "Action 2-2" }
        ]
    },
    {
        title: "Dropdown 3",
        items: [
            { href: null, label: "Action 3-1" },
            { href: null, label: "Action 3-2" }
        ]
    }
];


export default NavBar