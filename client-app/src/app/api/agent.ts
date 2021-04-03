import axios, {AxiosResponse} from 'axios';
import { error } from 'node:console';
import { Activity } from '../models/activity';

//this method will add some sleep to our application
//delay is the new number of miliseecond
const sleep = (delay: number) =>{
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';


// using axios interceptors (these are like middleware)
//this will be triggered when our APi returns a response
axios.interceptors.response.use(async response => {
    // then our sleep function will be returned
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

//this const will get use the response from the request without using the response.
//it will excute this function
// adding a generic type for our responsebody
//<T> means makes it a generic type (we can change the type to any while we use this var)
const responseBody = <T> (response: AxiosResponse<T>) => response.data;

//this obj will store the common request (CRUD) 
const requests = {
    //                                  in then its same as passing the function that returns the response.data
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

//this obj store the request for our Activities (CRUD for activities)
const Activities = {
    // we are calling the request.get because our url will be auto added with the baseurL
    // and our Activities.list will return request.get.then
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`)
}

//this is the wrapper obj for our activities

const agent = {
    Activities
}

//exporting just the agent
export default agent;