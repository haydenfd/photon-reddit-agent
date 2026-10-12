> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Remove a dedicated line

> Deallocates a dedicated line by id. For iMessage lines this decrements the Stripe subscription quantity with pro-rated credit (business plan only), updating the quantity before the Cosmos deallocation so the customer is never billed for a line they can no longer use. WhatsApp Business lines are removed without a billing change and return `billing: null`. Requires Authorization: Basic base64(projectId:projectSecret).



## OpenAPI

````yaml https://spectrum.photon.codes/openapi/json delete /projects/{projectId}/lines/{lineId}
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
  /projects/{projectId}/lines/{lineId}:
    delete:
      tags:
        - lines
      summary: Remove a dedicated line
      description: >-
        Deallocates a dedicated line by id. For iMessage lines this decrements
        the Stripe subscription quantity with pro-rated credit (business plan
        only), updating the quantity before the Cosmos deallocation so the
        customer is never billed for a line they can no longer use. WhatsApp
        Business lines are removed without a billing change and return `billing:
        null`. Requires Authorization: Basic base64(projectId:projectSecret).
      operationId: deleteProjectsByProjectIdLinesByLineId
      parameters:
        - name: lineId
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
                      billing:
                        anyOf:
                          - type: object
                            properties:
                              quantity:
                                anyOf:
                                  - type: number
                                  - type: 'null'
                              prorationAmount:
                                anyOf:
                                  - type: number
                                  - type: 'null'
                              syncStatus:
                                type: string
                                enum:
                                  - in_sync
                                  - syncing
                                  - failed
                            required:
                              - quantity
                              - prorationAmount
                              - syncStatus
                            additionalProperties: false
                          - type: 'null'
                    required:
                      - billing
                    additionalProperties: false
                required:
                  - succeed
                  - data
                additionalProperties: false

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.