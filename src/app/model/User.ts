import {Address} from "./Address";
import {Token} from "../service/authentication.service";

export class User {
  id = "";
  username = "";
  email = "";
  name: { firstname: string, lastname: string } = {
    firstname: "",
    lastname: ""
  };
  access_token?: Token = new Token
  address: Address = new Address();
}
