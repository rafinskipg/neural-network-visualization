export const render = network => p => {
  p.fill(0, 0, 0, 0)
  p.stroke(255, 255, 255)
  p.rect(20, 20, 100, 50)
  p.textSize(32)
  p.text('Back', 30, 50)
  p.translate(30, 80)

  let xLayer = 50
  let offset = 50

  network.layers.forEach(layer => {
    drawLayer(layer, xLayer, p)
    xLayer += offset
  })
}

const drawLayer = (layer, xPos, p) => {
  layer.neurons.forEach(neuron => {
    p.fill(14, 14, 0, 0)
    p.circle(xPos, 15, 15, 15)
  })
}
