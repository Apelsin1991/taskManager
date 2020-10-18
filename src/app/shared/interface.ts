export interface Task {
    title: string;
    text: string;
    date: string;
    id?: number;
    order?: number;
    completed?: boolean;
}
