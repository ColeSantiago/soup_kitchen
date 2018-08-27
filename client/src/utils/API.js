import axios from "axios";

// directs the client side info and functions to the server
export default {
  createMember: function(newMemberData) {
    return axios.post("/api/kitchen/signup", newMemberData);
  }
};