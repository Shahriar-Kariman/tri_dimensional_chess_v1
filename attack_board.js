import * as THREE from 'three'
import { notation, square } from './square'
import { attack_board_translate, blackSquareMaterial, squareGeometry, whiteSquareMaterial } from './global'

let up_down = true // true for up false for down
let forward_backward = 1 // true for forward false for backward
let right_left = 1 // true for right false for left

const loop_condition_helper = (val,dependent_val)=>{
  // this is to help with the for loop
  if(dependent_val){
    return val<2
  }
  return val>-2
}

class attack_board{
  constructor(board_translate,f_b,r_l,u_d,ph_square,original_owner){
    this.squareList = []
    this.squares = new THREE.Group()
    this.phase_square = ph_square // this is the the corner square notation from a fixed board
    this.original_owner = original_owner // true for white false for black

    forward_backward = f_b
    let f_factor = forward_backward ? 1 : -1
    right_left = r_l
    let r_factor = right_left ? 1 : -1
    up_down = u_d
    
    for (let col = 0, isStartLight = this.original_owner; loop_condition_helper(col,right_left); col+=r_factor, isStartLight = !isStartLight) {
      let column = String.fromCharCode(this.phase_square.column.charCodeAt(0)+col)
      let obj
      for(let r = 0, is_light = isStartLight; loop_condition_helper(r,forward_backward); r+=f_factor, is_light = !is_light){
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
    up_down ?
      this.squares.position.y += 1.5
      :
      this.squares.position.y -= 1.5
  }
}

export {
  attack_board
}