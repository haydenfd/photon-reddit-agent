> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Edit a WhatsApp Business message template

> Edits an existing message template. Only `components`, `category`, and `messageSendTtlSeconds` are editable — Meta forbids changing `name` and `language`. Empty body returns 400. Editing is subject to Meta's template lifecycle: APPROVED templates can edit `components`/`category` (category changes require re-approval), REJECTED templates can edit any field, PAUSED templates have limited edits.



## OpenAPI

````yaml https://spectrum.photon.codes/openapi/json patch /projects/{projectId}/whatsapp-business/accounts/{accountId}/templates/{templateId}
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
  /projects/{projectId}/whatsapp-business/accounts/{accountId}/templates/{templateId}:
    patch:
      tags:
        - whatsapp-business
      summary: Edit a WhatsApp Business message template
      description: >-
        Edits an existing message template. Only `components`, `category`, and
        `messageSendTtlSeconds` are editable — Meta forbids changing `name` and
        `language`. Empty body returns 400. Editing is subject to Meta's
        template lifecycle: APPROVED templates can edit `components`/`category`
        (category changes require re-approval), REJECTED templates can edit any
        field, PAUSED templates have limited edits.
      operationId: >-
        patchProjectsByProjectIdWhatsapp-businessAccountsByAccountIdTemplatesByTemplateId
      parameters:
        - name: accountId
          in: path
          required: true
          schema:
            type: string
            format: uuid
            pattern: >-
              ^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$
        - name: templateId
          in: path
          required: true
          schema:
            type: string
            minLength: 1
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
                components:
                  minItems: 1
                  type: array
                  items:
                    type: object
                    properties:
                      type:
                        type: string
                    required:
                      - type
                    additionalProperties: {}
                category:
                  type: string
                  enum:
                    - MARKETING
                    - UTILITY
                    - AUTHENTICATION
                messageSendTtlSeconds:
                  type: integer
                  exclusiveMinimum: 0
                  maximum: 9007199254740991
              additionalProperties: {}
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                components:
                  minItems: 1
                  type: array
                  items:
                    type: object
                    properties:
                      type:
                        type: string
                    required:
                      - type
                    additionalProperties: {}
                category:
                  type: string
                  enum:
                    - MARKETING
                    - UTILITY
                    - AUTHENTICATION
                messageSendTtlSeconds:
                  type: integer
                  exclusiveMinimum: 0
                  maximum: 9007199254740991
              additionalProperties: {}
          multipart/form-data:
            schema:
              type: object
              properties:
                components:
                  minItems: 1
                  type: array
                  items:
                    type: object
                    properties:
                      type:
                        type: string
                    required:
                      - type
                    additionalProperties: {}
                category:
                  type: string
                  enum:
                    - MARKETING
                    - UTILITY
                    - AUTHENTICATION
                messageSendTtlSeconds:
                  type: integer
                  exclusiveMinimum: 0
                  maximum: 9007199254740991
              additionalProperties: {}
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
                      templateId:
                        type: string
                      success:
                        type: boolean
                        const: true
                    required:
                      - templateId
                      - success
                    additionalProperties: false
                required:
                  - succeed
                  - data
                additionalProperties: false

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.