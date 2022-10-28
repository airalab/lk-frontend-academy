import { Robonomics } from "robonomics-interface";
import keyring from "@polkadot/ui-keyring";
import AccountManager from "./accountManagerUi";

const config = {
  endpoint:
    process.env.NODE_ENV === "production"
      ? "wss://kusama.rpc.robonomics.network/"
      : "ws://127.0.0.1:9944/"
};
console.log(config);

const robonomics = new Robonomics(config);
robonomics.setAccountManager(new AccountManager(keyring));

export default robonomics;
