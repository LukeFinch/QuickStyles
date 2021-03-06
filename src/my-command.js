sketch = context.api()
doc = context.document;
currentPage = doc.currentPage();
font = [];
colours = [];

function addArtboard(page, name) {
    var artboard = MSArtboardGroup.new();
    frame = artboard.frame();
    frame.setWidth(4000);
    frame.setHeight(4000);
    frame.setConstrainProportions(false);
    page.addLayers([artboard]);
    artboard.setName(name);
    return artboard;
}

if(context.api().selectedDocument.selectedLayers.length == 0){context.document.showMessage('You need to select some text and colours!')}
else{
var board = new addArtboard(currentPage, "Quick Text Styles")

function addTextLayer (target, label, font, colour,i, j) {
    var textLayer = MSTextLayer.new();
    console.log(textLayer);
    textLayer.setStringValue("Example text, im a pretty unicorn")
    textLayer.setName(label)
    textLayer.setFont(font)
    textLayer.setTextColor(colour)
    textLayer.setTextBehaviour(1)
    textLayer.absoluteRect().setWidth(500)
    textLayer.absoluteRect().setHeight(200)
    textLayer.absoluteRect().setRulerX(i*600)
    textLayer.absoluteRect().setRulerY(j*(textLayer.frame().height()+50))
    target.addLayers([textLayer]);
    return textLayer;
  };



context.api().selectedDocument.selectedLayers.iterate(layer => {


  //If the selection contains groups, this **should** loop through them, hopefully.

if(layer['_object'].isKindOfClass(MSLayerGroup)){
  for(var child = 0; child < layer['_object'].children().length; child++){

    pushLayer(layer['_object'].children()[child])
  }
}
else(pushLayer(layer['_object']))


function pushLayer(l){

if(l.isKindOfClass(MSTextLayer)){
  font.push({
  "font": l.font(),
  "text": l.name(),
})
}
if(l.isKindOfClass(MSShapeGroup)){
            colours.push({
                "colour":l.style().fills()[0].color(),
                "name":l.name(),
                }
            )}
}

})

for(var i = 0; i < colours.length; i++){
for(var j = 0; j < font.length; j++){
addTextLayer(board, font[j].text + "/" + colours[i].name, font[j].font, colours[i].colour, i, j)
}}
board.resizeToFitChildren();
} //end of else
