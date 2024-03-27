import {createSlice} from "@reduxjs/toolkit"
import {toast} from "react-hot-toast"
import { json } from "react-router-dom";

const initialState={
    loading:false,
    cart: localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):[],
    total: localStorage.getItem("total")? JSON.parse(localStorage.getItem("total")):0,
    totalItems: localStorage.getItem("totelItems")?JSON.parse(localStorage.setItem("totalItems")): 0
};

const cartSlice=createSlice({
    name:"cart",
    initialState: initialState,
    reducers:{
       addToCart:(state,action)=>{
        const course=action.payload
        const index=state.cart.findIndex((item)=>item._id=== course.id)

        if(index>=0){
            toast.error("Course already in cart!")
            return
        }

        state.cart.push(course)
        state.totalItems++
        state.total=course.price

        localStorage.setItem("cart",JSON.stringify(state.cart))
        localStorage.setItem("total",JSON.stringify(state.total))
        localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

        toast.success("Course Added to Cart")
       },

       removeFromCart:(state,action)=>{
        const courseId=action.payload
        const index=state.cart.findIndex((item)=>item._id===courseId)
        if(index>=0){
            state.totalItems--
            state.total-=state.cart[index].price
            state.cart.splice(index,1)

            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("total",JSON.stringify(state.total))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

            toast.success("Crouse Removed from Cart")
        }
       }
    }
})

export const {addToCart,removeFromCart}=cartSlice.actions
export default cartSlice.reducer