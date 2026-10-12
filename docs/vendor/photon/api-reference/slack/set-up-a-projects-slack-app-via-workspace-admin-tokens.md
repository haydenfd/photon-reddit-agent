> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Set up a project's Slack app via workspace-admin tokens

> Creates (or looks up) the project's Slack app by forwarding to spectrum-slack's `POST /install/manifest`. Body carries a Slack workspace-admin `configToken` (`xoxe.xoxp-...`) — required on first install — and an optional paired `refreshToken` (`xoxe-...`). When supplied, the refresh token is persisted (plaintext today, TODO(kms)) on spectrum-cloud's `slack_apps.refresh_token` so the manifest can be auto-updated later via `tooling.tokens.rotate` + `apps.manifest.update`.

Use this when the dashboard wants a single API surface for everything Slack-related. The functionally equivalent path is to hit spectrum-slack's `/install/manifest` directly with the same body plus `projectId`.

Returns the new `appId` (or `null` on the re-install short-circuit before any workspace has completed OAuth) and the `startUrl` to continue the install flow. Upstream errors are surfaced as 4xx/5xx with the Slack error code in `message`.



## OpenAPI

````yaml https://spectrum.photon.codes/openapi/json post /projects/{projectId}/slack/setup
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
  /projects/{projectId}/slack/setup:
    post:
      tags:
        - slack
      summary: Set up a project's Slack app via workspace-admin tokens
      description: >-
        Creates (or looks up) the project's Slack app by forwarding to
        spectrum-slack's `POST /install/manifest`. Body carries a Slack
        workspace-admin `configToken` (`xoxe.xoxp-...`) — required on first
        install — and an optional paired `refreshToken` (`xoxe-...`). When
        supplied, the refresh token is persisted (plaintext today, TODO(kms)) on
        spectrum-cloud's `slack_apps.refresh_token` so the manifest can be
        auto-updated later via `tooling.tokens.rotate` + `apps.manifest.update`.


        Use this when the dashboard wants a single API surface for everything
        Slack-related. The functionally equivalent path is to hit
        spectrum-slack's `/install/manifest` directly with the same body plus
        `projectId`.


        Returns the new `appId` (or `null` on the re-install short-circuit
        before any workspace has completed OAuth) and the `startUrl` to continue
        the install flow. Upstream errors are surfaced as 4xx/5xx with the Slack
        error code in `message`.
      operationId: postProjectsByProjectIdSlackSetup
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
              type: object
              properties:
                appName:
                  type: string
                  minLength: 1
                  maxLength: 80
                enabledFeatures:
                  type: array
                  items:
                    type: string
                configToken:
                  type: string
                  minLength: 8
                refreshToken:
                  type: string
                  minLength: 8
              required:
                - appName
                - enabledFeatures
              additionalProperties: false
          application/x-www-form-urlencoded:
            schema:
              type: object
              properties:
                appName:
                  type: string
                  minLength: 1
                  maxLength: 80
                enabledFeatures:
                  type: array
                  items:
                    type: string
                configToken:
                  type: string
                  minLength: 8
                refreshToken:
                  type: string
                  minLength: 8
              required:
                - appName
                - enabledFeatures
              additionalProperties: false
          multipart/form-data:
            schema:
              type: object
              properties:
                appName:
                  type: string
                  minLength: 1
                  maxLength: 80
                enabledFeatures:
                  type: array
                  items:
                    type: string
                configToken:
                  type: string
                  minLength: 8
                refreshToken:
                  type: string
                  minLength: 8
              required:
                - appName
                - enabledFeatures
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
                      ok:
                        type: boolean
                        const: true
                      appId:
                        anyOf:
                          - type: string
                          - type: 'null'
                      startUrl:
                        type: string
                    required:
                      - ok
                      - appId
                      - startUrl
                    additionalProperties: false
                required:
                  - succeed
                  - data
                additionalProperties: false

````

This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.