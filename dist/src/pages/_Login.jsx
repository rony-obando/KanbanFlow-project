import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import _Image from '../assets/logo2.png'
import _Profile from '../assets/LogoN.png'
import appFirebase from '../credentials'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import '../css/Login.css'
import supabase from '../supabase';
import { UserContext } from '../contexts/userContext'; // Importa el UserProvider




const auth = getAuth(appFirebase)


const _Login = () => {

    const [data, setData] = useState(null); // Estado para almacenar los datos
    const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
    const { setUser } = useContext(UserContext);

    // Método para recuperar datos
    const fetchData = async (id,email) => {
        try {
            const { result } = await supabase
            .from('Users')
            .insert({ id: id, email: email })
            setData(result); // Guarda los datos en el estado
            setLoading(false); // Marca como completada la carga
        } catch (error) {
            console.error('Error al recuperar los datos:', error);
        }
    };




    useEffect(() => {
        // Aplica el fondo deseado al body
        document.body.style.backgroundColor = "#ffff"; // Color específico para la página de login
        // Limpieza: restaura el fondo original cuando el componente se desmonte
        return () => {
            document.body.style.backgroundColor = ""; // Restaura el fondo original
        };
    }, []);

    const [registering, setregistering] = useState(false)
    const navigate = useNavigate();

    const goToAboutPage = () => {
        navigate('/Home');
    };

    const functAutentication = async (e) => {
        e.preventDefault();
        const correo = e.target.email.value;
        const contra = e.target.password.value;

        if (registering) {
            try {
                const result = await createUserWithEmailAndPassword(auth, correo, contra);
                fetchData(result.user.uid,correo)
                goToAboutPage();
                setUser({ id: result.user.uid, email: correo });
                
            } catch (error) {
                alert("Asegurese que la contraseña tenga almenos 8 caracteres")
            }

        }
        else {
            try {
                const result = await signInWithEmailAndPassword(auth, correo, contra);
                goToAboutPage();
                setUser({ id: result.user.uid, email: correo });
            } catch (error) {
                alert("El correo o la contraseña son incorrectos" + error)
            }
        }
    }

    return (
        <div className="Login">
            <div className="row ">
                <div className="col-md-8">
                    <div className="padre">
                        <div className="card custom-width">
                            <div className="card-body shadow-lg">
                                <div className=" d-flex justify-content-center align-items-center toplogin">
                                    <img src={_Profile} className="style-profile" />
                                    <h1 className="text-profile">KanbanFlow</h1>
                                </div>
                                <h2 className="label1">{registering ? "Regístrate para continuar" : "Inicia sesión para continuar"}</h2>
                                <form onSubmit={functAutentication}>
                                    <input type="text" placeholder="Ingresar Email" className="textbox" id="email" />
                                    <input type="password" placeholder="Ingresar Contraseña" className="textbox" id="password" />
                                    <button className="btnForm">{registering ? "Regístrate" : "Inicia Sesión"}</button>
                                </form>
                                <div className="optios">
                                    <button className="Text" onClick={() => setregistering(!registering)}>{registering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}</button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default _Login