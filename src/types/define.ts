type TaskType = {
    id: number,
    name: string,
    is_checked: boolean,
    created_at: string,
    updated_at: string,
}

type NextTaskType = {
    id: string,
    name: string,
    is_checked: boolean,
    is_readonly: boolean,
}

type LoginRequest = {
    email: string,
    password: string
}


type SignupRequest = {
    email: string,
    username: string,
    password1: string,
    password2:string
}