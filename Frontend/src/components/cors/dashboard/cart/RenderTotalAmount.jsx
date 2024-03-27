import React from 'react'
import { useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton'

function RenderTotalAmount() {
  const {total,cart}=useSelector((state)=>state.cart)

  function handleBuyCourse(){
    const courses=cart.map((course)=>course._id)
  }
  return (
    <div>
        <p>Total:</p>
        <p>Rs. {total}</p>
        <IconButton
          text={"Buy Now"}
          onClick={handleBuyCourse}
        />
    </div>
  )
}

export default RenderTotalAmount