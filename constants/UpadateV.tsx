import { API_URL } from "../types/Urls";


export const UpdateValue = async (values: string[] | any,) => {

    const result = await fetch(`${API_URL}Update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    }).then((res) => res.json())
    console.log(result);


}