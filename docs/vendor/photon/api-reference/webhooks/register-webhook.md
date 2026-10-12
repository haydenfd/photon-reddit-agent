> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Register webhook

> Registers a destination URL for the authenticated project. `schemaVersion` defaults to `normalized-events.v1`, the normalized Spectrum event shape; choose `raw-inbound.v1` only if your project delivers on a platform Fusor already serves. Save both one-time secrets from the response: `standardSigningSecret` is the `whsec_` secret for Standard Webhooks libraries, while `signingSecret` verifies the legacy Spectrum header.

### Delivery format
Each event is delivered as an HTTP `POST` to your URL with these headers:

| Header | Meaning |
| --- | --- |
| `webhook-id` | Stable event id. |
| `webhook-timestamp` | UNIX epoch seconds at signing time. |
| `webhook-signature` | One or more space-delimited `v1,<base64>` signatures. |
| `X-Spectrum-Webhook-Id` | Legacy header. The id of this webhook, useful when you have multiple registered. |
| `X-Spectrum-Timestamp` | Legacy header. UNIX epoch seconds at signing time. |
| `X-Spectrum-Signature` | Legacy header. `v0=<hex>`, verified with `signingSecret`. |

### Verifying the signature
Use a Standard Webhooks consumer library with `standardSigningSecret`. The signed content is `webhook-id.webhook-timestamp.rawBody`; always verify the exact raw request bytes before parsing JSON. During secret rotation the signature header contains signatures for both the new and overlapping old secret.

```
verify(rawBody, headers, standardSigningSecret)
```

Reject timestamps outside your replay-protection window and deduplicate by `webhook-id`.

### Errors
Returns `409` if an active webhook with the same URL is already registered for this project. Registering a URL that was previously deleted is allowed and yields a new webhook with a new signing secret. Returns `503` when an explicitly legacy webhook cannot be registered with spectrum-webhook; the database insert is rolled back so the request can be retried.

Requires `Authorization: Basic base64(projectId:projectSecret)`.



## OpenAPI

````yaml https://spectrum.photon.codes/openapi/json post /projects/{projectId}/webhooks/
openapi: 3.1.0
info:
  title: Spectrum Cloud External API
  description: Client-facing API for Spectrum Cloud.
  version: 1.0.0
servers:
  - url: https://spectrum.photon.codes
security: []
tags:
  - name: billing
    description: Billing and subscription operations
  - name: imessage
    description: iMessage platform operations
  - name: lines
    description: Phone line enumeration across platforms
  - name: platforms
    description: Platform management operations
  - name: users
    description: User operations
  - name: voice
    description: Voice platform operations
  - name: webhooks
    description: Webhook registration for receiving Spectrum events
  - name: whatsapp-business
    description: WhatsApp Business platform operations
  - name: slack
    description: Slack platform operations
