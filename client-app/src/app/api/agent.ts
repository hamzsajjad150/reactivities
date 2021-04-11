import axios, {AxiosResponse} from 'axios';
import { error } from 'node:console';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Activity } from '../models/activity';
import { store } from '../stores/store';

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
        await sleep(1000);
        return response;
}, (error: any) => {
    const {data, status, config} = error.response!;
    switch(status){
        case 400:
            //checking the data obj is a string obj
            if(typeof data === 'string'){
                toast.error(data);
            }
            //checking if the method used for the response & checking if it has a property
            //if this condition is then we will redirect them to not found page
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                history.push('/not-found');
            }
            //we check if the data has an error arry inside it
            if (data.errors) {
                //setting an empty arry that will have all the error arry content
                const modalStateErrors = [];
                // loop through the arry and populating the empty arry
                for(const key in data.errors){
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }// end of if
                }// end of for
                //throwing it back to the componement
                //.flat will give use just string instead of array
                throw modalStateErrors.flat();
            }// end of if
            
            
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            //pushing an object in the history obj to redirect
            // we DONT! have a not found component so it will redirect to the component not found
            history.push('/not-found');
            break;
        case 500:
            // we set the data of our error observable
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    //this is return statement that will be passed in the middleware
    return Promise.reject(error);
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