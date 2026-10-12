> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Create user

> Creates a new user for the project. Pass `type: "shared"` for a shared user (server assigns a phone number from the Cosmos pool and enforces `maxSharedUsers`). A shared user is identified by `phoneNumber` within the project: re-creating with an existing active `phoneNumber` returns that same user and updates its `firstName`, `lastName`, and `email` from any values supplied (omitted/null fields are left unchanged; `maxSharedUsers` is not re-checked on an update). Pass `type: "dedicated"` for a dedicated user, which requires `assignedPhoneNumber` to match an iMessage line owned by the project; the operation is idempotent on the full `(phoneNumber, assignedPhoneNumber)` tuple — calling it again with the same tuple returns the existing row, while calling it with the same `phoneNumber` but a different `assignedPhoneNumber` creates a new row (the same user phone may be assigned to multiple lines). `firstName`, `lastName`, and `email` are optional in both cases. Requires Authorization: Basic base64(projectId:projectSecret).



## OpenAPI

````yaml https://spectrum.photon.codes/openapi/json post /projects/{projectId}/users/
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
  /projects/{projectId}/users/:
    post:
      tags:
        - users
      summary: Create user
      description: >-
        Creates a new user for the project. Pass `type: "shared"` for a shared
        user (server assigns a phone number from the Cosmos pool and enforces
        `maxSharedUsers`). A shared user is identified by `phoneNumber` within
        the project: re-creating with an existing active `phoneNumber` returns
        that same user and updates its `firstName`, `lastName`, and `email` from
        any values supplied (omitted/null fields are left unchanged;
        `maxSharedUsers` is not re-checked on an update). Pass `type:
        "dedicated"` for a dedicated user, which requires `assignedPhoneNumber`
        to match an iMessage line owned by the project; the operation is
        idempotent on the full `(phoneNumber, assignedPhoneNumber)` tuple —
        calling it again with the same tuple returns the existing row, while
        calling it with the same `phoneNumber` but a different
        `assignedPhoneNumber` creates a new row (the same user phone may be
        assigned to multiple lines). `firstName`, `lastName`, and `email` are
        optional in both cases. Requires Authorization: Basic
        base64(projectId:projectSecret).
      operationId: postProjectsByProjectIdUsers
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
              oneOf:
                - type: object
                  properties:
                    type:
                      type: string
                      const: shared
                    phoneNumber:
                      type: string
                      format: e164
                      pattern: ^\+[1-9]\d{6,14}$
                    firstName:
                      anyOf:
                        - type: string
                        - type: 'null'
                    lastName:
                      anyOf:
                        - type: string
                        - type: 'null'
                    email:
                      anyOf:
                        - type: string
                          format: email
                          pattern: >-
                            ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
                        - type: 'null'
                  required:
                    - type
                    - phoneNumber
                  additionalProperties: false
                - type: object
                  properties:
                    type:
                      type: string
                      const: dedicated
                    phoneNumber:
                      type: string
                      format: e164
                      pattern: ^\+[1-9]\d{6,14}$
                    assignedPhoneNumber:
                      type: string
                      format: e164
                      pattern: ^\+[1-9]\d{6,14}$
                    firstName:
                      anyOf:
                        - type: string
                        - type: 'null'
                    lastName:
                      anyOf:
                        - type: string
                        - type: 'null'
                    email:
                      anyOf:
                        - type: string
                          format: email
                          pattern: >-
                            ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
                        - type: 'null'
                  required:
                    - type
                    - phoneNumber
                    - assignedPhoneNumber
                  additionalProperties: false
          application/x-www-form-urlencoded:
            schema:
              oneOf:
                - type: object
                  properties:
                    type:
                      type: string
                      const: shared
                    phoneNumber:
                      type: string
                      format: e164
                      pattern: ^\+[1-9]\d{6,14}$
                    firstName:
                      anyOf:
                        - type: string
                        - type: 'null'
                    lastName:
                      anyOf:
                        - type: string
                        - type: 'null'
                    email:
                      anyOf:
                        - type: string
                          format: email
                          pattern: >-
                            ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
                        - type: 'null'
                  required:
                    - type
                    - phoneNumber
                  additionalProperties: false
                - type: object
                  properties:
                    type:
                      type: string
                      const: dedicated
                    phoneNumber:
                      type: string
                      format: e164
                      pattern: ^\+[1-9]\d{6,14}$
                    assignedPhoneNumber:
                      type: string
                      format: e164
                      pattern: ^\+[1-9]\d{6,14}$
                    firstName:
                      anyOf:
                        - type: string
                        - type: 'null'
                    lastName:
                      anyOf:
                        - type: string
                        - type: 'null'
                    email:
                      anyOf:
                        - type: string
                          format: email
                          pattern: >-
                            ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
                        - type: 'null'
                  required:
                    - type
                    - phoneNumber
                    - assignedPhoneNumber
                  additionalProperties: false
          multipart/form-data:
            schema:
              oneOf:
                - type: object
                  properties:
                    type:
                      type: string
                      const: shared
                    phoneNumber:
                      type: string
                      format: e164
                      pattern: ^\+[1-9]\d{6,14}$
                    firstName:
                      anyOf:
                        - type: string
                        - type: 'null'
                    lastName:
                      anyOf:
                        - type: string
                        - type: 'null'
                    email:
                      anyOf:
                        - type: string
                          format: email
                          pattern: >-
                            ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
                        - type: 'null'
                  required:
                    - type
                    - phoneNumber
                  additionalProperties: false
                - type: object
                  properties:
                    type:
                      type: string
                      const: dedicated
                    phoneNumber:
                      type: string
                      format: e164
                      pattern: ^\+[1-9]\d{6,14}$
                    assignedPhoneNumber:
                      type: string
                      format: e164
                      pattern: ^\+[1-9]\d{6,14}$
                    firstName:
                      anyOf:
                        - type: string
                        - type: 'null'
                    lastName:
                      anyOf:
                        - type: string
                        - type: 'null'
                    email:
                      anyOf:
                        - type: string
                          format: email
                          pattern: >-
                            ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
                        - type: 'null'
                  required:
                    - type
                    - phoneNumber
                    - assignedPhoneNumber
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
                      projectId:
                        type: string
                      type:
                        type: string
                        enum:
                          - shared
                          - dedicated
                      firstName:
                        anyOf:
                          - type: string
                          - type: 'null'
                      lastName:
                        anyOf:
                          - type: string
                          - type: 'null'
                      email:
                        anyOf:
                          - type: string
                          - type: 'null'
                      phoneNumber:
                        type: string
                        format: e164
                        pattern: ^\+[1-9]\d{6,14}$
                      assignedPhoneNumber:
                        type: string
                        format: e164
                        pattern: ^\+[1-9]\d{6,14}$
                      meta:
                        anyOf:
                          - type: object
                            propertyNames:
                              type: string
                            additionalProperties: {}
                          - type: 'null'
                      createdAt:
                        type: string
                    required:
                      - id
                      - projectId
                      - type
                      - firstName
                      - lastName
                      - email
                      - phoneNumber
                      - assignedPhoneNumber
                      - meta
                      - createdAt
                    additionalProperties: false
                required:
                  - succeed
                  - data
                additionalProperties: false

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.