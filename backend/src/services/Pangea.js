import {
    PangeaConfig,
    AuthNService,
    RedactService
} from "pangea-node-sdk";

import dotenv from "dotenv";

dotenv.config();

const domain = process.env.PANGEA_DOMAIN;
const config = new PangeaConfig({domain});


const getAuthentication = async () => {
    const PANGEA_AUTHN_TOKEN = process.env.PANGEA_AUTHN_TOKEN;
    return new AuthNService(PANGEA_AUTHN_TOKEN, config);
};

const getRedact = async () => {
    const PANGEA_REDACT_TOKEN = process.env.PANGEA_REDACT_TOKEN;
    const redactService = new RedactService(PANGEA_REDACT_TOKEN, config);
    return redactService;
};


export default {
    getAuthentication,
    getRedact,
};