import * as THREE from 'three'
import { board } from './board'
import { lights, translate } from './global'
import { camera, renderer } from './main'
import { notation } from './square'

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
const b1 = new board(translate,4)
scene.add(b1.squares)

export {
  scene,
}