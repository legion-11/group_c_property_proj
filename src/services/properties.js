import http from "../http-common";

class PropertiesDataService {

  types = {
    notForSaleOrRent: 0,
    forSale: 1,
    forRent: 3
  }

  getPropertiesByType(type) {
    return http.get(`/getProperties?type=${type}`);
  }

  addProperty(data){
    return  http.post("/addProperty", data, { withCredentials: true })
  }

  setForRent(data){
    return  http.put("/setPropertyForRent", data, { withCredentials: true })
  }

  setForSale(data){
    return  http.put("/setPropertyForSale", data, { withCredentials: true })
  }

  getPropertyById(id){
    return http.get(`/property/${id}`,  { withCredentials: true })
  }
}

export default new PropertiesDataService();