import axios from "axios";

const PLACE_API_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
    headers : {
        'Content-type':'application/json',
        'X-Goog-Api-Key': import.meta.env.PLACE_API_KEY,
        'X-Goog-FieldMask':[
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

export const getPlaceDetails = (data) => {
    axios.post(PLACE_API_URL,data,config);
}