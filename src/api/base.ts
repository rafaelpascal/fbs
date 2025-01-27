import { AUTH_STORE_KEY } from "~/components/constants/general";
import { encryptionHandler } from "./encrypt";
import { SessionSchema, Session } from "./auth/schema";
import { CUSTOM_EVENT } from "~/components/constants/events";

export class BaseAPIService {
  protected static storeName = AUTH_STORE_KEY;

  protected static storeUser = (data: Session) => {
    const response = SessionSchema.safeParse(data);
    if (response.success) {
      const res = encryptionHandler({
        action: "encrypt",
        data: JSON.stringify(response.data),
      });

      if (typeof localStorage !== "undefined") {
        localStorage.setItem(this.storeName, res);
      }
    }
  };

  protected static handleUserSession = (): IsUndefined<Session> => {
    if (typeof localStorage !== "undefined") {
      const session = localStorage.getItem(this.storeName);

      if (!session) return;

      const data = encryptionHandler({ action: "decrypt", data: session });

      const res = SessionSchema.safeParse(JSON.parse(data));

      if (res.success) return res.data;
    }
  };

  protected static updateUserSession = (data: Partial<Session>) => {
    const session = this.handleUserSession();

    if (session) this.storeUser({ ...session, ...data });
    window.dispatchEvent(new Event(CUSTOM_EVENT.UPDATE_SESSION));
    return true;
  };

  protected static _logout = () => {
    if (typeof localStorage === "undefined") return;
    localStorage.removeItem(this.storeName);
    window.dispatchEvent(new Event(CUSTOM_EVENT.LOGOUT));
  };
}
