import { React, useState, useEffect, useContext } from "react";
import '../css/createSW.css'
import _Profile from '../assets/LogoN.png'
import { UserContext } from '../contexts/userContext';
import supabase from '../supabase';


const createSW = () => {
    const [data, setData] = useState(null); // Estado para almacenar los datos
    const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
    const { user } = useContext(UserContext);

    // Método para recuperar datos
    const insertarYRetornarId = async (e) => {
        try {
            e.preventDefault();
            const { data, error } = await supabase.rpc('insertsw', {
                name1: e.target.name.value,
                type1: e.target.type.value,
                description1: e.target.description.value,

            });

            if (error) {
                console.error('Error al insertar y retornar ID:', error);
                return null;
            }

            console.log('ID del nuevo registro:', data);
            const { error1 } = await supabase
                .from('UsersSW')
                .insert({ idUser: user.id, idSW: data })

            return data;
        } catch (err) {
            console.error('Error general:', err);
            return null;
        }
    };


    useEffect(() => {
        // Aplica el fondo deseado al body
        document.body.style.backgroundColor = "#1d2125"; // Color específico para la página de login

        // Limpieza: restaura el fondo original cuando el componente se desmonte
        return () => {
            document.body.style.backgroundColor = ""; // Restaura el fondo original
        };
    }, []);



    return (
        <div className='createSW'>
            <div className="space-top">

            </div>
            <div className="form-container">
                <div className="fmc">
                    <h1>El tablero es el punto de partida</h1>
                    <form onSubmit={insertarYRetornarId}>
                        <div className="form-group">
                            <label htmlFor="workspace-name">Nombre del Espacio de trabajo</label>
                            <input type="text" id="name" name="name" placeholder="Tec S.A" className="textbox" />
                            <small>Este es el nombre de tu empresa, equipo u organización.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Tipo de Espacio de trabajo</label>
                            <select id="type" name="type" defaultValue="">
                                <option value="" disabled hidden>Elegir...</option>
                                <option value="empresa">Empresa</option>
                                <option value="equipo">Equipo</option>
                                <option value="organización">Organización</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="workspace-description">Descripción del Espacio de trabajo <span>(Opcional)</span></label>
                            <textarea id="description" name="description" placeholder="Nuestro equipo lo organiza todo aquí."></textarea>
                            <small>Incorpora a los miembros con unas cuantas palabras sobre tu Espacio de trabajo.</small>
                        </div>
                        <button type="submit" className="btn-submit">Continuar</button>
                    </form>
                </div>
            </div>
            <div className="image-container">
                <img src={_Profile} alt="Espacio de trabajo" />
            </div>
        </div>
    );
};

export default createSW;
