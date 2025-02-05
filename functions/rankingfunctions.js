

const isPressed = {current:false};


export const pressed = () => {

  return isPressed.current;
};

export const setPressed = (values) => {
    isPressed.current = values;
    console.log("PRESEE",isPressed.current);
}