# API

> ⚠️ Generic: **HTTP status codes are valid**, it meaning that errors may return status codes other than 200, and some tasks/workers in pregress will return something like 202.

## Verify

### **`GET /:address/nonce`** - Get verify **nonce**, for user wallet sign.

#### Request
- route - `:address` ETH wallet address, it should be pass by `ethers.utils.isAddress(address)`.

<!-- #### response body example

```json
{
  "nonce": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJyYXZlbi1hcGkiLCJzdWIiOiJub25jZS1mb3ItdmVyaWZ5LXdhbGxldCIsImlhdCI6MTY3MTA4MzgxNCwiZXhwIjoxNjcxMDg0NDE0LCJhZGRyZXNzIjoiMHhiOTk2OTZkMDk5MWVCOUEyZTg4NEI2QWRBNzRkYkU2NTQ1MDAzNzc4IiwidXVpZCI6ImE2NjczOTE0LTMzMmYtNDFmZC1hY2VkLTA4Zjk5Y2M2ZGIzNiJ9.WeeGwlLgJG_VFP3rRefIU-lI9rxM8qcBDHKQILDL90-9ihvFf1cayOQ_oNo-3CEkrxbliCtn8EG61OG2qg2hyg",
  "payload": {
    "iss": "raven-api",
    "sub": "nonce-for-verify-wallet",
    "iat": 1671083814,
    "exp": 1671084414,
    "address": "0xb99696d0991eB9A2e884B6AdA74dbE6545003778",
    "uuid": "a6673914-332f-41fd-aced-08f99cc6db36"
  }
}
``` -->
#### Response
- body (json)
  - `nonce`: (string) a JWT token for verify, sign it as message by client wallet.
  - `payload`: (object) nonce payload content.

### **`POST /:address/verify`** - Get business token

#### Request
- route params `:address` ETH wallet address, it should be pass by `ethers.utils.isAddress(address)`.
- http request header: `Content-Type: application/json`
- request body:
  ```json
  {
    "signature": "0xcb096...msg.signed.by.your.wallet...fdb81b",
    "nonce": "eyJhbGciOi...origin.nonce...OG2qg2hyg"
  }
  ```
  - `signature`: (string) Signature from the user's wallet.
  - `nonce`: (string) Original text that was signed.

#### Response
- body (json)
  - `token`: (string) JWT for accessing the business: Important that it will be used for request business data, set in the request header `Authorization: Bearer eyJhbGciOi...token...OG2qg2hyg`.

### `GET /verify` - verify business token.

#### Request
- http header
  - `Authorization: Bearer eyJhbGciOi...token...OG2qg2hyg`

#### Response
- status code
  - `200`: verify success
  - `400`: verify failure
