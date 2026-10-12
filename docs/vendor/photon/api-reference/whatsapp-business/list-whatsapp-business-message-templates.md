> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# List WhatsApp Business message templates

> Lists message templates for the given WhatsApp Business account. Forwards filters to Meta Graph (https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates) and forwards opaque cursors via `paging.nextCursor` / `paging.prevCursor`. Component JSON is preserved in Meta's snake_case shape — see Meta's components reference. Requires Authorization: Basic base64(projectId:projectSecret).



## OpenAPI

````yaml https://spectrum.photon.codes/openapi/json get /projects/{projectId}/whatsapp-business/accounts/{accountId}/templates/
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
    get:
      tags:
        - whatsapp-business
      summary: List WhatsApp Business message templates
      description: >-
        Lists message templates for the given WhatsApp Business account.
        Forwards filters to Meta Graph
        (https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates)
        and forwards opaque cursors via `paging.nextCursor` /
        `paging.prevCursor`. Component JSON is preserved in Meta's snake_case
        shape — see Meta's components reference. Requires Authorization: Basic
        base64(projectId:projectSecret).
      operationId: getProjectsByProjectIdWhatsapp-businessAccountsByAccountIdTemplates
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
        - name: name
          in: query
          required: false
          schema:
            type: string
            minLength: 1
            maxLength: 512
        - name: nameOrContent
          in: query
          required: false
          schema:
            type: string
            minLength: 1
            maxLength: 512
        - name: status
          in: query
          required: false
          schema:
            type: string
        - name: language
          in: query
          required: false
          schema:
            type: string
        - name: category
          in: query
          required: false
          schema:
            type: string
        - name: limit
          in: query
          required: true
          schema:
            default: 25
            type: integer
            minimum: 1
            maximum: 100
        - name: after
          in: query
          required: false
          schema:
            type: string
        - name: before
          in: query
          required: false
          schema:
            type: string
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
                      templates:
                        type: array
                        items:
                          type: object
                          properties:
                            id:
                              type: string
                            name:
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
                            language:
                              type: string
                            components:
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
                            qualityScore:
                              type: object
                              properties:
                                score:
                                  type: string
                              additionalProperties: {}
                            rejectedReason:
                              type: string
                          required:
                            - id
                            - name
                            - status
                            - category
                            - language
                            - components
                          additionalProperties: false
                      paging:
                        type: object
                        properties:
                          nextCursor:
                            anyOf:
                              - type: string
                              - type: 'null'
                          prevCursor:
                            anyOf:
                              - type: string
                              - type: 'null'
                        required:
                          - nextCursor
                          - prevCursor
                        additionalProperties: false
                    required:
                      - templates
                      - paging
                    additionalProperties: false
                required:
                  - succeed
                  - data
                additionalProperties: false

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.