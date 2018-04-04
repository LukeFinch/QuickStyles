sketch = context.api()
doc = context.document;
sel = context.selection;
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

if(sel == 0){doc.showMessage('You need to select some text and colours!')}
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

if(layer['_object'].isKindOfClass(MSTextLayer)){
            font.push({
            "font": layer['_object'].font(),
            "text": layer['_object'].name(),
            }
            )}
if(layer['_object'].isKindOfClass(MSShapeGroup)){
            colours.push({
                "colour":layer['_object'].style().fills()[0].color(),
                "name":layer['_object'].name(),
                }
            )}
})

for(var i = 0; i < colours.length; i++){
for(var j = 0; j < font.length; j++){
addTextLayer(board, font[j].text + "/" + colours[i].name, font[j].font, colours[i].colour, i, j)
}}
board.resizeToFitChildren();

} //end of else
