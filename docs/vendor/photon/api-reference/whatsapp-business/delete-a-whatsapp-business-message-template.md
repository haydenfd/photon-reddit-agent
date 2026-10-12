> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Delete a WhatsApp Business message template

> Deletes a single language version of a message template. The path `:templateId` is forwarded to Meta as `hsm_id` so the delete is scoped to that exact template row — other language versions sharing the same `name` are untouched. The `name` query parameter is required because Meta's `DELETE /{waba_id}/message_templates` endpoint requires it alongside `hsm_id`. Returns `{ templateId, success: true }` on confirmation; Meta acknowledging `success=false` surfaces as 502.



## OpenAPI

````yaml https://spectrum.photon.codes/openapi/json delete /projects/{projectId}/whatsapp-business/accounts/{accountId}/templates/{templateId}
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
    delete:
      tags:
        - whatsapp-business
      summary: Delete a WhatsApp Business message template
      description: >-
        Deletes a single language version of a message template. The path
        `:templateId` is forwarded to Meta as `hsm_id` so the delete is scoped
        to that exact template row — other language versions sharing the same
        `name` are untouched. The `name` query parameter is required because
        Meta's `DELETE /{waba_id}/message_templates` endpoint requires it
        alongside `hsm_id`. Returns `{ templateId, success: true }` on
        confirmation; Meta acknowledging `success=false` surfaces as 502.
      operationId: >-
        deleteProjectsByProjectIdWhatsapp-businessAccountsByAccountIdTemplatesByTemplateId
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
        - name: name
          in: query
          required: true
          schema:
            type: string
            minLength: 1
            maxLength: 512
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