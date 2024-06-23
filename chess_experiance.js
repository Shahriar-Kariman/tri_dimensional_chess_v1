import * as THREE from 'three'
import { board } from './board'
import { lights, neutral_translate, black_translate, white_translate } from './global'
import { camera, renderer } from './main'
import { notation } from './square'
import { attack_board } from './attack_board'

const scene = new THREE.Scene()

// lights
scene.add(lights)

// custom geometry (stars)
const starsGemoetry = new THREE.BufferGeometry()
const starCount = 1400

const starPositions = new Float32Array(starCount * 3)

const starsGemoetryRadius = 70

for(let i = 0; i < starCount*3; i+=3){
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2*v-1)
  starPositions[i] = starsGemoetryRadius * Math.sin(phi) * Math.cos(theta)
  starPositions[i+1] = starsGemoetryRadius * Math.sin(phi) * Math.sin(theta)
  starPositions[i+2] = starsGemoetryRadius * Math.cos(phi)
}

starsGemoetry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))

const starsMaterial = new THREE.PointsMaterial()
starsMaterial.size = 0.2
starsMaterial.sizeAttenuation = true

const stars = new THREE.Points(starsGemoetry,starsMaterial)
stars.name = "stars"
scene.add(stars)

// boards
const b3 = new board(black_translate,4,5) // black board
const b2 = new board(neutral_translate,4,3) // neutral board
const b1 = new board(white_translate,4,1) // white board
scene.add(b1.squares, b2.squares, b3.squares)

// attackboards
const a_b1 = new attack_board(white_translate,-1,1,new notation('d',1),true)
scene.add(a_b1.squares)

export {
  scene,
}

// Raycaster
const raycaster = new THREE.Raycaster()

const all_square_objects = 
  b1.squares.children
  .concat(b2.squares.children)
  .concat(b3.squares.children)

const selector = (event) =>{
  const coords = new THREE.Vector2(
    (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    -((event.clientY / renderer.domElement.clientHeight) * 2 - 1),
  )
  raycaster.setFromCamera(coords, camera)

  const intersections = raycaster.intersectObjects(all_square_objects, true)

  if(intersections.length>0){
    console.log(intersections[0].object.name)
  }
}

document.addEventListener('mousedown',selector)