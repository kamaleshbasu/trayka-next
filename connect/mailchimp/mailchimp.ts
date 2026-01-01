// @ts-ignore
import Mailchimp from "@mailchimp/mailchimp_marketing";
import crypto from "crypto";

const apiKey = process.env.MAILCHIMP_API_KEY!;
const server = process.env.MAILCHIMP_REGION!;
const listId = process.env.MAILCHIMP_LIST_ID!;

Mailchimp.setConfig({
    apiKey,
    server,
});

export default Mailchimp;
export const subscriberHash = (email: string) => crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
export {listId};