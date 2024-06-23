import * as THREE from 'three'
import { notation } from './square'

let phase_square_position = {x:0.0,y:0.0,z:0.0}
let up_down = 1 // 1 for up -1 for down
let right_left = 1 // 1 for right -1 for left



class attack_board{
  constructor(disposition_translate,board_translate,u_d,r_l,ph_square,original_owner){
    this.squareList = []
    this.squares = new THREE.Group()
    this.phase_square = ph_square // this is the the corner square notation from a fixed board
    this.original_owner = original_owner // true for white false for black

    up_down = u_d
    right_left = u_d
    
  }
}