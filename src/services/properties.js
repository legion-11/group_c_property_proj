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

}

export default new PropertiesDataService();