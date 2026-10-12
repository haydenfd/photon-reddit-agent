> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Issue iMessage tokens

> Issues iMessage tokens for a project. Use Authorization: Basic base64(projectId:projectSecret). Dedicated projects return per-instance LightAuth tokens keyed by instance ID in `auth`, along with a parallel `numbers` map of instance ID to phone number. Shared projects return a single LightAuth token. All returned tokens include their TTL in seconds.



## OpenAPI

````yaml https://spectrum.photon.codes/openapi/json post /projects/{projectId}/imessage/tokens
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
  /projects/{projectId}/imessage/tokens:
    post:
      tags:
        - imessage
      summary: Issue iMessage tokens
      description: >-
        Issues iMessage tokens for a project. Use Authorization: Basic
        base64(projectId:projectSecret). Dedicated projects return per-instance
        LightAuth tokens keyed by instance ID in `auth`, along with a parallel
        `numbers` map of instance ID to phone number. Shared projects return a
        single LightAuth token. All returned tokens include their TTL in
        seconds.
      operationId: postProjectsByProjectIdImessageTokens
      parameters:
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
                    oneOf:
                      - type: object
                        properties:
                          type:
                            type: string
                            const: dedicated
                          auth:
                            type: object
                            propertyNames:
                              type: string
                            additionalProperties:
                              type: string
                          numbers:
                            type: object
                            propertyNames:
                              type: string
                            additionalProperties:
                              type: string
                          expiresIn:
                            type: integer
                            exclusiveMinimum: 0
                            maximum: 9007199254740991
                        required:
                          - type
                          - auth
                          - numbers
                          - expiresIn
                        additionalProperties: false
                      - type: object
                        properties:
                          type:
                            type: string
                            const: shared
                          token:
                            type: string
                          expiresIn:
                            type: integer
                            exclusiveMinimum: 0
                            maximum: 9007199254740991
                        required:
                          - type
                          - token
                          - expiresIn
                        additionalProperties: false
                required:
                  - succeed
                  - data
                additionalProperties: false

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.