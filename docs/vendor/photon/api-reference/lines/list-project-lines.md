> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# List project lines

> Returns only **dedicated** phone lines the project owns across all platforms. Use the optional `platform` query parameter to filter to a single platform. On iMessage Free or Pro plans, lines are assigned per-user rather than dedicated to the project — for those cases, redirect users via `GET /users/{userId}/redirect` instead. Requires Authorization: Basic base64(projectId:projectSecret).



## OpenAPI

````yaml https://spectrum.photon.codes/openapi/json get /projects/{projectId}/lines/
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
  /projects/{projectId}/lines/:
    get:
      tags:
        - lines
      summary: List project lines
      description: >-
        Returns only **dedicated** phone lines the project owns across all
        platforms. Use the optional `platform` query parameter to filter to a
        single platform. On iMessage Free or Pro plans, lines are assigned
        per-user rather than dedicated to the project — for those cases,
        redirect users via `GET /users/{userId}/redirect` instead. Requires
        Authorization: Basic base64(projectId:projectSecret).
      operationId: getProjectsByProjectIdLines
      parameters:
        - name: projectId
          in: path
          required: true
          schema:
            type: string
            format: uuid
            pattern: >-
              ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$
        - name: platform
          in: query
          required: false
          schema:
            type: string
            enum:
              - imessage
              - whatsapp_business
              - voice
              - slack
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
                      lines:
                        type: array
                        items:
                          oneOf:
                            - type: object
                              properties:
                                platform:
                                  type: string
                                  const: imessage
                                id:
                                  type: string
                                  format: uuid
                                  pattern: >-
                                    ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$
                                phoneNumber:
                                  type: string
                                profile:
                                  type: object
                                  properties:
                                    firstName:
                                      anyOf:
                                        - type: string
                                        - type: 'null'
                                    lastName:
                                      anyOf:
                                        - type: string
                                        - type: 'null'
                                    avatarUrl:
                                      anyOf:
                                        - type: string
                                        - type: 'null'
                                  required:
                                    - firstName
                                    - lastName
                                    - avatarUrl
                                  additionalProperties: false
                                status:
                                  type: string
                                  enum:
                                    - available
                                    - unavailable
                                    - unknown
                                createdAt:
                                  type: string
                              required:
                                - platform
                                - id
                                - phoneNumber
                                - profile
                                - status
                                - createdAt
                              additionalProperties: false
                            - oneOf:
                                - type: object
                                  properties:
                                    platform:
                                      type: string
                                      const: whatsapp_business
                                    state:
                                      type: string
                                      const: registered
                                    id:
                                      type: string
                                      format: uuid
                                      pattern: >-
                                        ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$
                                    phoneNumberId:
                                      type: string
                                    displayPhoneNumber:
                                      anyOf:
                                        - type: string
                                        - type: 'null'
                                    verifiedName:
                                      anyOf:
                                        - type: string
                                        - type: 'null'
                                    qualityRating:
                                      anyOf:
                                        - type: string
                                        - type: 'null'
                                    status:
                                      anyOf:
                                        - type: string
                                        - type: 'null'
                                    codeVerificationStatus:
                                      anyOf:
                                        - type: string
                                        - type: 'null'
                                    wabaId:
                                      type: string
                                    businessName:
                                      anyOf:
                                        - type: string
                                        - type: 'null'
                                    createdAt:
                                      type: string
                                  required:
                                    - platform
                                    - state
                                    - id
                                    - phoneNumberId
                                    - displayPhoneNumber
                                    - verifiedName
                                    - qualityRating
                                    - status
                                    - codeVerificationStatus
                                    - wabaId
                                    - businessName
                                    - createdAt
                                  additionalProperties: false
                                - type: object
                                  properties:
                                    platform:
                                      type: string
                                      const: whatsapp_business
                                    state:
                                      type: string
                                      const: pending
                                    phoneNumberId:
                                      type: string
                                    displayPhoneNumber:
                                      anyOf:
                                        - type: string
                                        - type: 'null'
                                    registrationState:
                                      type: string
                                      enum:
                                        - registering
                                        - failed
                                    errorCode:
                                      anyOf:
                                        - type: string
                                        - type: 'null'
                                    errorMessage:
                                      anyOf:
                                        - type: string
                                        - type: 'null'
                                    createdAt:
                                      type: string
                                  required:
                                    - platform
                                    - state
                                    - phoneNumberId
                                    - displayPhoneNumber
                                    - registrationState
                                    - errorCode
                                    - errorMessage
                                    - createdAt
                                  additionalProperties: false
                    required:
                      - lines
                    additionalProperties: false
                required:
                  - succeed
                  - data
                additionalProperties: false

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.