import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import p5 from 'p5'

import { Network } from 'vt-neural-network'

import './home.scss'

const X_DISTANCE_LAYERS = 100
const Y_DISTANCE_NEURONS = 60
const X_START = 100
const Y_START = 100
const NEURON_SIZE = 50

const drawNetwork = (network, p) => {
  p.fill(0, 0, 0, 0)

  let xLayer = X_START

  p.stroke(255, 255, 255)
  p.strokeWeight(4)

  network.layers.forEach(layer => {
    drawLayer(layer, xLayer, p)
    xLayer += X_DISTANCE_LAYERS
  })

  drawConnections(network, p)
}

const drawConnections = (network, p) => {
  let xPos = X_START
  let yPos = Y_START
  const xOffset = X_DISTANCE_LAYERS
  const yOffset = Y_DISTANCE_NEURONS
  let nextY = yPos

  for (var i = 0; i < network.layers.length; i++) {
    // We reset yPos each layer
    yPos = Y_START
    nextY = yPos
    for (var j = 0; j < network.layers[i].length; j++) {
      // Draw all output connections from a neuron
      const neuron = network.layers[i][j]

      // eslint-disable-next-line no-loop-func
      neuron.outputConnections.forEach(conn => {
        p.stroke('rgba(255%,255%,100%,0.5)')
        p.strokeWeight(2 * conn.weight)
        p.line(xPos, yPos, xPos + xOffset, nextY)
        nextY += yOffset
      })

      // After finishing we pass to the bottom neuron
      yPos += yOffset
      nextY = Y_START
    }
    xPos += xOffset
  }
}

const drawLayer = (layer, xPos, p) => {
  let yPos = Y_START
  let yOffset = Y_DISTANCE_NEURONS

  layer.forEach(neuron => {
    p.fill(14, 14, 0, 0)
    p.circle(xPos, yPos, NEURON_SIZE, NEURON_SIZE)
    yPos += yOffset
  })
}

class Home extends React.Component {
  sketch = null
  network = null
  canvas = null
  p = null
  renderNetwork() {
    const self = this
    let sketch = function(p) {
      p.setup = function() {
        p.createCanvas(660, 800)
        // Setup done
      }

      p.mouseMoved = () => {
        // if (sc && sc.mouseMoved) {
        //   sc.mouseMoved(p)
        // }
      }

      p.draw = () => {
        p.background(51)
        drawNetwork(self.network.toJSON(), p)
      }
    }

    // Empty old canvas
    window.document.getElementById('canvas').innerHTML = ''

    // Render it
    this.sketch = new p5(sketch, 'canvas')
  }

  trainingData = [
    {
      input: [0, 0],
      output: [0]
    },
    {
      input: [0, 1],
      output: [1]
    },
    {
      input: [1, 0],
      output: [1]
    },
    {
      input: [1, 1],
      output: [1]
    }
  ]

  initNetwork() {
    // Create the network
    this.network = new Network([2, 10, 10, 1])
    console.log(this.network.toJSON())
    // Set a learning rate
    const learningRate = 0.3
    this.network.setLearningRate(learningRate)
  }

  trainNetwork() {
    // Train the network
    console.log('Training...')
    for (var i = 0; i < 1000; i++) {
      const trainingItem = this.trainingData[
        Math.floor(Math.random() * this.trainingData.length)
      ]
      // Randomly train
      this.network.train(trainingItem.input, trainingItem.output)
    }
    console.log('trained')
    this.renderNetwork()
  }
  componentDidMount() {
    this.initNetwork()
    // First screen
    this.renderNetwork()
  }
  deleteRender() {
    this.sketch.remove()
  }
  render() {
    return (
      <div className="home">
        <div className="render">
          <div className="canvas-container">
            <div id="canvas"></div>
          </div>
        </div>
        <div className="controls">
          <div className="train" onClick={this.trainNetwork.bind(this)}>
            <FontAwesomeIcon icon={faPlay} />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
