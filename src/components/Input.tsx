import { useState } from "react";

export const TextInput = ({id, is_readonly, value, onChange, onCommit,}:{
    id:string, 
    is_readonly:boolean,
    value:string,
    onChange:(value:string) =>void,
    onCommit:() =>void
}) => {
    const [isComposition, setComposition] = useState(false);
    return (
        <input type="text" 
        id={`task-${id}`} 
        readOnly={is_readonly} 
        value={value} 
        onChange={(e) => {onChange(e.target.value)}}
        onKeyDown={(e) => {
            if(e.key == "Enter" && !isComposition){
                onCommit();
                (e.target as HTMLInputElement).blur();
            }
        }}
        onBlur={() => {onCommit()}}
        onCompositionStart={() => {setComposition(true);}}
        onCompositionEnd={() => {setComposition(false);}}
        />
    )
}