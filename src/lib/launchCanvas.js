import p5 from 'p5'

export const init = (DOMID, sc) => {
  let sketch = function(p) {
    p.setup = function() {
      p.createCanvas(1200, 1200)
      if (sc && sc.init) {
        sc.init(p)
      }
      // Setup done
    }

    p.mouseClicked = () => {
      if (sc && sc.mouseClicked) {
        sc.mouseClicked(p)
      }
    }

    p.mouseMoved = () => {
      if (sc && sc.mouseMoved) {
        sc.mouseMoved(p)
      }
    }

    p.draw = () => {
      p.background(51)
      if (sc) {
        sc.render(p)
      }
    }
  }

  // Empty old canvas
  //  window.document.getElementById(DOMID).innerHTML = ''

  // Render it
  return new p5(sketch, DOMID)
}
