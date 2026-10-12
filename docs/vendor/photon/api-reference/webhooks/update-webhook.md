> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Update webhook

> Updates event subscriptions, failure-notification email, enabled state, or permanently upgrades an endpoint from `normalized-events.v1` to `raw-inbound.v1`. `message.received` is currently the supported event type.

Send a schema-version change separately from settings updates. The request body only accepts `schemaVersion: "raw-inbound.v1"`; downgrading to `normalized-events.v1` is not supported.

Before upgrading, deploy the `standardSigningSecret` returned at registration. The update response does not reveal that one-time secret again.

The handoff enables the Fusor destination before disabling the legacy source. Delivery can therefore briefly overlap while the legacy source converges, but avoids a delivery gap.

Returns `404` if the webhook does not belong to the authenticated project and `409` if a concurrent migration supersedes this request.
Returns `409` if `schemaVersion` is combined with another setting, or if `eventTypes` or `enabled` is sent for an endpoint still pinned to `normalized-events.v1`.
Requests to downgrade an endpoint to `normalized-events.v1` fail schema validation with `422`.

Requires `Authorization: Basic base64(projectId:projectSecret)`.



## OpenAPI

````yaml https://spectrum.photon.codes/openapi/json patch /projects/{projectId}/webhooks/{webhookId}
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
  /projects/{projectId}/webhooks/{webhookId}:
    patch:
      tags:
        - webhooks
      summary: Update webhook
      description: >-
        Updates event subscriptions, failure-notification email, enabled state,
        or permanently upgrades an endpoint from `normalized-events.v1` to
        `raw-inbound.v1`. `message.received` is currently the supported event
        type.


        Send a schema-version change separately from settings updates. The
        request body only accepts `schemaVersion: "raw-inbound.v1"`; downgrading
        to `normalized-events.v1` is not supported.


        Before upgrading, deploy the `standardSigningSecret` returned at
        registration. The update response does not reveal that one-time secret
        again.


        The handoff enables the Fusor destination before disabling the legacy
        source. Delivery can therefore briefly overlap while the legacy source
        converges, but avoids a delivery gap.


        Returns `404` if the webhook does not belong to the authenticated
        project and `409` if a concurrent migration supersedes this request.

        Returns `409` if `schemaVersion` is combined with another setting, or if
        `eventTypes` or `enabled` is sent for an endpoint still pinned to
        `normalized-events.v1`.

        Requests to downgrade an endpoint to `normalized-events.v1` fail schema
        validation with `422`.


        Requires `Authorization: Basic base64(projectId:projectSecret)`.
      operationId: patchProjectsByProjectIdWebhooksByWebhookId
      parameters:
        - name: webhookId
          in: path
          required: true
          schema:
            type: string
            format: uuid
            pattern: >-
              ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$
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
                schemaVersion:
                  type: string
                  const: raw-inbound.v1
                eventTypes:
                  minItems: 1
                  type: array
                  items:
                    type: string
                    enum:
                      - message.received
                enabled:
                  type: boolean
                failureNotificationEmail:
                  anyOf:
                    - type: string
                      format: email
                      pattern: >-
                        ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
                    - type: 'null'
              additionalProperties: false
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                schemaVersion:
                  type: string
                  const: raw-inbound.v1
                eventTypes:
                  minItems: 1
                  type: array
                  items:
                    type: string
                    enum:
                      - message.received
                enabled:
                  type: boolean
                failureNotificationEmail:
                  anyOf:
                    - type: string
                      format: email
                      pattern: >-
                        ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
                    - type: 'null'
              additionalProperties: false
          multipart/form-data:
            schema:
              type: object
              properties:
                schemaVersion:
                  type: string
                  const: raw-inbound.v1
                eventTypes:
                  minItems: 1
                  type: array
                  items:
                    type: string
                    enum:
                      - message.received
                enabled:
                  type: boolean
                failureNotificationEmail:
                  anyOf:
                    - type: string
                      format: email
                      pattern: >-
                        ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
                    - type: 'null'
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
                    additionalProperties: false
                required:
                  - succeed
                  - data
                additionalProperties: false

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.