paths:
  /projects/{projectId}/webhooks/:
    post:
      tags:
        - webhooks
      summary: Register webhook
      description: >-
        Registers a destination URL for the authenticated project.
        `schemaVersion` defaults to `normalized-events.v1`, the normalized
        Spectrum event shape; choose `raw-inbound.v1` only if your project
        delivers on a platform Fusor already serves. Save both one-time secrets
        from the response: `standardSigningSecret` is the `whsec_` secret for
        Standard Webhooks libraries, while `signingSecret` verifies the legacy
        Spectrum header.


        ### Delivery format

        Each event is delivered as an HTTP `POST` to your URL with these
        headers:


        | Header | Meaning |

        | --- | --- |

        | `webhook-id` | Stable event id. |

        | `webhook-timestamp` | UNIX epoch seconds at signing time. |

        | `webhook-signature` | One or more space-delimited `v1,<base64>`
        signatures. |

        | `X-Spectrum-Webhook-Id` | Legacy header. The id of this webhook,
        useful when you have multiple registered. |

        | `X-Spectrum-Timestamp` | Legacy header. UNIX epoch seconds at signing
        time. |

        | `X-Spectrum-Signature` | Legacy header. `v0=<hex>`, verified with
        `signingSecret`. |


        ### Verifying the signature

        Use a Standard Webhooks consumer library with `standardSigningSecret`.
        The signed content is `webhook-id.webhook-timestamp.rawBody`; always
        verify the exact raw request bytes before parsing JSON. During secret
        rotation the signature header contains signatures for both the new and
        overlapping old secret.


        ```

        verify(rawBody, headers, standardSigningSecret)

        ```


        Reject timestamps outside your replay-protection window and deduplicate
        by `webhook-id`.


        ### Errors

        Returns `409` if an active webhook with the same URL is already
        registered for this project. Registering a URL that was previously
        deleted is allowed and yields a new webhook with a new signing secret.
        Returns `503` when an explicitly legacy webhook cannot be registered
        with spectrum-webhook; the database insert is rolled back so the request
        can be retried.


        Requires `Authorization: Basic base64(projectId:projectSecret)`.
      operationId: postProjectsByProjectIdWebhooks
      parameters:
        - name: projectId
          in: path
          required: true
          schema:
            type: string
            format: uuid
            pattern: >-
              ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                webhookUrl:
                  type: string
                  format: uri
                schemaVersion:
                  default: normalized-events.v1
                  type: string
                  enum:
                    - normalized-events.v1
                    - raw-inbound.v1
                eventTypes:
                  default:
                    - message.received
                  minItems: 1
                  type: array
                  items:
                    type: string
                    enum:
                      - message.received
                failureNotificationEmail:
                  anyOf:
                    - type: string
                      format: email
                      pattern: >-
                        ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
                    - type: 'null'
              required:
                - webhookUrl
                - schemaVersion
                - eventTypes
              additionalProperties: false
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                webhookUrl:
                  type: string
                  format: uri
                schemaVersion:
                  default: normalized-events.v1
                  type: string
                  enum:
                    - normalized-events.v1
                    - raw-inbound.v1
                eventTypes:
                  default:
                    - message.received
                  minItems: 1
                  type: array
                  items:
                    type: string
                    enum:
                      - message.received
                failureNotificationEmail:
                  anyOf:
                    - type: string
                      format: email
                      pattern: >-
                        ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
                    - type: 'null'
              required:
                - webhookUrl
                - schemaVersion
                - eventTypes
              additionalProperties: false
          multipart/form-data:
            schema:
              type: object
              properties:
                webhookUrl:
                  type: string
                  format: uri
                schemaVersion:
                  default: normalized-events.v1
                  type: string
                  enum:
                    - normalized-events.v1
                    - raw-inbound.v1
                eventTypes:
                  default:
                    - message.received
                  minItems: 1
                  type: array
                  items:
                    type: string
                    enum:
                      - message.received
                failureNotificationEmail:
                  anyOf:
                    - type: string
                      format: email
                      pattern: >-
                        ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
                    - type: 'null'
              required:
                - webhookUrl
                - schemaVersion
                - eventTypes
              additionalProperties: false
      responses:
        '200':
          description: Response for status 200
          content:
            application/json:
              schema:
                type: object
                properties:
                  succeed:
                    type: boolean
                    const: true
                  data:
                    type: object
                    properties:
                      id:
                        type: string
                        format: uuid
                        pattern: >-
                          ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$
                      webhookUrl:
                        type: string
                        format: uri
                      schemaVersion:
                        type: string
                        enum:
                          - normalized-events.v1
                          - raw-inbound.v1
                      eventTypes:
                        type: array
                        items:
                          type: string
                          enum:
                            - message.received
                      enabled:
                        type: boolean
                      status:
                        type: string
                        enum:
                          - active
                          - disabled
                      failureNotificationEmail:
                        anyOf:
                          - type: string
                            format: email
                            pattern: >-
                              ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
                          - type: 'null'
                      disabledAt:
                        anyOf:
                          - type: string
                            format: date-time
                            pattern: >-
                              ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$
                          - type: 'null'
                      disabledReason:
                        anyOf:
                          - type: string
                            enum:
                              - manual
                              - receiver_gone
                              - delivery_failures
                          - type: 'null'
                      createdAt:
                        type: string
                        format: date-time
                        pattern: >-
                          ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$
                      updatedAt:
                        type: string
                        format: date-time
                        pattern: >-
                          ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$
                      signingSecret:
                        type: string
                      standardSigningSecret:
                        type: string
                        pattern: ^whsec_.*
                    required:
                      - id
                      - webhookUrl
                      - schemaVersion
                      - eventTypes
                      - enabled
                      - status
                      - failureNotificationEmail
                      - disabledAt
                      - disabledReason
                      - createdAt
                      - updatedAt
                      - signingSecret
                      - standardSigningSecret
                    additionalProperties: false
                required:
                  - succeed
                  - data
                additionalProperties: false

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.