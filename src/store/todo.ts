import {defineStore} from "pinia"
import { Todo_Edit, Todo_Insert, Todo_Row } from '../Types/todo'
import  axios from 'axios'

const api_url:string = ''+import.meta.env.VITE_TODO

export const useTodoStore = defineStore('useTodoStore',{
    state:()=>({
        Todos: [] as Todo_Row[],
        todo: {} as Todo_Row
    }),

    getters:{
        get_Todos: (state) => state.Todos,
        get_todo: (state) => state.todo
    },

    actions:{

        async fetch_Todos(){

            try {

                let result = await axios.get(`${api_url}todos`)

                if(result.status === 200){
                    this.Todos = result.data
                }
                
            } catch (error:any) {
               console.error(error)
            }

        },

        async fetch_todo_by_Id(id:string){

            try {

                let result = await axios.get(`${api_url}byId`,{
                    data:{ id: `${id}` }
                })

                if(result.status === 200){ this.todo = result.data }
                
            } catch (error:any) {
                console.error(error)
            }
        },


        async Edit_todo_by_id(obj:Todo_Edit){
            try {

                let result = await axios.patch(`${api_url}edit`,obj)
                if(result.status === 204){  this.fetch_Todos() }
                
            } catch (error:any) {
                console.error(error)
            }
        },


        async Create_Todo(obj:Todo_Insert){
            try {

                let result = await axios.post(`${api_url}add`,obj)

                if(result.status === 201){ 
                    this.fetch_Todos()
                }
                
            } catch (error:any) {
                console.error(error)
            }
        },

        async Delete_Todo_By_Id(id:string){
           
            try {

                let result = await axios.delete(`${api_url}delete`,{
                    data:{ id: `${id}` }
                })

                if(result.status === 204){ 
                    this.fetch_Todos()
                }
                
            } catch (error:any) {
                console.error(error)
            }
        },
        
    }
})