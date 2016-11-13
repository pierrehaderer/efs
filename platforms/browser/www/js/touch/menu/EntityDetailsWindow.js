function EntityDetailsWindow(entity) {
    console.log("Opening details of entity " + entity);
    Window.call(this, "entityDetails", "UI/entity/details_background", 50, 10);
    this.addElement(entity.portrait, "", 10, 10);
    this.addElement(entity.competences, "", 60, 10);
    this.addElement("UI/entity/description_background", entity.description, 10, 60);
}