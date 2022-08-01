/**
 * Clase modelo para seleccionar componentes del DOM
 * @autor - Juan Camilo Castañeda
 */
export class SelectDOM {
  table;
  form;
  title;
  template;
  fragment;
  /**
   * Constructo de clase para iniciar valiables
   */
  constructor() {
    this.table = document.querySelector(".crud-table");
    this.form = document.querySelector(".crud-form");
    this.title = document.querySelector(".crud-title");
    this.template = document.getElementById("crud-template").content;
    this.fragment = document.createDocumentFragment();
  }
  get table() {
    return this.table;
  }
  get form() {
    return this.form;
  }
  get title() {
    return this.title;
  }
  get template() {
    return this.template;
  }
  get fragment() {
    return this.fragment;
  }
}
