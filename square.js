
class notation{
  constructor(column, row){
    return {column, row}
  }
}

class square{
  constructor(column, row, is_light, object, translate){
    this.square_notation = new notation(column,row)
    this.is_light = is_light
    this.object = object
    const {x,z,y} = translate(column, row)
    this.object.position.x = x
    this.object.position.z = z
    this.object.position.y = y
    this.object.name = column+row
  }
}

class corner_square extends square{
  constructor(
    column, row, is_light, object, translate,
    f_b,r_l
  ){
    super(column,row,is_light,object,translate)
    this.f_b = f_b
    this.r_l = r_l
  }
}

export {
  notation,
  square,
  corner_square
}