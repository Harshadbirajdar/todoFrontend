import AxiosInstances from "../helper/AxiosInstance"

export const getAllTodo = () => {
    return AxiosInstances.get('/todo')
}

export const addTodo = (title: string) => {
    return AxiosInstances.post("/todo", { title })
}

export const getTodoById = (id: string | string[] | undefined) => {
    return AxiosInstances.get(`/todo/${id}`)
}

export const addTask = (id: string | string[] | undefined, task: string) => {
    return AxiosInstances.post(`/todo/task/${id}`, { tasks: task })
}

export const deleteTask = (id: string | string[] | undefined, task: string) => {
    return AxiosInstances.put(`/todo/task/${id}`, { tasks: task })

}

export const deleteTodo = (id: string | string[] | undefined) => {
    return AxiosInstances.delete(`/todo/${id}`)
}