export interface Task {
    title: string
    text: string
    date: string
    id?: string
    order?: number
}

export interface FbCreateResponse {
    name: string
}

export interface User {
    email: string
    password: string
    returnSecureToken?: boolean
}

export interface FbAuthResponse {
    idToken: string
    expiresIn: string
}
