import * as THREE from 'three'
import { blackSquareMaterial, squareGeometry, whiteSquareMaterial } from './global'
import { corner_square, square } from './square'

class board{
  constructor(translate,size,start_row){
    this.squareList = []
    this.squares = new THREE.Group()
    this.cornerSquares = []
    
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
        let s = null
        if(
          (col===0 || col===size-1)
          &&
          (r===row_increment || r===size+row_increment-1)
        ){
          s = new corner_square(
            column, row, is_light, obj, translate,
            r===row_increment ? false : true,
            col===0 ? false : true,
          )
          this.cornerSquares.push(s)
        }
        else{
          s = new square(column, row, is_light, obj, translate)
        }
        this.squareList.push(s)
        this.squares.add(s.object)
      }
    }
  }
}

export {
  board
}