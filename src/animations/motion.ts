export const stagger_effect = (_delay:number,y_axes:number, x_axes:number) => {
    let motion = {
        initial:{
            x:x_axes || 0,
            y:y_axes || 0,
            opacity:0
        },
        enter:{
            y:0,
            x:0,
            opacity:1,
            transition:{
                delay: _delay,
                type:'spring',
                stiffness:75
            }
        }
    }

    return motion
}

export const edit_animation = {
    initial:{
        opacity:0,
        x:-100
    },
    enter:{
        opacity:1,
        x:0,
        transition:{
            delay: 125,
            type:'spring',
            stiffness:75
        }
    },
    leave:{
        opacity:0,
        x:100,
        transition:{
            delay: 125,
            type:'spring',
            stiffness:75
        }
    }
}