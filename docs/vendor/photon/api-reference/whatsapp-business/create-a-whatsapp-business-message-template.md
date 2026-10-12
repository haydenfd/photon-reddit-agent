> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Create a WhatsApp Business message template

> Creates a message template under the given WhatsApp Business account. Body fields (`name`, `language`, `category`, `components`, `parameterFormat`, `allowCategoryChange`) map to Meta's `POST /{waba_id}/message_templates` payload; component JSON should follow Meta's components reference and is forwarded unchanged. Returns Meta's `{ id, status, category }` — newly-created templates start in `PENDING` and require Meta approval before they can be sent.



## OpenAPI

````yaml https://spectrum.photon.codes/openapi/json post /projects/{projectId}/whatsapp-business/accounts/{accountId}/templates/
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
  /projects/{projectId}/whatsapp-business/accounts/{accountId}/templates/:
    post:
      tags:
        - whatsapp-business
      summary: Create a WhatsApp Business message template
      description: >-
        Creates a message template under the given WhatsApp Business account.
        Body fields (`name`, `language`, `category`, `components`,
        `parameterFormat`, `allowCategoryChange`) map to Meta's `POST
        /{waba_id}/message_templates` payload; component JSON should follow
        Meta's components reference and is forwarded unchanged. Returns Meta's
        `{ id, status, category }` — newly-created templates start in `PENDING`
        and require Meta approval before they can be sent.
      operationId: postProjectsByProjectIdWhatsapp-businessAccountsByAccountIdTemplates
      parameters:
        - name: accountId
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
                name:
                  type: string
                  minLength: 1
                  maxLength: 512
                language:
                  type: string
                  minLength: 2
                  maxLength: 20
                category:
                  type: string
                  enum:
                    - MARKETING
                    - UTILITY
                    - AUTHENTICATION
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
                parameterFormat:
                  type: string
                  enum:
                    - POSITIONAL
                    - NAMED
                allowCategoryChange:
                  type: boolean
              required:
                - name
                - language
                - category
                - components
              additionalProperties: {}
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                name:
                  type: string
                  minLength: 1
                  maxLength: 512
                language:
                  type: string
                  minLength: 2
                  maxLength: 20
                category:
                  type: string
                  enum:
                    - MARKETING
                    - UTILITY
                    - AUTHENTICATION
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
                parameterFormat:
                  type: string
                  enum:
                    - POSITIONAL
                    - NAMED
                allowCategoryChange:
                  type: boolean
              required:
                - name
                - language
                - category
                - components
              additionalProperties: {}
          multipart/form-data:
            schema:
              type: object
              properties:
                name:
                  type: string
                  minLength: 1
                  maxLength: 512
                language:
                  type: string
                  minLength: 2
                  maxLength: 20
                category:
                  type: string
                  enum:
                    - MARKETING
                    - UTILITY
                    - AUTHENTICATION
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
                parameterFormat:
                  type: string
                  enum:
                    - POSITIONAL
                    - NAMED
                allowCategoryChange:
                  type: boolean
              required:
                - name
                - language
                - category
                - components
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
                      id:
                        type: string
                      status:
                        type: string
                        enum:
                          - APPROVED
                          - PENDING
                          - REJECTED
                          - PAUSED
                          - IN_APPEAL
                          - PENDING_DELETION
                          - DELETED
                          - DISABLED
                          - LIMIT_EXCEEDED
                      category:
                        type: string
                        enum:
                          - MARKETING
                          - UTILITY
                          - AUTHENTICATION
                    required:
                      - id
                      - status
                      - category
                    additionalProperties: false
                required:
                  - succeed
                  - data
                additionalProperties: false

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.