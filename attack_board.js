import * as THREE from 'three'
import { notation, square } from './square'
import { attack_board_translate, blackSquareMaterial, squareGeometry, whiteSquareMaterial } from './global'

let phase_square_position = {x:0.0,y:0.0,z:0.0}
let forward_backward = 1 // 1 for up -1 for down
let right_left = 1 // 1 for right -1 for left

const loop_condition_helper = (val,sign_dependent_val)=>{
  // this is to help with the for loop
  if(sign_dependent_val>0){
    return val<2
  }
  return val>-2
}

class attack_board{
  constructor(board_translate,f_b,r_l,ph_square,original_owner){
    this.squareList = []
    this.squares = new THREE.Group()
    this.phase_square = ph_square // this is the the corner square notation from a fixed board
    this.original_owner = original_owner // true for white false for black

    forward_backward = f_b
    right_left = r_l
    console.log(forward_backward,right_left)
    
    for (let col = 0, isStartLight = this.original_owner; loop_condition_helper(col,right_left); col+=right_left, isStartLight = !isStartLight) {
      let column = String.fromCharCode(this.phase_square.column.charCodeAt(0)+col)
      let obj
      for(let r = 0, is_light = isStartLight; loop_condition_helper(r,forward_backward); r+=forward_backward, is_light = !is_light){
        console.log(is_light)
        let temp_r = r+this.phase_square.row
        is_light ?
          obj = new THREE.Mesh(squareGeometry,whiteSquareMaterial)
          :
          obj = new THREE.Mesh(squareGeometry,blackSquareMaterial)
        const s = new square(column, temp_r, is_light, obj, board_translate)
        this.squareList.push(s)
        this.squares.add(s.object)
      }
    }
    console.log(this.squareList)
  }
}

export {
  attack_board
}