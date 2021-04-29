const DRAG_ELEMENTS = document.querySelectorAll('.drag')
const CONTAINER = document.querySelector('.container') //@TODO: make container (stack) draggie

let highestIndex = 1
let draggies = []
let dropElem = null
let isDragging = false

DRAG_ELEMENTS.forEach(dragElem => {
  const DRAGGIE = new Draggabilly(dragElem, {
    containment: CONTAINER
  })
  
  draggies.push(DRAGGIE);
  
  DRAGGIE.on('dragStart', event => {
    dragElem.style.zIndex = highestIndex
    dragElem.classList.add('dragging')
    CONTAINER.classList.add('dragging')
    isDragging = true
    highestIndex ++
  })
  
  DRAGGIE.on('dragEnd', event => {
    dragElem.classList.remove('dragging')
    CONTAINER.classList.remove('dragging')
    isDragging = false
    
    // If images are overlapping, stack them
    if(dropElem) {
      let randomAngle = -10 + (Math.random() * 20);
      Object.assign(dragElem.style, {
        left: `${dropElem.offsetLeft}px`,
        top: `${dropElem.offsetTop}px`,
        transform: `rotate(${randomAngle}deg)`
      })
      
      dragElem.classList.add('dropped');
    } else {
      dragElem.classList.remove('dropped');
    }
  })
  
  dragElem.addEventListener('mouseover', event => {
    if(isDragging){
      dropElem = dragElem
    }
  })
  
  dragElem.addEventListener('mouseout', event => {
    if(isDragging){
      dropElem = null
    }
  })
})