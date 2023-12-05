import React, {useState} from "react";
import {Formulario,Label,Terminos,ContenedorBotonCentrado,Boton,MensajeExito,MensajeEror,} from "./elementos/formularios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Input from "./componentes/input";

const App = () => {
  const [usuario, cambiarUsuario] = useState({campo: '', valido: null});
  const [nombre, cambiarNombre] = useState({campo: '', valido: null});
  const [password, cambiarPassword] = useState({campo: '', valido: null});
  const [password2, cambiarPassword2] = useState({campo: '', valido: null});
  const [correo, cambiarCorreo] = useState({campo: '', valido: null});
  const [telefono, cambiarTelefono] = useState({campo: '', valido: null});
  const [terminos, cambiarTerminos] = useState(false);
  const [formularioValido, cambiarFormularioValido] = useState(null);

  const expresiones = {
		usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		password: /^.{4,12}$/, // 4 a 12 digitos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^\d{7,14}$/ // 7 a 14 numeros.
	}

  const ValidarPassword2 = () => {
      if (password.campo.length > 0){
          if(password.campo !== password2.campo){
              cambiarPassword2((prevState) => {
                return {...prevState, valido: 'false'}
              });
          } else {
            cambiarPassword2((prevState) => {
              return {...prevState, valido: 'true'}
            }); 
          }
      }    
  }

  const onchangeTerminos = (e) => {
    cambiarTerminos(e.target.checked);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(
      usuario.valido === 'true' && 
      nombre.valido === 'true' && 
      password.valido === 'true' && 
      password2.valido === 'true' && 
      correo.valido === 'true' && 
      telefono.valido === 'true' && 
      terminos
      ){

        cambiarFormularioValido(true);
        cambiarUsuario({campo: '', valido: ''});
        cambiarNombre({campo: '', valido: null});
        cambiarPassword({campo: '', valido: null});
        cambiarPassword2({campo: '', valido: 'null'});
        cambiarCorreo({campo: '', valido: null});
        cambiarTelefono({campo: '', valido: null});
      }else{
          cambiarFormularioValido(false);
      }
  }

  return (
    <main>
      <Formulario action="" onSubmit={onSubmit}>
        <Input
          estado={usuario}
          cambiarEstado={cambiarUsuario}
          tipo="text"
          label="Usuario"
          placeholder="Lupe219"
          leyendaError="El usuario tiene que ser mayor a 4 digitos y menor de 16 digitos"
          name="Usuario"
          expresionRegular={expresiones.usuario}
        />
        <Input
          estado={nombre}
          cambiarEstado={cambiarNombre}
          tipo="text"
          label="Nombre"
          placeholder="Guadalupe"
          leyendaError="el nombre solo puede contener letras y espacios"
          name="Nombre"
          expresionRegular={expresiones.nombre}
        />
        <Input
          estado={password}
          cambiarEstado={cambiarPassword}
          tipo="password"
          label="Contraseña"
          leyendaError="La contraseña tiene que ser de 4 a 12 digitos"
          name="password1"
          expresionRegular={expresiones.password}
        />
        <Input
          estado={password2}
          cambiarEstado={cambiarPassword2}
          tipo="password"
          label="Repetir Contraseña"
          leyendaError="La contraseña deben de ser iguales"
          name="password2"
          expresionRegular={expresiones.password}
          funcion={ValidarPassword2}
        />
        <Input
          estado={correo}
          cambiarEstado={cambiarCorreo}
          tipo="email"
          label="Correo"
          placeholder="correo@gmail.com"
          leyendaError="el corre tienes que llevar @gmail.com"
          name="Correo"
          expresionRegular={expresiones.correo}
        />
        <Input
          estado={telefono}
          cambiarEstado={cambiarTelefono}
          tipo="text"
          label="Telefono"
          placeholder="51968527"
          leyendaError="el telefeno solo puede contener numeros"
          name="Telefono"
          expresionRegular={expresiones.telefono}
        />
        
        <Terminos>
          <Label>
            <input type="checkbox" name="terminos" id="terminos" checked={terminos} onChange={onchangeTerminos} />
            Acepto los terminos y condiciones
          </Label>
        </Terminos>
        {formularioValido === false && (
          <MensajeEror>
            <p>
              <FontAwesomeIcon icon={faTriangleExclamation} />
              <b>Error:</b> Por favor rellena l formulario correctamente.
            </p>
          </MensajeEror>
        )}
        <ContenedorBotonCentrado>
          <Boton type="submit">Enviar</Boton>
          {formularioValido === true && <MensajeExito>El formulario se envio exitosamente!</MensajeExito>}
        </ContenedorBotonCentrado>
      </Formulario>
    </main>
  );
};

export default App;
