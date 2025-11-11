import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { IJSON, isJSONString } from "reviewed";

export const retrieve = async (
  secret: string,
  region: string,
): Promise<IJSON> =>
  new SecretsManagerClient({ region })
    .send(new GetSecretValueCommand({ SecretId: secret }))
    .catch(() => {
      throw new Error(`Missing secret "${secret}" in region "${region}"`);
    })
    .then(({ SecretString }) => {
      const { valid, parsed } = isJSONString(SecretString);

      if (!valid) {
        throw new Error(`Received invalid JSON for "${secret}"`);
      }

      return parsed;
    });
