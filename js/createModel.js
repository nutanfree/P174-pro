AFRAME.registerComponent("createmodels", {
//create init function 
init : function(){
  this.getModels();
  this.createModel(model);
},










  getModels: function() {
    return fetch("js/models.json")
      .then(res => res.json())
      .then(data => data);
  },
  createModel: function(model) {
    var barcodeValue = model.barcode_value;
    var modelUrl = model.model_url;
    var modelName = model.model_name;

    var scene = document.querySelector("a-scene");

    var marker = document.createElement("a-marker");

    marker.setAttribute("id", `marker-${modelName}`);
    marker.setAttribute("type","barcode");
    marker.setAttribute("model_name",modelName);
    marker.setAttribute("value",barcodeValue);
    marker.setAttribute("markerhandler",{});
    scene.appendChild(marker);

    if(barcodeValue === 0) {
      var modelEL = document.createElement("a-entity");
      modelEL.setAttribute("id", `${modelName}`);
      modelEL.setAttribute("geometry", {
        primitve : "box",
        width : model.width,
        height : model.height
      });
      modelEL.setAttribute("position", model.position);
      modelEL.setAttribute("rotation", model.rotation);
      modelEL.setAttribute("material", {
        color : model.color
      });
      marker.appendChild(modelEL);
    } else {
      var modelEL = document.createElement("a-entity");
      modelEL.setAttribute("id", `${modelName}`);
      modelEL.setAttribute("gltf-model", `url(${modelUrl})`);
      modelEL.setAttribute("scale", model.scale);
      modelEL.setAttribute("position", model.position);
      modelEL.setAttribute("rotation", model.rotation);
      marker.append(modelEL);

    }
    
  }
   //add the code
});
