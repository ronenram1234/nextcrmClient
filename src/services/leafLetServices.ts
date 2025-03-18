import axios from "axios";

const api: string = `https://nominatim.openstreetmap.org/search?format=json&q=`;

export function getLatLon(address:string): Promise<any> {


    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${api}${address}`},
        headers: { 
          'User-Agent': 'mymap'
        }
      

      return axios.request(config)

}