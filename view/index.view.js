import { Config } from "../model/service/config.js";
import { SelectDOM } from "../model/selectDOM.mjs";
/**
 * Codigo principal que hace uso de la clase modelo(selectDOM) para crear elementos
 * @author Juan Camilo Castañeda Castro
 * @version 1.0.0
 */
const component = new SelectDOM(); //Se crea instancia de la clase SelectDOM
/**
 * Metodo para obtener todos los datos de la API
 */
const getAll = async () => {
  try {
    let res = await fetch(`${Config.API_FAKE}`), // Endpoint para la consulta
      json = await res.json(); // Se convierte la respuesta a json

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    /**
     * Se recorre el objeto y se setea el respectivo valor a cada elemento del DOM
     */
    json.forEach((el) => {
      component.template.querySelector(".name").textContent = el.nombre;
      component.template.querySelector(".nivel").textContent = el.nivel;
      component.template.querySelector(".edit").dataset.id = el.id;
      component.template.querySelector(".edit").dataset.name = el.nombre;
      component.template.querySelector(".edit").dataset.constellation = el.nivel;
      component.template.querySelector(".delete").dataset.id = el.id;

      let $clone = document.importNode(component.template, true);
      component.fragment.appendChild($clone); //se inyecta el fragmento al DOM
    });

    component.table.querySelector("tbody").appendChild(component.fragment);
  } catch (err) {
    let message = err.statusText || "Ocurrió un error";
    component.table.insertAdjacentHTML(
      "afterend",
      `<p><b>Error ${err.status}: ${message}</b></p>` // Mensaje de error que se pintara en el DOM
    );
  }
};

document.addEventListener("DOMContentLoaded", getAll); //evento para obtener todos los datos del API

/**
 * Funcion asincrona donde se edita y agrega un personaje a la Base de Datos(evento)
 */
document.addEventListener("submit", async (e) => {
  if (e.target === component.form) {
    e.preventDefault();

    if (!e.target.id.value) {
      //Peticion POST para crear un personaje
      try {
        let options = {  //Objeto con la peticion 
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ // Valores de la API
              nombre: e.target.nombre.value,
              nivel: e.target.nivel.value,
            }),
          },
          res = await fetch(`${Config.API_FAKE}`, options), //Endpoint para la conexion
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        component.form.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}: ${message}</b></p>`
        );
      }
    } else {
      //Peticion UPDATE para actualizar un personaje
      try {
        let options = { //Objeto con la peticion
            method: "PUT",
            headers: {
              "Content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
              nombre: e.target.nombre.value,
              nivel: e.target.nivel.value,
            }),
          },
          res = await fetch(`${Config.API_FAKE}${e.target.id.value}`, options),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        component.form.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}: ${message}</b></p>`
        );
      }
    }
  }
});

/**
 * Funcion asincrona donde se edita y elimina un personaje a la Base de Datos(evento)
 */

document.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    component.title.textContent = "Editar Santo";
    component.form.nombre.value = e.target.dataset.name;
    component.form.nivel.value = e.target.dataset.constellation;
    component.form.id.value = e.target.dataset.id;
  }

  if (e.target.matches(".delete")) {
    let isDelete = confirm(
      `¿Estás seguro de eliminar el id ${e.target.dataset.id}?` //Mensaje de confirmacion para eliminar
    );

    if (isDelete) {
      //Peticion DELETE para eliminar un personaje
      try {
        let options = { //Objeto con la peticion a realizar
            method: "DELETE",
            headers: {
              "Content-type": "application/json; charset=utf-8",
            },
          },
          res = await fetch(`${Config.API_FAKE}${e.target.dataset.id}`,options), //Endpoint para eliminar personaje
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurrió un error";
        alert(`Error ${err.status}: ${message}`);
      }
    }
  }
 }
);
