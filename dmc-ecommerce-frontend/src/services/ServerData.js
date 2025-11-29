import ApiEndpoint from "./ApiEndpoint";
import Server from "./callServer";

const serverData = {
  allCategories: async (filters = {}) => {
    return Server.get(ApiEndpoint.getAllCategories, filters);
  },
  
};

export default serverData;
