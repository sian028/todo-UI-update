import {defineStore} from 'pinia'


export const useThemeStore = defineStore('',{
    
    state:()=>({
        theme: false as boolean
    }),

    getters:{
        get_theme: (state) => state.theme,
    },

    actions:{
        changeTheme(){
            this.theme = !this.theme
        }
    }
})