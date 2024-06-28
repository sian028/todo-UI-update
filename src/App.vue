<script setup lang="ts">
import { computed, onMounted, ref  } from "vue";
import { useTodoStore } from "./store/todo";
import {Todo_Row, Todo_Insert, Todo_Edit} from "./Types/todo.ts"
import {stagger_effect, edit_animation} from './animations/motion.ts'
import { useMotions } from '@vueuse/motion'

const motion = useMotions()
const todo = useTodoStore()

let EditObj = ref<Todo_Edit>({} as Todo_Edit)
let CreateTodo = ref<Todo_Insert>({} as Todo_Insert)
let show = ref<boolean>(false)
let show_create = ref<boolean>(false)

function Edit(obj:Todo_Row){
    if(obj){
      EditObj.value.id = obj.id
      EditObj.value.title = obj.title
      EditObj.value.description = obj.description
      show.value = true
    }else{
      alert("Fields are not entered.")
    }
}

function save_edit(){
  if(EditObj.value.title === "" || EditObj.value.description === ""){
   
  }else{
    todo.Edit_todo_by_id(EditObj.value)
  }
}

function Delete(id:string){
  if(id != ''){
    todo.Delete_Todo_By_Id(id)
  }
}

function createTodo(){
  if(CreateTodo.value){
    todo.Create_Todo(CreateTodo.value)
  }
}

onMounted(()=>{
  let store = useTodoStore()
  store.fetch_Todos()
})

let Todos = computed<Todo_Row[]>(()=>{
  return todo.get_Todos
})

</script>

<template>
  <SignUp/>
  <section class="w-full bg-slate-700 min-h-screen flex flex-col space-y-4 justify-center items-center py-8">

    <h1 class="font-mono text-4xl text-white">
      Todo App ✨
    </h1>

   <div class="w-full flex flex-col space-y-6 px-4">

     <div class="w-full flex justify-center items-center py-2">

        <button 
         @click="show_create = !show_create"
         class="border-2 rounded-full p-1.5 text-orange-600 bg-white border-orange-600
         transition-all ease-in-out duration-700 hover:rotate-180 hover:bg-orange-600 hover:text-white"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="size-8"
            >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>

     </div>

     <Transition
          :css="false"
          @leave="(_:any,done:any) => motion.div.leave(done)"
        >
          <div
           v-if="show"
           v-motion="'div'"
           :initial="edit_animation.initial"
           :enter="edit_animation.enter"
           :leave="edit_animation.leave"
           class="flex flex-col w-full bg-gray-50 rounded-md space-y-6 py-2 px-4 border-2 border-dashed"
          >
             <h1> edit</h1>

             <div class="w-full grid lg:grid-cols-2 grid-cols-1 gap-4">

              <input
               v-model="EditObj.title"
               class="py-1  rounded-md border-2 outline-none"
               type="text"
               >

               <input
               v-model="EditObj.description"
               class="py-1  rounded-md border-2 outline-none"
               type="text"
               >

             </div>

             <div class="w-full flex justify-between items-center px-8">

              <button
               @click="save_edit()"
              >
                Edit
              </button>

              <button
                  @click="show = !show"
                >
                  close
              </button>

             </div>
          </div>
     </Transition>

     <Transition
          :css="false"
          @leave="(_:any,done:any) => motion.div.leave(done)"
        >
          <div
           v-if="show_create"
           v-motion="'div'"
           :initial="edit_animation.initial"
           :enter="edit_animation.enter"
           :leave="edit_animation.leave"
           class="flex flex-col w-full bg-orange-600 rounded-md space-y-6 py-2 px-4 border-2 border-dashed text-stone-900 "
          >
             <h1>Create</h1>

             <div class="w-full grid lg:grid-cols-2 grid-cols-1 gap-4">

              <input
               v-model="CreateTodo.title"
               class="py-1  rounded-md border-2 outline-none"
               type="text"
               >

               <input
               v-model="CreateTodo.description"
               class="py-1  rounded-md border-2 outline-none"
               type="text"
               >

             </div>

             <div class="w-full flex justify-between items-center px-8">

              <button
               @click="createTodo()"
              >
                Add
              </button>

              <button
                  @click="show_create = !show_create"
                >
                  close
              </button>

             </div>
          </div>
     </Transition>

     <div class="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
       <div
        v-for="(todo, index) in Todos"
        :key="todo.id" 
        v-motion="stagger_effect(157^index*575,0,100)"
        class="bg-orange-600 rounded-md p-4 flex flex-col space-y-4 text-white"
       >
         <h1>{{ todo.title }}</h1>
 
         <p>{{ todo.description }}</p>
 
         <div class="w-full flex justify-between items-center px-4">
 
           <button
             @click="Edit(todo)"
           >
             <h1>
               edit
             </h1>
           </button>
 
           <button
            @click=(Delete(todo.id))
           >
             <h1>
               delete
             </h1>
           </button>
 
         </div>
 
        
 
       </div>
     </div>

   </div>

  </section>
</template>

