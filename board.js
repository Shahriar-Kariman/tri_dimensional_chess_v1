import * as THREE from 'three'
import { blackSquareMaterial, squareGeometry, whiteSquareMaterial } from './global'
import { square } from './square'

class board{
  constructor(translate,size,start_row){
    this.squareList = []
    this.squares = new THREE.Group()
    
    const row_increment = start_row-1
    for(let col = 0, isStartLight = false; col < size; col++, isStartLight = !isStartLight){
      let column = String.fromCharCode(col+97)
      let obj
      for(let r = 0+row_increment, is_light = isStartLight; r<size+row_increment; r++, is_light = !is_light){
        let row = r+1
        is_light ?
          obj = new THREE.Mesh(squareGeometry,whiteSquareMaterial)
          :
          obj = new THREE.Mesh(squareGeometry,blackSquareMaterial)
        const s = new square(column, row, is_light, obj, translate)
        this.squareList.push(s)
        this.squares.add(s.object)
      }
    }
  }
}

export {
  board
}