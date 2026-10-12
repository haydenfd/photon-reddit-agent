> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Update a dedicated iMessage line name

> Merges firstName and/or lastName into this line's stored Profile while preserving its other name and avatar. Requires Project Basic Auth.



## OpenAPI

````yaml https://spectrum.photon.codes/openapi/json patch /projects/{projectId}/lines/{lineId}/profile
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
  /projects/{projectId}/lines/{lineId}/profile:
    patch:
      tags:
        - lines
      summary: Update a dedicated iMessage line name
      description: >-
        Merges firstName and/or lastName into this line's stored Profile while
        preserving its other name and avatar. Requires Project Basic Auth.
      operationId: patchProjectsByProjectIdLinesByLineIdProfile
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
      requestBody:
        required: true
        content:
          application/json:
            schema:
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
              additionalProperties: false
          application/x-www-form-urlencoded:
            schema:
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
              additionalProperties: false
          multipart/form-data:
            schema:
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
                      projectId:
                        type: string
                        format: uuid
                        pattern: >-
                          ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$
                      lineId:
                        type: string
                        format: uuid
                        pattern: >-
                          ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$
                      phoneNumber:
                        type: string
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
                      - projectId
                      - lineId
                      - phoneNumber
                      - firstName
                      - lastName
                      - avatarUrl
                    additionalProperties: false
                required:
                  - succeed
                  - data
                additionalProperties: false

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.